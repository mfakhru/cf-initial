import asgi

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from workers import WorkerEntrypoint

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DAILY_LIMIT = 80_000


@app.get("/")
async def root():
    return {"message": "Hello from Cloudflare Workers!"}


@app.get("/health")
async def health():
    return {"status": "ok"}


class Default(WorkerEntrypoint):
    async def fetch(self, request):
        result = await self.env.DB.prepare(
            "UPDATE counters SET value = value + 1 WHERE name = ? RETURNING value"
        ).bind("daily").first()

        if result and result["value"] > DAILY_LIMIT:
            from js import Response
            return Response.new(
                '{"error":"Daily request limit reached. Try again tomorrow."}',
                status=503,
                headers={"content-type": "application/json"},
            )

        return await asgi.fetch(app, request.js_object, self.env)

    async def scheduled(self, event):
        await self.env.DB.prepare(
            "UPDATE counters SET value = 0 WHERE name = 'daily'"
        ).run()

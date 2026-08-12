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


@app.get("/")
async def root():
    return {"message": "Hello from Cloudflare Workers!"}


@app.get("/health")
async def health():
    return {"status": "ok"}


class Default(WorkerEntrypoint):
    async def fetch(self, request):
        return await asgi.fetch(app, request.js_object, self.env)

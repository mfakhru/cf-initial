import asgi

from fastapi import FastAPI
from workers import WorkerEntrypoint

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello from Cloudflare Workers!"}


@app.get("/health")
async def health():
    return {"status": "ok"}


class Default(WorkerEntrypoint):
    async def fetch(self, request):
        return await asgi.fetch(app, request.js_object, self.env)

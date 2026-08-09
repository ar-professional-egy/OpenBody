from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.health.router import router as health_router

app = FastAPI(title="OpenBody API", version="1.0.0")

# CORS middleware for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api/v1/health")

@app.get("/")
def read_root():
    return {"message": "Welcome to OpenBody API"}

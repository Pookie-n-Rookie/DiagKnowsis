from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.diagnosis import router as diagnosis_router
from routes.health import router as health_router
from routes.auth import router as auth_router
from db.database import engine
import db.models as models
import os

app = FastAPI(
    title="DiagKnowsis - Medical Diagnosis API",
    description="Symptom-based disease diagnosis using AI + dataset matching",
    version="1.0.0"
)
models.Base.metadata.create_all(bind=engine)

# Allow Next.js frontend
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")
app.include_router(diagnosis_router, prefix="/api")
app.include_router(auth_router, prefix="/api/auth")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.diagnosis import router as diagnosis_router
from routes.health import router as health_router

app = FastAPI(
    title="Medical Diagnosis API",
    description="Symptom-based disease diagnosis using AI + dataset matching",
    version="1.0.0"
)

# Allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router, prefix="/api")
app.include_router(diagnosis_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

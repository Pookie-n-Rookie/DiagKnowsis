from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator
from services.symptom_matcher import match_symptoms, get_all_symptoms, get_disease_categories
from services.llm_service import get_llm_diagnosis

router = APIRouter()


# ---------- Request / Response Models ----------

class SymptomRequest(BaseModel):
    symptoms: list[str]
    use_ai: bool = True  # Set False to skip LLM (for testing/quota saving)

    @field_validator("symptoms")
    @classmethod
    def must_have_symptoms(cls, v):
        if not v or len(v) == 0:
            raise ValueError("At least one symptom is required")
        if len(v) > 20:
            raise ValueError("Maximum 20 symptoms allowed")
        return [s.strip().lower() for s in v]


class DiseaseMatch(BaseModel):
    name: str
    category: str
    symptoms: list[str]
    treatment: str
    severity: str
    specialist: str
    contagious: bool
    match_score: float


class DiagnosisResponse(BaseModel):
    user_symptoms: list[str]
    dataset_matches: list[DiseaseMatch]
    ai_summary: str | None
    disclaimer: str


# ---------- Routes ----------

@router.post("/diagnose", response_model=DiagnosisResponse)
async def diagnose(request: SymptomRequest):
    """
    Main diagnosis endpoint.
    1. Matches symptoms against disease dataset using TF-IDF
    2. Sends matches to Groq LLM for natural language summary
    """
    # Step 1: Dataset matching
    matches = match_symptoms(request.symptoms, top_n=5)

    # Step 2: LLM summary (optional)
    ai_summary = None
    if request.use_ai:
        try:
            ai_summary = get_llm_diagnosis(request.symptoms, matches)
        except Exception as e:
            ai_summary = f"AI summary unavailable: {str(e)}"

    return DiagnosisResponse(
        user_symptoms=request.symptoms,
        dataset_matches=matches,
        ai_summary=ai_summary,
        disclaimer="⚠️ This is NOT a substitute for professional medical advice. Please consult a qualified doctor."
    )


@router.get("/symptoms/list")
async def list_symptoms():
    """Returns all symptoms available in the dataset - useful for autocomplete."""
    return {"symptoms": get_all_symptoms()}


@router.get("/diseases/categories")
async def list_categories():
    """Returns all disease categories."""
    return {"categories": get_disease_categories()}

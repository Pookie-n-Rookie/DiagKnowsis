import json
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load dataset once at startup
DATA_PATH = os.path.join(os.path.dirname(__file__), "../data/diseases.json")

with open(DATA_PATH, "r") as f:
    DISEASES = json.load(f)

# Build corpus: each disease = one string of all its symptoms
corpus = [" ".join(d["symptoms"]) for d in DISEASES]

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(corpus)


def match_symptoms(symptoms: list[str], top_n: int = 5) -> list[dict]:
    """
    Takes a list of user symptoms, returns top N matching diseases from dataset.
    """
    query = " ".join(symptoms)
    query_vec = vectorizer.transform([query])
    
    similarities = cosine_similarity(query_vec, tfidf_matrix).flatten()
    top_indices = np.argsort(similarities)[::-1][:top_n]
    
    results = []
    for idx in top_indices:
        score = float(similarities[idx])
        if score > 0.05:  # Only include meaningful matches
            disease = DISEASES[idx].copy()
            disease["match_score"] = round(score * 100, 2)
            results.append(disease)
    
    return results


def get_all_symptoms() -> list[str]:
    """Returns all unique symptoms from the dataset."""
    all_symptoms = set()
    for disease in DISEASES:
        for symptom in disease["symptoms"]:
            all_symptoms.add(symptom.lower())
    return sorted(list(all_symptoms))


def get_disease_categories() -> list[str]:
    """Returns all disease categories."""
    return sorted(list(set(d["category"] for d in DISEASES)))

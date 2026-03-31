# 🩺 Medical Diagnosis 

A robust, AI-powered backend built with **FastAPI** that diagnoses potential illnesses based on user-provided symptoms. It combines *machine learning (TF-IDF)* for dataset matching with **LangChain** and **Groq (LLaMA 3)** to generate safe, conservative, and natural-language medical summaries.

## 🚀 Features
* **Symptom Matching Engine:** Uses `scikit-learn` (TF-IDF and Cosine Similarity) to match user symptoms against a dataset of 100+ diseases.
* **Smart Scoring Algorithm:** Accounts for symptom coverage and disease prevalence to prioritize common ailments over severe diseases for basic symptoms.
* **AI Summary Generation:** Integrates *LangChain and Groq's LLaMA 3* model to provide a pragmatic, non-alarmist explanation of the results and home care advice.
* **FastAPI Performance:** Fully asynchronous, self-documenting API endpoints.

## 🛠️ Tech Stack
* **Framework:** FastAPI, Uvicorn
* **Machine Learning:** scikit-learn, NumPy
* **GEN AI:** LangChain, Groq API (llama-3.3-70b-versatile)
* **Language:** Python 3.x

## 📦 Installation & Setup

**1. Clone the repository**
```bash
git clone <your-repo-url>
cd backend
```
**2. Create and activate a virtual environment**
```bash
python -m venv env

# On Windows:
env\Scripts\activate

# On Mac/Linux:
source env/bin/activate
```

**3. Install dependencies**

```Bash
pip install -r requirements.txt
```

*4. Set up Environment Variables*
Create a .env file in the root directory and add variables from .env.example:

```Bash
GROQ_API_KEY=""
AUTH_SECRET=""
DATABASE_URL="mysql+pymysql://user:password@localhost:3306/diagknowsis"
```

*5. Setup local instance of MySql*

```Bash
docker compose up -d
```

*6. Run the Application*
```Bash
python main.py
```
*The API will be available at http://localhost:8000.*

## 🌐 API Endpoints
- GET /api/health - Check if the API is running.

- GET /api/symptoms/list - Fetch all available symptoms for frontend autocomplete.

- GET /api/diseases/categories - Fetch all disease categories.

- POST /api/diagnose - Submit an array of symptoms to get a diagnosis match and AI summary.

- POST /api/auth/signup - Create a new user by sending username and password

- POST /api/auth/login - Login to your account by sending username and password

- GET /api/auth/getUser/{token} - Get user details by sending JWT

## 📄 API Documentation
FastAPI automatically generates interactive API documentation. Once the server is running, navigate to:

- Swagger UI: http://localhost:8000/docs

- ReDoc: http://localhost:8000/redoc

## ⚠️ Disclaimer
This application is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of a qualified health provider.

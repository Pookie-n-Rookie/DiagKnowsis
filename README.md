# Web Applications Laboratory Project



# DiagKnowSis
### Medical Diagnosis Web System


[![AI-Assisted](https://img.shields.io/badge/AI--Assisted-Symptom%20Insights-7c3aed?style=for-the-badge&logo=anthropic&logoColor=white)](https://groq.com/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![LLaMA 3 · Groq](https://img.shields.io/badge/LLaMA%203%20%C2%B7%20Groq-f97316?style=for-the-badge)](https://groq.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Aiven](https://img.shields.io/badge/Aiven-FF3750?style=for-the-badge&logo=aiven&logoColor=white)](https://aiven.io/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)


## 📋 Overview

**DiagKnowSis** matches user-reported symptoms against a dataset of 100+ diseases, applies smart prevalence-weighted scoring, and uses generative AI to produce calm, non-alarmist health summaries with practical home care guidance without replacing professional medical advice.

---

## 👥 Team Details

**Course:** Web Applications Laboratory &nbsp;|&nbsp; **Section:** IT UG3 A1 &nbsp;|&nbsp; **Group:** 3

| Name | Roll Number |
|:-----|:------------|
| Swapnaneel Ray | 002311001015 |
| Swarnendu Banerjee | 002311001016 |
| Rahul Pandey | 002311001021 |

---

## 🎯 Problem Statement

> Design and develop a **Medical Diagnosis Web System (Symptom Detection System)** that allows users to input symptoms and receive ranked probable diagnoses, along with AI-generated, non-alarmist health summaries and practical home care guidance — without replacing professional medical advice.

The system must:

- Accept free-text or structured symptom input from users
- Match symptoms against a comprehensive disease dataset using ML-based similarity
- Rank probable conditions using a prevalence-aware scoring algorithm
- Generate safe, plain-language AI summaries with home care recommendations
- Maintain user accounts with secure authentication
- Persist session and user data reliably via a managed cloud database

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                            DIAGKNOWSIS                              │
│                                                                     │
│   ┌──────────────────────┐           ┌────────────────────────────┐ │
│   │    FRONTEND  (fe/)   │           │    BACKEND  (backend/)     │ │
│   │                      │           │                            │ │
│   │   Next.js · React    │           │   FastAPI · Uvicorn        │ │
│   │                      │           │                            │ │
│   │  ┌────────────────┐  │  Fetch    │  ┌──────────────────────┐  │ │
│   │  │  Symptom       │  │  API +    │  │  POST /api/diagnose  │  │ │
│   │  │  Input UI      │──┼──────────►│  │  endpoint            │  │ │
│   │  └────────────────┘  │  JSON     │  └──────────┬───────────┘  │ │
│   │                      │◄──────────┤             │              │ │
│   │  ┌────────────────┐  │  Response │             ▼              │ │
│   │  │  Results &     │  │           │  ┌──────────────────────┐  │ │
│   │  │  AI Summary    │  │           │  │   TF-IDF Matcher     │  │ │
│   │  └────────────────┘  │           │  │   (scikit-learn)     │  │ │
│   │                      │           │  └──────────┬───────────┘  │ │
│   │  ┌────────────────┐  │           │             │              │ │
│   │  │  Auth UI       │  │           │             ▼              │ │
│   │  │  Login/Signup  │  │           │  ┌──────────────────────┐  │ │
│   │  └────────────────┘  │           │  │   Smart Scorer       │  │ │
│   └──────────────────────┘           │  │   (Prevalence Wt.)   │  │ │
│                                      │  └──────────┬───────────┘  │ │
│                                      │             │              │ │
│                                      │             ▼              │ │
│                                      │  ┌──────────────────────┐  │ │
│                                      │  │   LangChain + Groq   │  │ │
│                                      │  │   LLaMA 3.3 · 70B    │  │ │
│                                      │  │   (AI Summary)       │  │ │
│                                      │  └──────────┬───────────┘  │ │
│                                      │             │              │ │
│                                      │             ▼              │ │
│                                      │  ┌──────────────────────┐  │ │
│                                      │  │   MySQL via Aiven    │  │ │
│                                      │  │   (Cloud · Docker)   │  │ │
│                                      │  └──────────────────────┘  │ │
│                                      └────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

| Feature | Description |
|:--------|:------------|
| **Symptom Matching Engine** | TF-IDF vectorization combined with Cosine Similarity (scikit-learn) matches user input against 100+ disease profiles with high accuracy. |
| **Smart Scoring Algorithm** | Raw similarity scores are re-weighted using disease prevalence data — common conditions surface first, reducing unnecessary alarm. |
| **AI Summary Generation** | LangChain + Groq's `llama-3.3-70b-versatile` generates conservative, plain-language condition summaries and actionable home care guidance. |
| **Async FastAPI Backend** | Fully asynchronous REST endpoints via FastAPI + Uvicorn handle concurrent requests efficiently without blocking. |
| **JWT Authentication** | Secure signup and login with `bcrypt` password hashing and JWT token issuance via `passlib`. |
| **Managed Cloud Database** | User data persisted in MySQL hosted on Aiven for reliable, scalable cloud deployment. |
| **Fetch API Bridge** | Frontend communicates with the backend through native Fetch API — lightweight, no additional HTTP client dependencies. |
| **Auto API Docs** | FastAPI auto-generates Swagger UI and ReDoc documentation at runtime for easy testing and integration. |

---

## 🛠️ Tech Stack

| Layer | Technology | Reference |
|:------|:-----------|:----------|
| **Frontend** | Next.js, React, Fetch API | [nextjs.org](https://nextjs.org/) |
| **Backend Framework** | FastAPI, Uvicorn | [fastapi.tiangolo.com](https://fastapi.tiangolo.com/) · [uvicorn.org](https://www.uvicorn.org/) |
| **Machine Learning** | scikit-learn (TF-IDF + Cosine Similarity), NumPy | [scikit-learn.org](https://scikit-learn.org/) · [numpy.org](https://numpy.org/) |
| **Generative AI** | LangChain, Groq API — `llama-3.3-70b-versatile` | [python.langchain.com](https://python.langchain.com/) · [groq.com](https://groq.com/) |
| **Authentication** | JWT, bcrypt, passlib | [python-jose](https://python-jose.readthedocs.io/) · [passlib.readthedocs.io](https://passlib.readthedocs.io/) |
| **Database — Local** | MySQL via Docker | [mysql.com](https://www.mysql.com/) · [docs.docker.com](https://docs.docker.com/) |
| **Database — Cloud / Deployment** | Aiven for MySQL | [aiven.io](https://aiven.io/) · [aiven.io/docs](https://aiven.io/docs) |
| **Language** | Python 3.x · JavaScript (ES2020+) | [python.org](https://www.python.org/) · [developer.mozilla.org](https://developer.mozilla.org/) |

---

## 🚀 Getting Started

### Prerequisites

| Tool | Version | Reference |
|:-----|:--------|:----------|
| Node.js + npm | v18+ | [nodejs.org](https://nodejs.org/) |
| Python + pip | 3.9+ | [python.org](https://www.python.org/) |
| Docker | Latest | [docs.docker.com](https://docs.docker.com/) |
| Groq API Key | — | [console.groq.com](https://console.groq.com) |
| Aiven Account *(Deployment)* | — | [aiven.io](https://aiven.io/) |

---

### Step 1 — Clone the Repository

```bash
git clone <your-repo-url>
cd diagknowsis
```

---

### Step 2 — Set Up and Run the Backend

```bash
cd backend

# Create a virtual environment
python -m venv env

# Activate it
env\Scripts\activate          # Windows
source env/bin/activate       # macOS / Linux

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```env
GROQ_API_KEY="your_groq_api_key_here"
AUTH_SECRET="your_jwt_secret_here"
DATABASE_URL=""
```

> For cloud deployment, replace `DATABASE_URL` with your Aiven MySQL connection string.

Start the MySQL container (local development):

```bash
docker compose up -d
```

Start the FastAPI server:

```bash
python main.py
```

Backend is now running at **`http://localhost:8000`**

---

### Step 3 — Set Up and Run the Frontend

Open a **new terminal** while keeping the backend running:

```bash
cd fe

npm install
npm run dev
```

Frontend is now running at **`http://localhost:3000`**

---

## 🌐 API Endpoints

### Diagnostics

| Method | Route | Description |
|:-------|:------|:------------|
| `GET` | `/api/health` | Health check — confirms the API is live. |
| `GET` | `/api/symptoms/list` | Returns all available symptoms for frontend autocomplete. |
| `GET` | `/api/diseases/categories` | Returns all disease categories. |
| `POST` | `/api/diagnose` | Submit symptoms → receive ranked conditions + AI summary. |

### Authentication

| Method | Route | Description |
|:-------|:------|:------------|
| `POST` | `/api/auth/signup` | Register a new user account. |
| `POST` | `/api/auth/login` | Authenticate and receive a JWT token. |
| `GET` | `/api/auth/getUser/{token}` | Retrieve user profile from a JWT token. |

---

## 📖 Interactive API Documentation

FastAPI auto-generates live, interactive documentation once the server is running:

| Interface | URL | Description |
|:----------|:----|:------------|
| **Swagger UI** | [localhost:8000/docs](http://localhost:8000/docs) | Try endpoints directly in the browser |
| **ReDoc** | [localhost:8000/redoc](http://localhost:8000/redoc) | Clean, readable reference documentation |

---

## 📊 Key Metrics

| Metric | Value |
|:-------|:------|
| Diseases Indexed | 100+ |
| Matching Method | TF-IDF + Cosine Similarity |
| AI Model | LLaMA 3.3 · 70B via Groq |
| API Style | Async REST — FastAPI |
| Authentication | JWT + bcrypt |
| Cloud Database | Aiven for MySQL |
| Frontend–Backend Communication | Fetch API (JSON) |

---

## ☁️ Deployment Notes

For production, replace the local Docker MySQL instance with **Aiven for MySQL** — a fully managed, cloud-hosted database service.

1. Create a MySQL service on [aiven.io](https://aiven.io/)
2. Copy the connection URI from the Aiven console
3. Update `.env` with the Aiven `DATABASE_URL`:

```env
DATABASE_URL=""
```

4. Download and reference the CA certificate provided by Aiven for SSL verification

---

## ⚠️ Disclaimer

This application is built for **educational and informational purposes only** as part of a university laboratory exercise. It is **not a substitute** for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.

---

<div align="center">

*IT UG3 A1 · Group 3 · Web Applications Laboratory*

</div>

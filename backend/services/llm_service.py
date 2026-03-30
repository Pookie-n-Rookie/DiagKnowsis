import os
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def get_llm_diagnosis(symptoms: list[str], dataset_matches: list[dict]) -> str:
    """
    Sends symptoms + dataset matches to Groq LLaMA 3 for a natural language diagnosis.
    """
    if not dataset_matches:
        matched_info = "No strong dataset matches found."
    else:
        matched_info = "\n".join([
            f"- {d['name']} ({d['category']}): {', '.join(d['symptoms'][:5])}"
            for d in dataset_matches[:3]
        ])

    prompt = f"""You are a helpful medical assistant. A patient describes the following symptoms:
Symptoms: {', '.join(symptoms)}

Based on a medical dataset, the closest matching conditions are:
{matched_info}

Please:
1. Briefly explain the most likely condition (1-2 sentences)
2. Mention 2-3 possible conditions it could be
3. Give simple home care advice
4. Say clearly: "Please consult a doctor for proper diagnosis"

Keep response short (under 200 words). Do not be alarmist.
"""

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "You are a concise, helpful medical assistant. Always recommend consulting a real doctor."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        model="llama-3.3-70b-versatile",  
        max_tokens=400,
        temperature=0.4,
    )

    return chat_completion.choices[0].message.content

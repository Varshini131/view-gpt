import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")


def generate_answer(context, question):
    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "llama-3.1-70b-versatile",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful campus assistant chatbot."
            },
            {
                "role": "user",
                "content": f"""
Context:
{context}

Question:
{question}

Answer clearly and concisely.
"""
            }
        ]
    }

    res = requests.post(url, json=payload, headers=headers)

    return res.json()["choices"][0]["message"]["content"]
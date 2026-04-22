from flask import Flask, request, jsonify
from flask_cors import CORS

from rag import search
from llm import generate_answer

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return {"message": "Campus GPT Backend Running"}


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    query = data.get("message")

    # 1. Retrieve from FAISS
    docs = search(query)
    context = " ".join(docs)

    # 2. Generate answer using LLM
    answer = generate_answer(context, query)

    return jsonify({"answer": answer})




if __name__ == "__main__":
    app.run(debug=True)
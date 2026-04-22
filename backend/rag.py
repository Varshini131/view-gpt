import faiss
import pickle
import numpy as np
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

index = faiss.read_index("faiss_index/index.faiss")

with open("faiss_index/docs.pkl", "rb") as f:
    docs = pickle.load(f)


def search(query, k=3):
    q_vec = model.encode([query]).astype("float32")

    distances, indices = index.search(q_vec, k)

    return [docs[i] for i in indices[0]]
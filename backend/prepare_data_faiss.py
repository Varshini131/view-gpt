import os
import faiss
import numpy as np
import pickle
import pandas as pd
from PyPDF2 import PdfReader
from sentence_transformers import SentenceTransformer

# -----------------------------
# MODEL (embeddings generator)
# -----------------------------
model = SentenceTransformer("all-MiniLM-L6-v2")


# -----------------------------
# PDF LOADER
# -----------------------------
def load_pdfs(folder="data/pdfs"):
    texts = []

    if not os.path.exists(folder):
        return texts

    for file in os.listdir(folder):
        if file.endswith(".pdf"):
            path = os.path.join(folder, file)

            reader = PdfReader(path)
            text = ""

            for page in reader.pages:
                text += page.extract_text() or ""

            if text.strip():
                texts.append(text)

    return texts


# -----------------------------
# EXCEL LOADER
# -----------------------------
def load_excels(folder="data/excel"):
    texts = []

    for file in os.listdir(folder):
        if file.endswith(".xlsx") or file.endswith(".xls"):

            # ❌ skip temporary Excel files
            if file.startswith("~$"):
                continue

            path = os.path.join(folder, file)

            try:
                df = pd.read_excel(path, engine="xlrd")

                for _, row in df.iterrows():
                    row_text = " | ".join(
                        [str(x) for x in row.values if str(x) != "nan"]
                    )

                    if row_text.strip():
                        texts.append(row_text)

            except Exception as e:
                print(f"⚠ Skipping invalid Excel file: {file} → {e}")

    return texts


# -----------------------------
# COMBINE ALL DATA SOURCES
# -----------------------------
def load_all_data():
    pdf_texts = load_pdfs()
    excel_texts = load_excels()

    return pdf_texts + excel_texts


# -----------------------------
# TEXT CHUNKING
# -----------------------------
def chunk_text(text, chunk_size=500):
    return [
        text[i:i + chunk_size]
        for i in range(0, len(text), chunk_size)
    ]


# -----------------------------
# BUILD FAISS INDEX
# -----------------------------
def build_faiss():
    print("📥 Loading data from PDFs + Excel...")

    raw_texts = load_all_data()

    if not raw_texts:
        print("⚠ No data found in PDFs or Excel folders!")
        return

    print(f"📄 Total documents loaded: {len(raw_texts)}")

    # Chunking
    docs = []
    for text in raw_texts:
        docs.extend(chunk_text(text))

    print(f"✂ Total chunks created: {len(docs)}")

    # Embeddings
    print("🧠 Creating embeddings...")
    embeddings = model.encode(docs)

    embeddings = np.array(embeddings).astype("float32")

    # FAISS index
    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)

    # Save folder
    import os

    os.makedirs("faiss_index", exist_ok=True)
    if not os.path.exists("faiss_index"):
        os.makedirs("faiss_index")

    # Save FAISS index
    faiss.write_index(index, "faiss_index/index.faiss")

    # Save documents mapping
    with open("faiss_index/docs.pkl", "wb") as f:
        pickle.dump(docs, f)

    print("✔ FAISS INDEX CREATED SUCCESSFULLY")


# -----------------------------
# RUN SCRIPT
# -----------------------------
if __name__ == "__main__":
    build_faiss()
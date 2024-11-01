# 📄 PDF Analyzing RAG

A robust full-stack application that allows users to ask questions in plain English about a chosen PDF, leveraging a Retrieval-Augmented Generation (RAG) model for accurate and context-rich answers.

## 🚀 Features

- **Interactive Frontend:** Built with **React** and **TypeScript**, providing a clean and responsive UI.
- **API Backend:** **FastAPI** handles user requests and routes them to the language model.
- **Language Model Processing:** Uses **Langchain** and **Ollama** to process and embed PDF text into a **Vector Search database** (**ChromaDB**), enabling precise answer retrieval based on embedded text sections.
- **Plain English Queries:** Users can ask questions about the PDF in natural language, and the model will pull relevant sections to generate answers.

## 🛠️ Tech Stack

| Technology  | Role                |
|-------------|----------------------|
| **Python**  | Backend logic        |
| **Langchain & Ollama** | Text embedding and processing |
| **ChromaDB** | Vector search storage for efficient retrieval |
| **FastAPI** | API for handling requests |
| **React & TypeScript** | Frontend interface |

## 🌟 Usage

1. Upload a PDF file via the frontend.
2. Ask any question in plain English.
3. Receive an AI-generated answer based on the most relevant PDF sections.

## 🗃️ Architecture

- **RAG (Retrieval-Augmented Generation) Process:**
   1. PDFs are broken down and embedded into vectorized form using **Langchain** and **Ollama**.
   2. **ChromaDB** stores these embeddings to quickly retrieve relevant segments.
   3. The language model analyzes these retrieved sections to provide accurate answers.

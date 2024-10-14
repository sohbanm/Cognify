from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain.schema.document import Document
from text_manipulation import split_documents, get_embedding_function, load_documents
from chroma_db import add_to_chroma, query_rag

import PyPDF2
from io import BytesIO

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Adjust this to your frontend's domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        return JSONResponse(status_code=400, content={"error": "Only PDF files are allowed"})

    try:
        # pass
        contents = await file.read()

        documents = load_documents(contents, file.filename)
            
        chunks = split_documents(documents)
        add_to_chroma(chunks)

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": "Internal Server Error, Something Unexpected happened while the code was running", "details": str(e)})
    

    return JSONResponse(status_code=200, content={"filename": file.filename})

@app.get("/query")
async def query_data(query: str):
    response = query_rag(query)

    return JSONResponse(status_code=200, content={"text": response, "inputText": query})
    
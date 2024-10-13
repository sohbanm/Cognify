from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from langchain.schema.document import Document
from text_manipulation import split_documents, get_embedding_function
from chroma_db import add_to_chroma

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

    contents = await file.read()

    pdf_reader = PyPDF2.PdfReader(BytesIO(contents))

    documents = []
    for page_num in range(len(pdf_reader.pages)):
        documents.append(Document(page_content = pdf_reader.pages[page_num].extract_text(), metadata = {
                "source": file.filename,
                "page": page_num
            }))
        
    chunks = split_documents(documents)
    embed_func = get_embedding_function()
    add_to_chroma(chunks)
    

    return JSONResponse(status_code=200, content={"filename": file.filename})
    
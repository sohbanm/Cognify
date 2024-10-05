from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

import PyPDF2  # You can use any library you prefer for PDF processing
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
async def upload_file(file1: UploadFile = File(...)):
    if file1.content_type != "application/pdf":
        return JSONResponse(status_code=400, content={"error": "Only PDF files are allowed"})

    # Read the contents of the file
    contents1 = await file1.read()


    # Convert bytes to a file-like object
    pdf_file1 = BytesIO(contents1)


    # To process the PDF, use a library like PyPDF2
    pdf_reader1 = PyPDF2.PdfReader(pdf_file1)


    # Extract text from the first page as an example
    first_page1 = pdf_reader1.pages[0]
    text1 = first_page1.extract_text()

    print(file1.filename)
    print(text1)


    return JSONResponse(status_code=200, content={"filename1": file1.filename})
    
# @app.post("/uploadBase")
# async def upload_file(file: UploadFile = File(...)):
#     if file.content_type != "application/pdf":
#         return {"error": "Only PDF files are allowed"}

#     # Read the contents of the file
#     contents = await file.read()

#     # Convert bytes to a file-like object
#     pdf_file = BytesIO(contents)

#     # To process the PDF, use a library like PyPDF2
#     pdf_reader = PyPDF2.PdfReader(pdf_file)

#     # Extract text from the first page as an example
#     first_page = pdf_reader.pages[0]
#     text = first_page.extract_text()
#     print(file.filename)
#     print(text)

#     return {"filename": file.filename, "content": text}
    
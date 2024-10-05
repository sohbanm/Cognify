from fastapi import FastAPI, File, UploadFile
import PyPDF2  # You can use any library you prefer for PDF processing
from io import BytesIO

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/upload")
async def upload_file(file1: UploadFile = File(...), file2: UploadFile = File(...) ):
    if file1.content_type != "application/pdf" and file2.content_type != "application/pdf":
        return {"error": "Only PDF files are allowed"}

    # Read the contents of the file
    contents1 = await file1.read()
    contents2 = await file2.read()

    # Convert bytes to a file-like object
    pdf_file1 = BytesIO(contents1)
    pdf_file2 = BytesIO(contents2)

    # To process the PDF, use a library like PyPDF2
    pdf_reader1 = PyPDF2.PdfReader(pdf_file1)
    pdf_reader2 = PyPDF2.PdfReader(pdf_file2)

    # Extract text from the first page as an example
    first_page1 = pdf_reader1.pages[0]
    text1 = first_page1.extract_text()
    first_page2 = pdf_reader2.pages[0]
    text2 = first_page2.extract_text()
    print(file1.filename)
    print(text1)
    print(file2.filename)
    print(text2)

    return {"filename1": file1.filename, "filename2": file2.filename}
    
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
    
from fastapi import FastAPI, File, UploadFile
import PyPDF2  # You can use any library you prefer for PDF processing
from io import BytesIO

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        return {"error": "Only PDF files are allowed"}

    # Read the contents of the file
    contents = await file.read()

    # Convert bytes to a file-like object
    pdf_file = BytesIO(contents)

    # To process the PDF, use a library like PyPDF2
    pdf_reader = PyPDF2.PdfReader(pdf_file)

    # Extract text from the first page as an example
    first_page = pdf_reader.pages[0]
    text = first_page.extract_text()
    print("worked")
    print(file.filename)
    print(text)

    return {"filename": file.filename, "content": text}
    
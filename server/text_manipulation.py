from langchain.schema.document import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings.ollama import OllamaEmbeddings
import PyPDF2
from io import BytesIO

def load_documents(contents, filename):
    pdf_reader = PyPDF2.PdfReader(BytesIO(contents))

    documents = []
    for page_num in range(len(pdf_reader.pages)):
        documents.append(Document(page_content = pdf_reader.pages[page_num].extract_text(), metadata = {
                "source": filename,
                "page": page_num
            }))

def split_documents(documents):
    text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=800,
    chunk_overlap=80,
    length_function=len,
    add_start_index=True,
    is_separator_regex=False,
    )
    return text_splitter.split_documents(documents)

def get_embedding_function():
    embeddings = OllamaEmbeddings(model="nomic-embed-text")
    return embeddings
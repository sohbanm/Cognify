import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      console.log("Dropped file: ", files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      console.log("Selected file: ", files[0]);
    }
  };

  const handleClick = () => {
    document.getElementById("fileInput")?.click(); // Programmatically click the hidden input
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

  try {
    const response = await axios.post("http://localhost:8000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type for file uploads
      },
    });

    if (response.status === 200) {
      console.log("File uploaded successfully!");
    } else {
      console.error("File upload failed.");
    }
  } catch (error) {
    console.error("Error while uploading file:", error);
  }
  };
  return (
    <>
      <h1 className="text-3xl font-bold underline">File Drop Zone</h1>
      
      <div
        className="drop-zone border-2 border-dashed border-gray-400 p-4 w-64 h-32 flex justify-center items-center"
        onClick={handleClick}
        onDrop={handleFileDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {selectedFile ? (
          <p>{selectedFile.name}</p>
        ) : (
          <p>Drop a file here or click to upload</p>
        )}
      </div>

      {/* Hidden file input */}
      <input
        id="fileInput"
        type="file"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      {selectedFile && (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload File
        </button>
      )}
    </>
  );
}

export default App;

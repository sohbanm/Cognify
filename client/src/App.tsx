import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedFileData, setSelectedFileData] = useState<File | null>(null);

  const handleFileDropData = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFileData(files[0]);
      console.log("Dropped file: ", files[0]);
    }
  };

  const handleFileSelectData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFileData(files[0]);
      console.log("Selected file: ", files[0]);
    }
  };

  const handleClickData = () => {
    document.getElementById("fileInputData")?.click(); // Programmatically click the hidden input
  };

  const handleSubmitData = async () => {
    if (!selectedFileData) return;

    const formData = new FormData();
    formData.append("file1", selectedFileData);

    try {
      const response = await axios.post(
        "http://localhost:8000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for file uploads
          },
        }
      );

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
      <div>
        <h1 className="text-3xl font-bold text-left">Cognify</h1>
      </div>

      <div className="flex">
        <div
          className="drop-zone border-2 border-dashed border-gray-400 p-4 w-64 h-32 flex justify-center items-center"
          onClick={handleClickData}
          onDrop={handleFileDropData}
          onDragOver={(e) => e.preventDefault()}
        >
          {selectedFileData ? (
            <p>{selectedFileData.name}</p>
          ) : (
            <p>Drop a file here or click to upload</p>
          )}
        </div>

        {/* Hidden file input */}
        <input
          id="fileInputData"
          type="file"
          style={{ display: "none" }}
          onChange={handleFileSelectData}
        />
      </div>

      {selectedFileData && (
        <button
          onClick={handleSubmitData}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload knowledge
        </button>
      )}
    </>
  );
}

export default App;

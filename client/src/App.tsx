import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [selectedFileData, setSelectedFileData] = useState<File | null>(null);
  const [selectedFileBase, setSelectedFileBase] = useState<File | null>(null);

  const handleFileDropBase = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFileBase(files[0]);
      console.log("Dropped file: ", files[0]);
    }
  };
  const handleFileDropData = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setSelectedFileData(files[0]);
      console.log("Dropped file: ", files[0]);
    }
  };

  const handleFileSelectBase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFileBase(files[0]);
      console.log("Selected file: ", files[0]);
    }
  };
  const handleFileSelectData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFileData(files[0]);
      console.log("Selected file: ", files[0]);
    }
  };

  const handleClickBase = () => {
    document.getElementById("fileInputBase")?.click(); // Programmatically click the hidden input
  };
  const handleClickData = () => {
    document.getElementById("fileInputData")?.click(); // Programmatically click the hidden input
  };

  const handleSubmitBase = async () => {
    if (!selectedFileBase) return;

    const formData = new FormData();
    formData.append("file", selectedFileBase);

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

  const handleSubmitData = async () => {
    if (!selectedFileData) return;
    if (!selectedFileBase) return;

    const formData = new FormData();
    formData.append("file1", selectedFileData);
    formData.append("file2", selectedFileBase);

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
      <h1 className="text-3xl font-bold underline">File Drop Zone</h1>
      <div className="flex">
        <div className="block">
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

        <div className="block">
          <div
            className="drop-zone border-2 border-dashed border-gray-400 p-4 w-64 h-32 flex justify-center items-center"
            onClick={handleClickBase}
            onDrop={handleFileDropBase}
            onDragOver={(e) => e.preventDefault()}
          >
            {selectedFileBase ? (
              <p>{selectedFileBase.name}</p>
            ) : (
              <p>Drop a file here or click to upload</p>
            )}
          </div>

          {/* Hidden file input */}
          <input
            id="fileInputBase"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileSelectBase}
          />

          {/* {selectedFileBase && (
            <button
              onClick={handleSubmitBase}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Upload File
            </button>
        )} */}
        </div>
        {selectedFileData && selectedFileBase && (
          <button
            onClick={handleSubmitData}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Upload File
          </button>
        )}
      </div>
    </>
  );
}

export default App;

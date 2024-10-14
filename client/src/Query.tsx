import React, { useState } from "react";
import axios from "axios";
import "./Query.css";

function Query() {
    const [inputText, setInputText] = useState("");
    const [responseText, setReponseText] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value); // Update state with the input value
    };

    const handleSubmitQuery = async () => {
      if (inputText.length < 1){
        console.log("Query string cannot be empty");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/query", {
            params: {
              query: inputText,
            }
        });
        console.log(response.data);
        setReponseText(response.data["text"]);
      }
      catch(error: any){
        if (error.response) {
          console.error('Error response:', error.response.status, error.response.data);
        } else {
          console.error('Error:', error.message);
        }
      }
    }
    return(
        <div className="flex flex-col items-center w-full justify-center h-screen p-4">
        <label htmlFor="paragraphInput" className="text-lg font-bold mb-2">
          Type your paragraph here:
        </label>
        <textarea
          id="paragraphInput"
          value={inputText}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg p-4 w-full max-w-2xl h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your paragraph..."
        />
        <button
          onClick={handleSubmitQuery}
          className="mt-4 bg-cognifyPurple hover:bg-cognifyPurpleHover text-white px-4 py-2 rounded"
        >
          Query Data
        </button>
        <label htmlFor="paragraphInput" className="text-lg font-bold mb-2 mt-10">
          This is the query response from the LLM:
        </label>
        <textarea
          value={responseText}
          readOnly
          className="mt-3 border bg-gray-100 border-gray-300 rounded-lg p-4 w-full max-w-2xl h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Query result will appear here"
        />
      </div>
    );
}

export default Query;
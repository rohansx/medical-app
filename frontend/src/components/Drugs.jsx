import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import Nav from "./Nav";
import Footer from "./Footer";
import "../App.css";

const openai = new OpenAIApi(
  new Configuration({
    apiKey: "",
  })
);

const message = `Generate a JSON representation of about result. The JSON should include the following fields: 
"Uses", 
"Dosage", 
"Side Effects", 
"Route",
"Disclaimer" `;

function Drugs() {
  const [inputMessage, setInputMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultJSON, setResultJSON] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleMedicineClick = (event) => {
    const medicineName = event.target.innerHTML;
    setInputMessage(medicineName);
    convertImageToText();
  };

  const convertImageToText = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You" },
          { role: "user", content: inputMessage + message },
        ],
      });
      const content = response.data.choices[0].message.content;
      console.log("Content:", content);
      setResultJSON(JSON.parse(content));
    } catch (error) {
      console.error(error);
      setError("Error occurred during generation");
    }
    setIsGenerating(false);
  };

  return (
    <>
      <Nav />

      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="w-full flex justify-center items-center flex-col mb-10">
          <h1 className="mt-5 text-5xl font-extrabold leading-normal sm:text-6xl text-center max-w-2xl">
            <span className="bg-gradient-to-br from-green-500 via-green-300 to-green-100 bg-clip-text text-transparent">
              Doctalyzer
            </span>
            <br />
            <span className="description">Analyze Medical Reports</span>
          </h1>
          <h2 className="desc">
            This tool will tell you about the usage and information of
            medicines.
          </h2>

          <div className="flex flex-row justify-around mt-5">
            <div
              onClick={handleMedicineClick}
              className="cursor-pointer hover rounded-full bg-white border-solid border-2 border-green-300 px-5 mx-2">
              Aspirin
            </div>
            <div
              onClick={handleMedicineClick}
              className="cursor-pointer hover rounded-full bg-white border-solid border-2 border-green-300 px-5 mx-2">
              DOLO 65
            </div>
            <div
              onClick={handleMedicineClick}
              className="cursor-pointer hover rounded-full bg-white border-solid border-2 border-green-300 px-5 mx-2">
              Crocin
            </div>
            <div
              onClick={handleMedicineClick}
              className="cursor-pointer hover rounded-full bg-white border-solid border-2 border-green-300 px-5 mx-2">
              i-Pill
            </div>
          </div>
          <div className="flex flex-row justify-around mt-5">
            <div
              onClick={handleMedicineClick}
              className="cursor-pointer hover rounded-full bg-white border-solid border-2 border-green-300 px-5 mx-2">
              Combiflame
            </div>
            <div
              onClick={handleMedicineClick}
              className="cursor-pointer hover rounded-full bg-white border-solid border-2 border-green-300 px-5 mx-2">
              Diclofanac
            </div>
            <div className="bg-gradient-to-br from-green-500 via-green-200 to-green-100 rounded-full px-2 pt-1 text-sm">
              1M+ Medicines
            </div>
          </div>
        </div>

        {/* //////Hero Ends */}

        <div className="flex flex-col w-full items-center justify-center">
          <input
            placeholder="Search for a medicine"
            type="text"
            className="w-full p-5 rounded-full border max-w-2xl border-green-300"
            value={inputMessage}
            onChange={handleInputChange}
          />
          <button
            style={{
              backgroundColor: isGenerating ? "#34d399" : "#86efac",
            }}
            onClick={convertImageToText}
            className="my-5 border-gray-200 text-black flex h-10 w-full max-w-2xl items-center justify-center rounded-md border text-sm transition-all focus:outline-none"
            disabled={isGenerating}>
            <p className="text-sm">
              {isGenerating ? "Generating..." : "Generate report"}
            </p>
          </button>
        </div>
        <div>
          {error && <p>{error}</p>}
          {resultJSON && (
            <div className="max-w-2xl">
              <div className="my-5 p-5 rounded-md border bg-white">
                <h3 className="font-semibold text-lg mb-1">Uses:</h3>
                <p>{resultJSON.Uses}</p>
              </div>

              <div className="my-5 p-5 rounded-md border bg-white">
                <h3 className="font-semibold text-lg mb-1">Dosage:</h3>
                <p>{resultJSON.Dosage}</p>
              </div>

              <div className="my-5 p-5 rounded-md border bg-white">
                <h3 className="font-semibold text-lg mb-1">Side Effects:</h3>
                <p>{resultJSON["Side Effects"]}</p>
              </div>

              <div className="my-5 p-5 rounded-md border bg-white">
                <h3 className="font-semibold text-lg mb-1">Route:</h3>
                <p>{resultJSON.Route}</p>
              </div>

              <div className="my-5 p-5 rounded-md border bg-white">
                <h3 className="font-semibold text-lg mb-1">Disclaimer:</h3>
                <p>{resultJSON.Disclaimer}</p>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Drugs;

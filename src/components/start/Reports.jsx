import React, { useState } from "react";
import Dropzone from "react-dropzone";
import "./Start.css";
import Nav from "../Nav";

const Reports = () => {
  const [reportDetails, setReportDetails] = useState("");
  const [files, setFiles] = useState([]);

  const handleDetailsChange = (e) => {
    setReportDetails(e.target.value);
  };

  const handleFileDrop = (droppedFiles) => {
    setFiles([...files, ...droppedFiles]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to the server or perform any other necessary actions
    console.log("Submitted data:", {
      reportDetails,
      files,
    });
  };

  return (
    // <div className="flex flex-col">
    <div className="flex flex-col justify-center items-center w-full">
      <Nav />
      <div className="justify-center items-center min-h-[50%] p-8 bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Medical Reports</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="reportDetails" className="block">
            Report Details:
          </label>
          <textarea
            id="reportDetails"
            name="reportDetails"
            value={reportDetails}
            onChange={handleDetailsChange}
            className="border rounded px-2 py-1"></textarea>
          <br />

          <label className="block">Upload Report:</label>
          <Dropzone onDrop={handleFileDrop}>
            {({ getRootProps, getInputProps }) => (
              <div className="dropzone border rounded p-4" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag and drop files here, or click to select files</p>
                {files.length > 0 && (
                  <div>
                    <h4>Uploaded Files:</h4>
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center">
                        <span>{file.name}</span>
                        <button
                          onClick={() => handleRemoveFile(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600">
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          <br />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reports;

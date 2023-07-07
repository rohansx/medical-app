import React from "react";
import Ocr from "./components/Ocr";
import Homepage from "./components/Homepage";
import Medicalreport from "./components/Medicalreport";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/start/Register";
import Login from "./components/start/Login";

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/ocr" element={<Ocr />} />
            <Route path="/medical" element={<Medicalreport />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
};

export default App;

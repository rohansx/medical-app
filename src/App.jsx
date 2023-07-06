import React from "react";
import Ocr from "./components/Ocr";
import Homepage from "./components/Homepage";
import Medicalreport from "./components/Medicalreport";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./components/Register";

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="homepage" element={<Homepage />}></Route>
            <Route path="/" element={<Register />}></Route>
            <Route path="ocr" element={<Ocr />}></Route>
            <Route path="medical" element={<Medicalreport />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
};

export default App;

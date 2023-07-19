import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import Profile from "./components/start/Profile";
import Homepage from "./components/Homepage";
import Register from "./components/start/Register";
import Login from "./components/start/Login";
import Ocr from "./components/Ocr";
import Drugs from "./components/Drugs";
import "tailwindcss/tailwind.css";
import Physicians from "./components/start/Physicians";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/ocr",
    element: <Ocr />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/drugs",
    element: <Drugs />,
  },
  {
    path: "/physicians",
    element: <Physicians />,
  },
]);

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient main" />
      </div>
      <div className="App">
        <RouterProvider router={router}>
          <Nav />
        </RouterProvider>
      </div>
    </main>
  );
};

export default App;

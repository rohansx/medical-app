import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Nav from "./components/Nav";
import Profile from "./components/start/Profile";
import Homepage from "./components/Homepage";
import Reports from "./components/start/Reports";
import Register from "./components/start/Register";
import Login from "./components/start/Login";
import Ocr from "./components/Ocr";
import Drugs from "./components/Drugs";
import "tailwindcss/tailwind.css";
import Physicians from "./components/start/Physicians";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/ocr",
    element: <Ocr />,
  },
  {
    path: "/reports",
    element: <Reports />,
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
    <div className="App">
      <RouterProvider router={router}>
        <Nav />
      </RouterProvider>
    </div>
  );
};

export default App;

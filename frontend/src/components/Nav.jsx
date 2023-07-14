import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import "./hero.css";

const Nav = () => {
  return (
    <>
      {/* <nav class="flex justify-center space-x-4 py-8"> */}
      <nav className="flex justify-between items-center w-full mb-10 pt-3 w-full flex-row">
        <Link to="/homepage" style={{ marginRight: "auto" }}>
          <img
            src={logo}
            alt="sumz_logo"
            className="logo object-contain hover:bg-slate-100 "
          />
        </Link>

        <a
          href="/physicians"
          class="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
          Physicians
        </a>
        <a
          href="/reports"
          class="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
          Reports
        </a>
        <a
          href="/ocr"
          class="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
          Ocr
        </a>
        <a
          href="/drugs"
          class="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
          Drugs
        </a>
        <a
          href="/profile"
          class="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
          Profile
        </a>

        <button
          type="button"
          style={{ marginLeft: "auto" }}
          onClick={() =>
            window.open("https://github.com/open-xyz/doctalyzer", "_blank")
          }
          className="black_btn hover:bg-slate-100 px-6">
          GitHub
        </button>
      </nav>
    </>
  );
};

export default Nav;

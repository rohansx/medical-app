import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../components/context/AuthProvider";
import { Link } from "react-router-dom";
import axios from "../../api/Axios";
import "./Start.css";
import Nav from "../Nav";
import Footer from "../Footer";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, pwd, roles, accessToken });
      setEmail("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Nav />
      {success ? (
        <section className="shadow-2xl shadow-slate-400 w-full max-w-md min-h-400 flex flex-col justify-start p-4 bg-gradient-to-br  from-stone-200 via-stone-100 to-stone-50 rounded-lg">
          <h1 className="text-3xl font-bold mb-4">You are logged in!</h1>
          <br />
          <p>
            <Link to="/homepage" className="text-sky-400">
              Go to Homepage
            </Link>
          </p>
        </section>
      ) : (
        <section className="shadow-2xl shadow-slate-400 w-full max-w-sm min-h-400 flex flex-col justify-start p-4 bg-gradient-to-br  from-stone-200 via-stone-100 to-stone-50 rounded-lg">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive">
            {errMsg}
          </p>
          <h1 className="text-3xl font-bold text-center">Sign In</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between flex-grow pb-4">
            <label htmlFor="email" className="mt-4">
              Email:
            </label>
            <input
              type="Email"
              id="Email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className="border border-green-300 text-lg p-1 rounded-md"
            />

            <label htmlFor="password" className="mt-4">
              Password:
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              className="border border-green-300 text-lg p-1 rounded-md"
            />
            <button className="mt-4 shadow-2xl bg-gradient-to-r from-green-300 to-green-200 hover:from-green-400 hover:to-green-300  text-black px-4 py-2 rounded-full">
              Sign In
            </button>
          </form>
          <p>
            Need an Account?
            <span className="line ">
              <Link to="/register" className="text-sky-400 mx-1">
                Sign Up
              </Link>
            </span>
          </p>
        </section>
      )}
      <Footer />
    </div>
  );
};

export default Login;

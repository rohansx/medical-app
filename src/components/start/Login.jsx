import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../../components/context/AuthProvider";
import { Link } from "react-router-dom";
import axios from "../../api/Axios";
import "./Start.css";
import Nav from "../Nav";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
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
        <section className="w-full max-w-md min-h-400 flex flex-col justify-start p-4">
          <h1 className="text-3xl font-bold mb-4">You are logged in!</h1>
          <br />
          <p>
            <Link to="/homepage" className="text-blue-500">
              Go to Homepage
            </Link>
          </p>
        </section>
      ) : (
        <section className="w-full max-w-sm min-h-400 flex flex-col justify-start p-4 bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300 rounded-lg">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive">
            {errMsg}
          </p>
          <h1 className="text-3xl font-bold">Sign In</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between flex-grow pb-4">
            <label htmlFor="username" className="mt-4">
              Username:
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="border border-gray-300 rounded p-1"
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
              className="border border-gray-300 rounded p-1"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 mt-4">
              Sign In
            </button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              <Link to="/" className="text-blue-500">
                Sign Up
              </Link>
            </span>
          </p>
        </section>
      )}
    </div>
  );
};

export default Login;

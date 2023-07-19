import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/Axios";
import { Link, useNavigate } from "react-router-dom";
import "./Start.css";
import Nav from "../Nav";
import Footer from "../Footer";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const REGISTER_URL = "/register";

const Register = () => {
  const emailRef = useRef();
  const errRef = useRef();

  // const [user, setUser] = useState("");
  // const [validName, setValidName] = useState(false);
  // const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [registrationType, setRegistrationType] = useState("patient");

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // useEffect(() => {
  //   emailRef.current.focus();
  // }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const res = await axios.post(
        "/api/v1/patient",
        require("../../../../routes/patientRoutes", values)
      );
      // REGISTER_URL,
      // JSON.stringify({ user, pwd, email, registrationType }),
      // {
      //   headers: { "Content-Type": "application/json" },
      //   withCredentials: true,
      // }
      // console.log(res?.accessToken);
      // console.log(JSON.stringify(res?.data));
      // setSuccess(true);
      // //clear state and controlled inputs
      // //need value attrib on inputs for this
      // setUser("");
      // setPwd("");
      // setEmail("");
      // setValidEmail("");
      // setMatchPwd("");
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("./login");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      if (!err?.res) {
        setErrMsg("No Server response");
      } else if (err.res?.status === 409) {
        setErrMsg("Email already Registered");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <Nav />
        {success ? (
          <section className="shadow-2xl shadow-slate-400 w-full max-w-sm min-h-96 flex flex-col justify-start p-4 bg-gradient-to-br  from-stone-200 via-stone-100 to-stone-50 rounded-lg">
            <h1>Success!</h1>
            <p>
              <a href="/" className="text-blue-400">
                Sign In
              </a>
            </p>
          </section>
        ) : (
          <section className="shadow-2xl shadow-slate-400 w-full max-w-sm min-h-400 flex flex-col justify-start p-4 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-50 rounded-lg">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive">
              {errMsg}
            </p>
            <h1 className="text-3xl font-bold text-center">Register</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-between flex-grow pb-4">
              {/* <label htmlFor="username" className="mb-4">
                Username:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validName ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validName || !user ? "hide" : "invalid"}
                />
              </label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className="text-lg p-1 rounded-md"
              />
              <p
                id="uidnote"
                className={
                  userFocus && user && !validName ? "instructions" : "offscreen"
                }>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.
                <br />
                Must begin with a letter.
                <br />
                Letters, numbers, underscores, hyphens allowed.
              </p> */}

              <label htmlFor="email" className="mt-4">
                Email:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validEmail ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validEmail || !email ? "hide" : "invalid"}
                />
              </label>
              <input
                type="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                className="border border-green-300 text-lg p-1 rounded-md"
              />
              <p
                id="emailnote"
                className={
                  emailFocus && email && !validEmail
                    ? "instructions"
                    : "offscreen"
                }>
                <FontAwesomeIcon icon={faInfoCircle} />
                Enter a valid email address.
              </p>
              <label htmlFor="password" className="mt-4">
                Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPwd || !pwd ? "hide" : "invalid"}
                />
              </label>
              <input
                type="password"
                id="password"
                className="border border-green-300 text-lg p-1 rounded-md"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
              <p
                id="pwdnote"
                className={
                  pwdFocus && !validPwd ? "instructions" : "offscreen"
                }>
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
              <label htmlFor="confirm_pwd" className="mt-4">
                Confirm Password:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validMatch && matchPwd ? "valid" : "hide"}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validMatch || !matchPwd ? "hide" : "invalid"}
                />
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                className="border border-green-300 text-lg p-1 rounded-md"
              />
              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }>
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
              <label className="mt-6">Register as:</label>
              <label htmlFor="patient" className="mt-2">
                <input
                  type="radio"
                  id="patient"
                  value="patient"
                  checked={registrationType === "patient"}
                  onChange={() => setRegistrationType("patient")}
                />
                Patient
              </label>
              <label htmlFor="physician" className="mt-2">
                <input
                  type="radio"
                  id="physician"
                  value="physician"
                  checked={registrationType === "physician"}
                  onChange={() => setRegistrationType("physician")}
                />
                Physician
              </label>
              <button
                disabled={
                  !validEmail || !validPwd || !validMatch ? true : false
                }
                className="shadow-2xl bg-gradient-to-r from-green-300 to-green-200 hover:from-green-400 hover:to-green-300  text-black px-4 py-2 rounded-full ">
                Sign Up
              </button>
            </form>
            <p>
              Already registered?
              <span className="line">
                <Link to="/login" className="text-sky-400 mx-1">
                  Sign In
                </Link>
              </span>
            </p>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Register;

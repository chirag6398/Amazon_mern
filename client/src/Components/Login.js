import React, { useState } from "react";
import loginStyle from "../styles/login.module.css";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInHandler = (e) => {
    e.preventDefault();
  };

  const registerHandler = (e) => {
    history.push("/register");
  };

  return (
    <div className={loginStyle.login}>
      <Link to="/">
        <img
          className={loginStyle.login_logo}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="..."
        />
      </Link>
      <div className={loginStyle.login_container}>
        <h1>Sign-In</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <h5>password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={loginStyle.login_signinButton}
            type="submit"
            onClick={signInHandler}
          >
            sign-in
          </button>
        </form>

        <p>
          By signing-in yuo agree to amazon clone <em>Terms and Conditions</em>
          plz see our privacy and conditions
        </p>
        <button
          className={loginStyle.login_registerButton}
          onClick={registerHandler}
        >
          Create Your Amazon Account
        </button>
      </div>
    </div>
  );
}

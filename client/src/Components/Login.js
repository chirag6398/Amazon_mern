import React, { useState } from "react";
import loginStyle from "../styles/login.module.css";
import { Link, useHistory } from "react-router-dom";
import { userLogin } from "../services/user";

export default function Login() {
  const history = useHistory();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };
  const signInHandler = async (e) => {
    try {
      e.preventDefault();
      const data = await userLogin(userCredentials);
      if (data.status === 200) {
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
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
            type="email"
            name="email"
            value={userCredentials.email}
            onChange={inputHandler}
          ></input>
          <h5>password</h5>
          <input
            type="password"
            name="password"
            value={userCredentials.password}
            onChange={inputHandler}
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

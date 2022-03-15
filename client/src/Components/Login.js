import React, { useState } from "react";
import loginStyle from "../styles/login.module.css";
import { Link, useHistory } from "react-router-dom";
import { userLogin } from "../services/user";

import 'react-toastify/dist/ReactToastify.css';
import { StateValue } from "../StateProvider/StateProvider";
export default function Login() {
  const [state, dispatch] = StateValue();
  const history = useHistory();
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const [isProcessing,setIsProcessing]=useState(false);

  const inputHandler = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };
  const signInHandler = async (e) => {
    try {
      e.preventDefault();
      setIsProcessing(true);
      const data = await userLogin(userCredentials);
      const user = data.data;
      setIsProcessing(false);
      if (data.status === 200) {
        
        // alert("login successfully")
        dispatch({ type: "Set_user", payload: user });
        history.push("/");
      }
    } catch (err) {
        alert("please enter correct email and password");
        setIsProcessing(false);
    }
  };

  const registerHandler = (e) => {
    history.push("/register");
  };

  return (
    <div className={loginStyle.login}>
      <div style={{ height: "150px" }}>
        <Link to="/">
          <img
            className={loginStyle.login_logo}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
            alt="..."
          />
        </Link>
      </div>

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
            disabled={isProcessing}
          >
           {isProcessing?"processing...":"sign-in"}
          </button>
         
        </form>
        
        <Link
          style={{
            height: "30px",
            cursor: "pointer",
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
            opacity: "0.5",
          }}
          to="/forget-password"
        >
          <span>Forgot password ?</span>
        </Link>
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

import React, { useState } from "react";
import loginStyle from "../../styles/login.module.css";
import { Link } from "react-router-dom";
import { userEmail } from "../../services/user";
export default function Login() {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
  });

  const inputHandler = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };
  const emailHandler = async (e) => {
    try {
      e.preventDefault();
      const data = await userEmail(userCredentials);

      if (data.status === 200) {
        console.log("check your email");
      }
    } catch (err) {
      console.log(err);
    }
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
        <form>
          <h5>E-mail</h5>
          <input
            type="email"
            name="email"
            value={userCredentials.email}
            onChange={inputHandler}
          ></input>

          <button
            className={loginStyle.login_signinButton}
            type="submit"
            onClick={emailHandler}
          >
            Submit
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
          to="/login"
        >
          <span>sign in ?</span>
        </Link>
      </div>
    </div>
  );
}

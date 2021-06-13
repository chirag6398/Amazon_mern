import React, { useState } from "react";
import RegisterStyle from "../styles/register.module.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import amzImg from "../assets/images/amazonimg.png";
// import Col from "react-bootstrap/Col";
// import Row from "react-bootstrap/Row";
export default function Register() {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const inputHandler = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };
  return (
    <div className={RegisterStyle.extDiv}>
      <div className={RegisterStyle.mainDiv}>
        <div className={RegisterStyle.header}>
          <img className={RegisterStyle.img} src={amzImg} alt="..." />
        </div>
        <div className={RegisterStyle.row}>
          <h3>Register</h3>
        </div>
        <div className={RegisterStyle.form}>
          <form>
            <div className={RegisterStyle.row}>
              <div className={RegisterStyle.rowContainer}>
                <span>Name </span>
                <input
                  type="text"
                  name="username"
                  value={userCredentials.username}
                  placeholder="Your Complete Name"
                  onChange={inputHandler}
                />
              </div>
            </div>
            <div className={RegisterStyle.row}>
              <div className={RegisterStyle.rowContainer}>
                <span>Email </span>
                <input
                  type="email"
                  name="email"
                  value={userCredentials.email}
                  placeholder="Yout email"
                  onChange={inputHandler}
                />
              </div>
            </div>
            <div className={RegisterStyle.row}>
              <div className={RegisterStyle.rowContainer}>
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  value={userCredentials.password}
                  placeholder="enter password"
                  onChange={inputHandler}
                />
              </div>
            </div>
            <div className={RegisterStyle.row}>
              <div className={RegisterStyle.rowContainer}>
                <span>Password again </span>
                <input
                  type="password"
                  name="cpassword"
                  value={userCredentials.cpassword}
                  placeholder="Your Complete Name"
                  onChange={inputHandler}
                />
              </div>
            </div>
          </form>
        </div>
        <div className={RegisterStyle.footer}></div>
      </div>
    </div>
  );
}

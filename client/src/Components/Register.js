import React, { useState } from "react";
import RegisterStyle from "../styles/register.module.css";
import { Link, useHistory } from "react-router-dom";
import amzImg from "../assets/images/amazonimg.png";
import userRegister from "../services/user";

export default function Register() {
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
    avatar: "",
  });
  const history = useHistory();
  const inputHandler = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };
  const avatarHandler = (e) => {
    setUserCredentials({ ...userCredentials, avatar: e.target.files[0] });
  };
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(userCredentials);
      let formData = new FormData();
      formData.append("avatar", userCredentials.avatar);
      formData.append("username", userCredentials.username);
      formData.append("email", userCredentials.email);
      formData.append("password", userCredentials.password);
      formData.append("cpassword", userCredentials.cpassword);
      const data = await userRegister(formData);
      console.log(data.status);
      if (data.status === 200) {
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
    }
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
          <form encType="multipart/form-data">
            <div className={RegisterStyle.row}>
              <div className={RegisterStyle.rowContainer}>
                <span>Avatar</span>
                <input type="file" name="avatar" onChange={avatarHandler} />
              </div>
            </div>
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
            <div className={RegisterStyle.row}>
              <div className={RegisterStyle.rowContainer}>
                <button
                  className={RegisterStyle.button}
                  type="submit"
                  onClick={submitHandler}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={RegisterStyle.footer}>
          <span>Already have an account?</span>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span> Login?</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

// cpassword: "5"
// email: "test2@gmail.com"
// password: "5"
// username: "chirag112"

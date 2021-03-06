import React, { useState } from "react";
import loginStyle from "../../styles/login.module.css";
import { Link, useHistory, useParams } from "react-router-dom";
import { resetPassword } from "../../services/user";
export default function Login() {
  const token = useParams();
  const [userCredentials, setUserCredentials] = useState({
    password: "",
    cpassword: "",
  });
  const [isProcessing,setIsProcessing]=useState(false);

  const history = useHistory();

  const inputHandler = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };
  const passwordHandler = async (e) => {
    try {
      e.preventDefault();
      setIsProcessing(true);
      console.log(userCredentials);
      const data = await resetPassword(userCredentials, token);
      setIsProcessing(false);
      if (data.status === 200) {
        history.push("/login");
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
          <h5>New Password</h5>
          <input
            type="password"
            name="password"
            value={userCredentials.password}
            onChange={inputHandler}
          ></input>
          <h5>Confirm Password</h5>
          <input
            type="password"
            name="cpassword"
            value={userCredentials.cpassword}
            onChange={inputHandler}
          ></input>
          <button
            className={loginStyle.login_signinButton}
            type="submit"
            disabled={isProcessing}
            onClick={passwordHandler}
          >
            {isProcessing?"processing...":"Submit"}
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

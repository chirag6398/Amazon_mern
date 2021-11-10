import React, { useEffect, useState } from "react";
import headerStyle from "../styles/header.module.css";
import logo from "../assets/images/amazonLogo.png";
import HeaderLinks from "./HeaderLinks";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { StateValue } from "../StateProvider/StateProvider";
import { userLogout } from "../services/user";
import SideHeader from "./SideHeader";

export default function Header() {
  const [state] = StateValue();
  const [showToggle, setshowToggle] = useState(() => {
    if (window.innerWidth <= 612) return true;
    return false;
  });
  const [isToggle, setIsToggle] = useState(false);
  const logoutHandler = async () => {
    if (state.user) {
      try {
        const res = await userLogout();
      } catch (e) {
        console.log(e);
      }
    }
  };
  const toggleHandler = () => {
    setIsToggle(!isToggle);
    if (!isToggle) {
      document.body.style.overflow = "hidden";
    }
    if (isToggle) {
      document.body.style.overflow = "unset";
    }
  };
  const showToggleHandler = () => {
    if (window.innerWidth <= 612 && !showToggle) {
      setshowToggle(true);
    } else if (window.innerWidth > 612 && showToggle) {
      setshowToggle(false);
      setIsToggle(false);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", showToggleHandler);
    return () => {
      window.removeEventListener("resize", showToggleHandler);
    };
  }, [window.innerWidth]);

  return (
    <>
      <div className={headerStyle.header}>
        <Link to="/">
          <img className={headerStyle.header_logo} src={logo} alt="..." />
        </Link>
        {!showToggle ? (
          <>
            <HeaderLinks />
          </>
        ) : (
          <div>
            <FaBars
              className={headerStyle.toggleButton}
              onClick={toggleHandler}
            />
          </div>
        )}
      </div>
      {isToggle ? (
        <SideHeader isToggle={isToggle} setIsToggle={setIsToggle} />
      ) : null}
    </>
  );
}

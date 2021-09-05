import React, { useEffect, useState } from "react";
import headerStyle from "../styles/header.module.css";
import logo from "../assets/images/amazonLogo.png";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
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
            <div className={headerStyle.header_search}>
              <input className={headerStyle.header_input} type="text"></input>
              <SearchIcon className={headerStyle.header_searchIcon} />
            </div>
            <div className={headerStyle.header_nav}>
              <Link to="/login">
                <div className={headerStyle.header_option}>
                  <span className={headerStyle.header_optionLineOne}>
                    {state.user ? (
                      <span>{`Hello,${state.user.username}`}</span>
                    ) : (
                      "guest"
                    )}
                  </span>

                  <span
                    className={headerStyle.header_optionLineTwo}
                    onClick={logoutHandler}
                  >
                    {state.user ? "sign-out" : "sign-in"}
                  </span>
                </div>
              </Link>
              <div className={headerStyle.header_option}>
                <span className={headerStyle.header_optionLineOne}>return</span>
                <span className={headerStyle.header_optionLineTwo}>
                  & Orders
                </span>
              </div>

              {/* <div className={headerStyle.header_option}>
          <span className={headerStyle.header_optionLineOne}>your</span>
          <span className={headerStyle.header_optionLineTwo}>prime</span>
        </div> */}

              <Link to="/checkout">
                <div
                  className={headerStyle.header_optionBasket}
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ShoppingBasketIcon />
                  <span
                    className={headerStyle.header_optionLineTwo}
                    style={{ margin: "0px 3px" }}
                  >
                    {state.basket?.length}
                  </span>
                </div>
              </Link>
            </div>
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

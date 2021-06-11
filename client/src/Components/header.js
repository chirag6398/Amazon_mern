import React from "react";
import headerStyle from "../styles/header.module.css";
import logo from "../assets/images/amazonLogo.png";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { StateValue } from "../StateProvider/StateProvider";
// import { auth } from "../Firebase/firebase";

export default function header() {
  const [state, dispatch] = StateValue();
  // const authHandler = () => {
  //   if (state.user) {
  //     auth.signOut();
  //   }
  // };

  return (
    <div className={headerStyle.header}>
      <Link to="/">
        <img className={headerStyle.header_logo} src={logo} alt="..." />
      </Link>

      <div className={headerStyle.header_search}>
        <input className={headerStyle.header_input} type="text"></input>
        <SearchIcon className={headerStyle.header_searchIcon} />
      </div>

      <div className={headerStyle.header_nav}>
        <Link to={!state.user && "/login"}>
          <div className={headerStyle.header_option}>
            <span className={headerStyle.header_optionLineOne}>
              {state.user ? <span>{`Hello,${state.user}`}</span> : "guest"}
            </span>

            <span className={headerStyle.header_optionLineTwo}>
              {state.user ? "sign-out" : "sign-in"}
            </span>
          </div>
        </Link>
        <div className={headerStyle.header_option}>
          <span className={headerStyle.header_optionLineOne}>return</span>
          <span className={headerStyle.header_optionLineTwo}>& Orders</span>
        </div>

        <div className={headerStyle.header_option}>
          <span className={headerStyle.header_optionLineOne}>your</span>
          <span className={headerStyle.header_optionLineTwo}>prime</span>
        </div>

        <Link to="/checkout">
          {" "}
          <div
            classname={headerStyle.header_optionBasket}
            style={{ color: "white", display: "flex", alignItems: "center" }}
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
    </div>
  );
}

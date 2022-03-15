import React from "react";
import { Link } from "react-router-dom";
import headerStyle from "../styles/header.module.css";
import { StateValue } from "../StateProvider/StateProvider";
import SearchIcon from "@material-ui/icons/Search";
import { userLogout } from "../services/user";
import HeaderLinksStyle from "../styles/headerLinks.module.css";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
export default function HeaderLinks({ showSearch }) {
  const [state] = StateValue();

  console.log(state);
  const logoutHandler = async () => {
    if (state.user) {
      try {
        const res = await userLogout();
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <div className={HeaderLinksStyle.container}>
      {!showSearch ? (
        <div className={headerStyle.header_search}>
          <input className={headerStyle.header_input} type="text"></input>
          <SearchIcon className={headerStyle.header_searchIcon} />
        </div>
      ) : null}

      <div
        className={
          showSearch ? HeaderLinksStyle.links_container : headerStyle.header_nav
        }
      >
        <Link to="/login">
          <div
            className={
              showSearch ? HeaderLinksStyle.option : headerStyle.header_option
            }
          >
            <span
              className={
                showSearch
                  ? HeaderLinksStyle.optionLineOne
                  : headerStyle.header_optionLineOne
              }
            >
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
        <div
          className={
            showSearch ? HeaderLinksStyle.option : headerStyle.header_option
          }
        >
          <span className={headerStyle.header_optionLineOne}>return</span>
          <span className={headerStyle.header_optionLineTwo}>& Orders</span>
        </div>

        {state.user?.email === "agarwalchirag112@gmail.com" ? (
          <Link to="/addProduct">
            <div
              className={
                showSearch
                  ? HeaderLinksStyle.cartOption
                  : headerStyle.header_option
              }
            >
              <span
                className={headerStyle.header_optionLineOne}
                style={showSearch ? { fontSize: "20px" } : null}
              >
                Add
              </span>
              <span
                style={showSearch ? { fontSize: "20px" } : null}
                className={headerStyle.header_optionLineTwo}
              >
                products
              </span>
            </div>
          </Link>
        ) : null}
        {/* <div className={headerStyle.header_option}>
          <span className={headerStyle.header_optionLineOne}>your</span>
          <span className={headerStyle.header_optionLineTwo}>prime</span>
        </div> */}

        <Link to="/checkout">
          <div
            className={
              showSearch
                ? HeaderLinksStyle.cartOption
                : headerStyle.header_optionBasket
            }
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <ShoppingBasketIcon
              style={showSearch ? { fontSize: "34px" } : null}
            />
            <span
              className={headerStyle.header_optionLineTwo}
              style={{ margin: "0px 3px" }}
            >
              {state.user?.cart?.items?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

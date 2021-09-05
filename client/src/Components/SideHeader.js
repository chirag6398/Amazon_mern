import React from "react";
import sideHeaderStyle from "../styles/sideHeader.module.css";

import { ImCross } from "react-icons/im";
export default function SideHeader({ isToggle, setIsToggle }) {
  const toggleHandler = () => {
    setIsToggle(!isToggle);
    if (!isToggle) {
      document.body.style.overflow = "hidden";
    }
    if (isToggle) {
      document.body.style.overflow = "unset";
    }
  };
  return (
    <div className={sideHeaderStyle.ext_div}>
      <div className={sideHeaderStyle.container} onClick={toggleHandler} />
      <div className={sideHeaderStyle.left}>
        <div className={sideHeaderStyle.right_view}>
          <ImCross
            className={sideHeaderStyle.crossIcon}
            onClick={toggleHandler}
          />
        </div>
        <div className={sideHeaderStyle.left_view}></div>
      </div>
    </div>
  );
}

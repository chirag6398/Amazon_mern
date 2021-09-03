import React from "react";
import addressStyle from "../styles/address.module.css";
export default function Address() {
  return (
    <div className={addressStyle.ext_div}>
      <div className={addressStyle.heading}>
        <div className={addressStyle.mainHeading}>
          <h2>Shipping Infomation</h2>
        </div>
        <div className={addressStyle.content}>
          <div style={{ margin: "15px" }}>icon</div>
          <div>
            <p>
              There's temporary delay in order processing that may affect your
              estimatted delivery date for some products. We'll email you as
              soon as your product ship.
            </p>
          </div>
        </div>
      </div>

      <form>
        <div className={addressStyle.center_div}>
          <div className={addressStyle.row}>
            <input type="text" placeholder="First name" />
          </div>
          <div className={addressStyle.row}>
            <input type="text" placeholder="Last name" />
          </div>
          <div className={addressStyle.row}>
            <input type="text" placeholder="Address" />
          </div>
          <div className={addressStyle.row}>
            <input type="text" placeholder="City" />
          </div>
          <div className={addressStyle.row}>
            <input type="text" placeholder="State" />
          </div>
          <div className={addressStyle.row}>
            <input type="number" placeholder="Zip-code" />
          </div>
          <div className={addressStyle.row}>
            <input type="number" placeholder="Phone number" />
          </div>
          <div className={addressStyle.rowCenter}>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
}

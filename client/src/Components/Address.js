import React, { useState } from "react";
import addressStyle from "../styles/address.module.css";
import { postAddress } from "../services/address";

export default function Address() {
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    number: undefined,
    zipCode: undefined,
    address: "",
    city: "",
    state: "",
  });

  const inputHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(formData);
      const data = await postAddress(formData);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
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
            <input
              type="text"
              name="first"
              value={formData.first}
              onChange={inputHandler}
              placeholder="First name"
            />
          </div>
          <div className={addressStyle.row}>
            <input
              name="last"
              value={formData.last}
              onChange={inputHandler}
              type="text"
              placeholder="Last name"
            />
          </div>
          <div className={addressStyle.row}>
            <input
              name="address"
              value={formData.address}
              onChange={inputHandler}
              type="text"
              placeholder="Address"
            />
          </div>
          <div className={addressStyle.row}>
            <input
              name="city"
              value={formData.city}
              onChange={inputHandler}
              type="text"
              placeholder="City"
            />
          </div>
          <div className={addressStyle.row}>
            <input
              name="state"
              value={formData.state}
              onChange={inputHandler}
              type="text"
              placeholder="State"
            />
          </div>
          <div className={addressStyle.row}>
            <input
              name="zipCode"
              value={formData.zipCode}
              onChange={inputHandler}
              type="number"
              placeholder="Zip-code"
            />
          </div>
          <div className={addressStyle.row}>
            <input
              name="number"
              value={formData.number}
              onChange={inputHandler}
              type="number"
              placeholder="Phone number"
            />
          </div>
          <div className={addressStyle.rowCenter}>
            <button type="submit" onClick={submitHandler}>
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

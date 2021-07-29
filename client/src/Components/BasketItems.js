import React, { useState } from "react";
import basketStyle from "../styles/basketItem.module.css";
import { StateValue } from "../StateProvider/StateProvider";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { arrayBufferToBase64 } from "../util/getImgBuffer";
import { removeitemFromCart } from "../services/user";
export default function BasketItems({ data, quantity, id }) {
  let imgData = arrayBufferToBase64(data?.productImg.data);
  const [{}, dispatch] = StateValue();
  const removeItem = async () => {
    try {
      const status = await removeitemFromCart(id);
      console.log(">>>>>>>>>>>>>>", status);

      if (status) {
        dispatch({ type: "InitialBasket", payload: status.data.cart.items });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={basketStyle.basket_container}>
      <div
        className="card mb-3"
        style={{ border: "none", flexDirection: "row" }}
      >
        <img
          className="card-img-top"
          src={`data:image/png;base64,${imgData}`}
          alt="Card image cap"
          style={{
            width: "50%",
            objectFit: "contain",
            height: "auto",
            maxHeight: "20vh",
          }}
        />
        <div className="card-body">
          <b>{data.desc}</b>
          <hr />
          <h5 className="card-title">{data.title}</h5>
          <strong>Rs.{data.price}</strong>
          <div
            style={{
              display: "flex",
              flex: "1",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              style={{
                width: "200px",
                backgroundColor: "#f0c14b",
                borderColor: "#a88734 #9c7e31 #846a29",
                marginBottom: "10px",
              }}
              className="btn  btn-outline"
              onClick={removeItem}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

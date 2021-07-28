import React from "react";
import checkoutStyle from "../styles/checkout.module.css";
import Subtotal from "./Subtotal";
import BasketItems from "./BasketItems.js";
import { StateValue } from "../StateProvider/StateProvider";

export default function Checkout() {
  const [state] = StateValue();
  return (
    <div className={checkoutStyle.container}>
      <div className={checkoutStyle.checkout_leftSide}>
        <img
          className={checkoutStyle.checkout_ad}
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Audio/Hdpns_Gw_1500x600._CB415716258_.jpg"
          alt="..."
        ></img>
        <h3
          style={{
            fontWeight: "thik",
            padding: "10px",
            borderTop: "1px solid lightgray",
          }}
        >
          Your Basket
        </h3>
        <div className={checkoutStyle.checkout_basket}>
          {state.basket?.map((product) => {
            return (
              <BasketItems
                key={product._id}
                id={product._id}
                data={product.productId}
                quantity={product.quantity}
              />
            );
          })}
          {/* <BasketItems /> */}
        </div>
      </div>
      <div className={checkoutStyle.checkout_rightSide}>
        <Subtotal />
      </div>
    </div>
  );
}

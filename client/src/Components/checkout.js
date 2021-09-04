import React from "react";
import checkoutStyle from "../styles/checkout.module.css";
import Subtotal from "./Subtotal";
import BasketItems from "./BasketItems.js";
import { StateValue } from "../StateProvider/StateProvider";

export default function Checkout() {
  const [state] = StateValue();
  console.log(state.address);
  return (
    <div className={checkoutStyle.container}>
      <div className={checkoutStyle.upper}>
        {state.address ? (
          <div className={checkoutStyle.upper_left}>
            <h4>Delivery Address :</h4>
            <span>{`${state.address?.first} ${state.address?.last}`}</span>
            <span>{`${state.address?.address} , ${state.address?.city} (${state.address?.state})`}</span>
            <span>{`${state.address?.zipCode}`}</span>
            <span>{`${state.address?.number}`}</span>
          </div>
        ) : null}

        <div className={checkoutStyle.upper_right}>
          <Subtotal />
        </div>
      </div>
      <div className={checkoutStyle.lower}>
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
                img={product.productId.productImg.data}
                quantity={product.quantity}
                convertImg
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

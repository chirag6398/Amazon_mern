import React from "react";
import { useHistory } from "react-router-dom";
import SubtotalStyle from "../styles/subtotal.module.css";
import { StateValue } from "../StateProvider/StateProvider";

export default function Subtotal() {
  const [state, dispatch] = StateValue();
  var total = 0;

  if (state.basket?.length) {
    for (let val of state.basket) {
      total += val.productId.price;
    }
  }

  const history = useHistory();
  return (
    <div className={SubtotalStyle.Subtotal_container}>
      <div
        className="card"
        style={{ backgroundColor: "#f8f5f2", color: "#232323" }}
      >
        <div className="card-body">
          <p className="card-text">
            Subtotal ({state.basket?.length}:items) :<b>Rs.{total}</b>
          </p>
          <input type="checkbox" />
          <span>add a gift for match</span>
          <br />
          <button
            onClick={(e) => {
              history.push("/payment");
            }}
            className="btn btn-dark"
            style={{ display: "flex", flex: "1 1 auto" }}
          >
            CheckOut here
          </button>
        </div>
      </div>
    </div>
  );
}

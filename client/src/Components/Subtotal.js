import React from "react";
import { useHistory } from "react-router-dom";
import SubtotalStyle from "../styles/subtotal.module.css";
import { StateValue } from "../StateProvider/StateProvider";
import { addCartToOrder } from "../services/order";

export default function Subtotal() {
  const [state, dispatch] = StateValue();
  var total = 0;

  if (state.basket?.length) {
    for (let val of state.basket) {
      total += val.productId.price * val.quantity;
    }
  }

  const history = useHistory();
  const checkOutHandler = async () => {
    try {
      const data = await addCartToOrder();

      if (data) {
        history.push("/payment");
      }
    } catch (err) {
      console.log(err);
    }
  };
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
            disabled={!state.basket?.length}
            onClick={checkOutHandler}
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

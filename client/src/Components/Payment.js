import React, { useState, useEffect } from "react";
import paymentStyle from "../styles/payment.module.css";
import { StateValue } from "../StateProvider/StateProvider";
import BasketItems from "./BasketItems.js";
import { useHistory } from "react-router-dom";
import subtotalStyle from "../styles/subtotal.module.css";
import { getOrders } from "../services/order";

export default function Payment() {
  const [state, dispatch] = StateValue();
  const history = useHistory();
  const [error, setError] = useState();
  const [disabled, setDisable] = useState();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  var total = 0;
  if (state.orders?.length) {
    for (let val of state.orders) {
      // console.log(val);
      total += val.product.price * val.quantity;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);

    setSucceeded(true);
    setError(null);
    setProcessing(false);

    // history.replace("/orders");
  };
  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      if (data.status === 200) {
        dispatch({ type: "SET_ORDERS", payload: data.data.products });
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className={paymentStyle.payment}>
      <div className={paymentStyle.payment_container}>
        <h1
          onClick={(e) => {
            history.push("/checkout");
          }}
        >
          Checkout ({state.orders?.length} items)
        </h1>
        <div className={paymentStyle.payment_section}>
          <div className={paymentStyle.payment_title}>
            <h3>Delivery address</h3>
          </div>
          <div className={paymentStyle.payment_address}>
            {state.user ? (
              <p>
                {state.user.username}
                <br />
                kayasthan street, Chandausi
              </p>
            ) : null}
          </div>
        </div>
        <div className={paymentStyle.payment_section}>
          <div className={paymentStyle.payment_tile}>
            <h3>Review your items</h3>
          </div>
          <div className={paymentStyle.payment_items}>
            {state.orders?.map((product) => {
              return (
                <BasketItems
                  key={product._id}
                  id={product._id}
                  data={product.product}
                  img={product.product.productImg}
                  quantity={product.quantity}
                />
              );
            })}
          </div>
        </div>

        <div className={paymentStyle.payment_section}>
          <div className={paymentStyle.payment_tile}>
            <h3>Payment Method</h3>
          </div>
          <div className={paymentStyle.payment_details}>
            <form onSubmit={handleSubmit}>
              {/* <CardElement onChange={handleChange} /> */}
              <div className={paymentStyle.payment__paymentDetail}>
                <div className={subtotalStyle.Subtotal_container}>
                  <div
                    className="card"
                    style={{ backgroundColor: "#f8f5f2", color: "#232323" }}
                  >
                    <div className="card-body">
                      <p className="card-text">
                        <b>OrderTotal </b> :<b>Rs.{total}</b>
                      </p>

                      <br />
                      <button
                        disabled={processing || disabled || succeeded}
                        className="btn btn-dark"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flex: "1",
                        }}
                      >
                        <span>
                          {processing ? <p>Processing</p> : "Buy now"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import paymentStyle from "../styles/payment.module.css";
import { StateValue } from "../StateProvider/StateProvider";
import BasketItems from "./BasketItems.js";
import { useHistory } from "react-router-dom";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import subtotalStyle from "../styles/subtotal.module.css";

export default function Payment() {
  // const stripe = useStripe();
  // const elements = useElements();
  const [state, dispatch] = StateValue();
  const history = useHistory();
  const [error, setError] = useState();
  const [disabled, setDisable] = useState();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  // const [clientSecret, setClientSecret] = useState(true);
  var total = 0;

  for (let val of state.basket) {
    total += val.price;
  }

  // useEffect(() => {
  //   const getClientSecret = async () => {
  //     const response = await axios({
  //       method: "post",
  //       url: `/payments/create?total=${total * 100}`,
  //     });
  //     setClientSecret(response.data.clientSecret);
  //   };
  //   getClientSecret();
  // }, [state.basket]);

  // console.log(">>>>>>>>", clientSecret);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProcessing(true);
    // const payload = await stripe
    //   .confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card: elements.getElement(CardElement),
    //     },
    //   })
    //   .then(({ paymentIntent }) => {
    //     db.collection("users")
    //       .doc(state.user)
    //       .collection("orders")
    //       .doc(paymentIntent.id)
    //       .set({
    //         basket: state.basket,
    //         amount: paymentIntent.amount,
    //         created: paymentIntent.created,
    //       });
    setSucceeded(true);
    setError(null);
    setProcessing(false);
    dispatch({
      type: "Empty_basket",
    });
    history.replace("/orders");
    // });
  };

  // const handleChange = (e) => {
  //   setDisable(e.empty);
  //   setError(e.error ? e.error.message : "");
  // };

  return (
    <div className={paymentStyle.payment}>
      <div className={paymentStyle.payment_container}>
        <h1
          onClick={(e) => {
            history.push("/checkout");
          }}
        >
          Checkout ({state.basket?.length} items)
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
            <BasketItems />
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

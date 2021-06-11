import React, { useEffect } from "react";
import "./App.css";
import Header from "./Components/header";
import Home from "./Components/Home/home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Checkout from "./Components/checkout";
import Login from "./Components/Login";
import { auth } from "./Firebase/firebase";
import { StateValue } from "./StateProvider/StateProvider";
import Payment from "./Components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Components/Order.js";

const promise = loadStripe(
  "pk_test_51I93CNDh4RqhgcaKZZSlC1R9mUg40gfGVbRDO6XdTtlNFWLkeq3UkdNiO51jC5u6zCKz8P4BGJLhFrjCrHLWPDjA00VQabmpf2"
);
function App() {
  const [{}, dispatch] = StateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "Set_user",
          user: authUser.providerData[0].email,
        });
      } else {
        dispatch({
          type: "Set_user",
          user: null,
        });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Header />
            <Home />
          </Route>
          <Route exact path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/orders">
            <Header />
            <Orders />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect } from "react";
import "./App.css";
import Header from "./Components/header";
import Home from "./Components/Home/home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Checkout from "./Components/checkout";
import Login from "./Components/Login";
import Register from "./Components/Register";
// import { StateValue } from "./StateProvider/StateProvider";
import Payment from "./Components/Payment";
import Orders from "./Components/Order.js";

function App() {
  // const [{}, dispatch] = StateValue();

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

            <Payment />
          </Route>
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact="/register">
            <Register />
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

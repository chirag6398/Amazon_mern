import React, { useEffect } from "react";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home/Home";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Checkout from "./Components/Checkout";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { StateValue } from "./StateProvider/StateProvider";
import Payment from "./Components/Payment";
import Orders from "./Components/Order.js";
import { userIsAuthenticated } from "./services/user";
function App() {
  const [{}, dispatch] = StateValue();

  const getUser = async () => {
    try {
      const user = await userIsAuthenticated();

      dispatch({ type: "Set_user", payload: user });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
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
            <Payment />
          </Route>
          <Route exact path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
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

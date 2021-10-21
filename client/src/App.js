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
import AddProduct from "./Components/AddProduct";
import { getProducts } from "./services/product";
import { userIsAuthenticated } from "./services/user";
import ForgetPassword from "./Components/forgetpassword/ForgetPassword";
import { getAddress } from "./services/address";
import ProductDetail from "./Components/ProductDetail";
import Address from "./Components/Address";
import ResetPassword from "./Components/forgetpassword/ResetPassword";
function App() {
  const [state, dispatch] = StateValue();

  const getUser = async () => {
    try {
      const user = await userIsAuthenticated();
      const products = await getProducts();

      if (products) {
        dispatch({ type: "Set_products", payload: products });
      }

      if (user) {
        dispatch({ type: "Set_user", payload: user });
        const address = await getAddress();

        dispatch({ type: "SET_ADDRESS", payload: address.data });
        dispatch({ type: "InitialBasket", payload: user.user.cart.items });
        console.log(user.user.cart.items);
      }

      
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  // console.log("length", state.products.products.length);
  // if (!state.products.products?.length) return <div>Loading ......</div>;
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
          <Route exact path="/editAddress">
            <Address data={state.address} />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route exact path="/addProduct">
            <AddProduct />
          </Route>
          <Route exact path="/product/:id">
            <ProductDetail />
          </Route>
          <Route exact path="/forget-password">
            <ForgetPassword />
          </Route>
          <Route exact path="/reset/:token">
            <ResetPassword />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

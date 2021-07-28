import axios from "axios";

const userRegister = async (data) => {
  try {
    const res = await axios.post("/register", data);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const userLogin = async (data) => {
  try {
    const res = await axios.post("/login", data);
    console.log(res);
    return res;
  } catch (err) {
    console.log("login services", err);
  }
};

const userIsAuthenticated = async () => {
  try {
    const res = await axios.get("user/isLogin");
    console.log(res);
    return res.data;
  } catch (e) {
    console.log("authenticated services", e);
  }
};

const userLogout = async () => {
  try {
    const res = await axios.get("user/logout");
    console.log(res);
    return res;
  } catch (e) {
    console.log(e);
  }
};
const getCartItems = async () => {
  try {
    const res = await axios.get("/cartitems");
    console.log(res.data);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const removeitemFromCart = async (key) => {
  try {
    console.log(key);
    const res = await axios.delete(`/removeItemFromCart/${key}`);
  } catch (e) {
    console.log(e);
  }
};
export {
  userLogin,
  userIsAuthenticated,
  removeitemFromCart,
  userLogout,
  getCartItems,
};

export default userRegister;

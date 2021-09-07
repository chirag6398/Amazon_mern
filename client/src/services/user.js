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
  const res = await axios.post("/login", data);

  return res;
};

const userIsAuthenticated = async () => {
  try {
    const res = await axios.get("user/isLogin");

    return res.data;
  } catch (e) {
    console.log("authenticated services", e);
  }
};

const userLogout = async () => {
  try {
    const res = await axios.get("user/logout");

    return res;
  } catch (e) {
    console.log(e);
  }
};
const getCartItems = async () => {
  try {
    const res = await axios.get("/cartitems");

    return res.data;
  } catch (e) {
    console.log(e);
  }
};

const removeitemFromCart = async (id) => {
  try {
    const res = await axios.delete(`/removeItemFromCart/${id}`);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
const userEmail = async (credentials) => {
  const res = await axios.post("/forget-password", credentials);
  console.log(res);
  return res.data;
};
export {
  userLogin,
  userIsAuthenticated,
  removeitemFromCart,
  userLogout,
  getCartItems,
  userEmail,
};

export default userRegister;

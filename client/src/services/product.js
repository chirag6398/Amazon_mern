import axios from "axios";

const uploadProduct = async (data) => {
  try {
    const res = await axios.post("/addProduct", data);
    return res;
  } catch (e) {
    console.log("service product", e);
  }
};
const getProducts = async () => {
  try {
    const res = await axios.get("/getProducts");

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
const getProduct = async (id) => {
  try {
    const res = await axios.get(`/getProduct/${id}`);

    return res.data.data;
  } catch (e) {
    console.log("from services", e);
  }
};

const addToCart = async ({ id }) => {
  try {
    const res = await axios.post("/addToCart", { id });
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export { uploadProduct, getProducts, getProduct, addToCart };

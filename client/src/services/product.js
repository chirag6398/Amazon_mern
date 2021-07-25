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
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export { uploadProduct, getProducts };

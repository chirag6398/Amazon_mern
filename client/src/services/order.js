import axios from "axios";

const addCartToOrder = async () => {
  try {
    const res = await axios.post("/addOrders");
    console.log(res);
    return res.data;
  } catch (e) {
    console.log("addCartToOrder err");
  }
};
const getOrders = async () => {
  try {
    const res = await axios.get("/getOrders");

    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export { addCartToOrder, getOrders };

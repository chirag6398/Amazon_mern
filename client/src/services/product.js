import axios from "axios";

const uploadProduct = async (data) => {
  try {
    const res = await axios.post("/addProduct", data);
    return res;
  } catch (e) {
    console.log("service product", e);
  }
};

export { uploadProduct };

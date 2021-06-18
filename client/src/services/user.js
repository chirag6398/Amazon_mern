import axios from "axios";

const userRegister = async (data) => {
  try {
    const res = await axios.post("/register", data);

    console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default userRegister;

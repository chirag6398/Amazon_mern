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
    return res;
  } catch (err) {
    console.log("login services", err);
  }
};

export { userLogin };

export default userRegister;

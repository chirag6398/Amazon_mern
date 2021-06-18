const User = require("../models/User");
const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  } catch (err) {
    console.log("hash func", err);
  }
};
module.exports = {
  Register: async (req, res) => {
    try {
      const { username, email, password, cpassword } = req.body;
      if (!username || !email || !password || !cpassword) {
        return res.status(401).json({ error: "plz fill all fields" });
      } else if (password != cpassword) {
        return res.status(401).json({ error: "password not matching" });
      } else {
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
          console.log("user exist");
          return res.status(409).json({ alert: "user exist already" });
        } else {
          const newUser = new User({ username, email, password, cpassword });
          newUser.password = await hashPassword(newUser.password);
          const status = await newUser.save();
          if (status) {
            console.log(status);
            return res
              .status(200)
              .json({ message: "user Register successfully" });
          } else {
            return res.status(500).json({ server: "try later" });
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
};

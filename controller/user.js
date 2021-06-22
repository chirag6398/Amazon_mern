const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  } catch (err) {
    console.log("hash func", err);
  }
};

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.SECRET_KEY);
  return token;
};

module.exports = {
  Authenticated: async (req, res) => {
    res.status(200).json({ user: req.user });
  },
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
  Login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({ error: "password not matching" });
      } else {
        const user = await User.findOne({ email });
        if (user) {
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (isPasswordMatch) {
            const token = await generateToken(user._id);
            user.tokens = user.tokens.concat({ token });
            const userTokenSave = await user.save();
            if (userTokenSave) {
              res.cookie("user_token", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
              });
              return res
                .status(200)
                .json({ message: "user login successfully", user });
            } else {
              return res.status(500).json({ error: "server error" });
            }
          } else {
            return res.status(400).json({ error: "wrong credentials" });
          }
        } else {
          return res.status(404).json({ error: "user not found" });
        }
      }
    } catch (err) {
      console.log("login issue", err);
    }
  },
  Logout: async (req, res) => {
    try {
      res.clearCookie("user_token", { path: "/" });
      res.status(201).send("user logout successfully");
    } catch (e) {
      console.log("logout err", e);
    }
  },
};

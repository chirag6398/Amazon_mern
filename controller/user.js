const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sharp = require("sharp");
const nodemailer = require("nodemailer");
const crypt = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  secure: false,
  tls: { rejectUnauthorized: false },
});

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
      let avatarBuffer = null;
      if (req.file) {
        avatarBuffer = await sharp(req.file.buffer)
          .resize({ width: 250, height: 250 })
          .png()
          .toBuffer();
      }

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
          if (avatarBuffer != null) {
            newUser.avatar = avatarBuffer;
          }

          const status = await newUser.save();
          if (status) {
            console.log(status);
            return res
              .status(200)
              .json({ message: "user Register successfully", status: 200 });
          } else {
            return res.status(500).json({ server: "try later" });
          }
        }
      }
    } catch (err) {
      console.log("register", err);
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
          return res.status(404).json({ error: "user not found", status: 404 });
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
  addAvatar: async (req, res) => {
    try {
      console.log("avatar route");
      console.log(req.file);
      const avatarBuffer = await sharp(req.file.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();

      console.log(avatarBuffer);
    } catch (e) {
      console.log("avatar", e);
    }
  },
  cartItems: async (req, res) => {
    try {
      req.user
        .populate("cart.items.productId")
        .execPopulate()
        .then((user) => {
          console.log(user);
          return res.status(200).json({ cart: user.cart });
        })
        .catch((e) => {
          console.log(e);
          return res.status(500).json({ error: "server error" });
        });
    } catch (e) {
      console.log(e);
      res.status(404).json({ error: "internal error" });
    }
  },
  deleteCartItem: async (req, res) => {
    try {
      console.log(req.params.id);
      req.user
        .removeCartItem(req.params.id)
        .then((status) => {
          console.log(status);
          return res.status(200).json({ data: status });
        })
        .catch((e) => {
          console.log(e);
          return res.status(500);
        });

      return res.status(200);
    } catch (e) {
      console.log(e);
      return res.status(404);
    }
  },
  forgetPassword: async (req, res) => {
    try {
      if (req.body.email) {
        crypt.randomBytes(32, (err, buffer) => {
          if (err) {
            console.log(err);
          } else {
            const token = buffer.toString("hex");

            User.findOne({ email: req.body.email })
              .then((user) => {
                user.resetToken = token;
                user.expireToken = Date.now() + 3600000;

                user
                  .save()
                  .then((result) => {
                    const mailOptions = {
                      from: "no-reeply@gmail.com",
                      to: result.email,
                      subject: "reset password",
                      html: `<p>you requested for password reset
                      <p>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password`,
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                      if (error) {
                        console.log("mail not send ", error);
                        return res.status(500);
                      }
                    });

                    return res
                      .status(200)
                      .json({ message: "check your mail", status: 200 });
                  })
                  .catch((err) => {
                    console.log("result not saved", err);
                    return res
                      .status(500)
                      .json({ error: "internal error", status: 500 });
                  });
              })
              .catch((err) => {
                console.log("user not found", err);
                return res
                  .status(500)
                  .json({ error: "internal error", status: 404 });
              });
          }
        });
      } else {
        return res.status(500).json({ error: "internal error", status: 404 });
      }
    } catch (e) {
      console.log(e);
      return res.status(500).json({ error: "internal error", status: 404 });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { password, cpassword } = req.body;
      const token = req.params.token;
      if (!password || !cpassword) {
        return res.status(404).json({ error: "plz fill all fields" });
      }
      if (password != cpassword) {
        return res
          .status(404)
          .json({ error: "password does not match with cpassword" });
      }
      User.findOne({ resetToken: token, expireToken: { $gt: Date.now() } })
        .then(async (user) => {
          user.password = await hashPassword(password);
          user.resetToken = undefined;
          user.expireToken = undefined;
          console.log(user);
          user
            .save()
            .then((result) => {
              return res
                .status(200)
                .json({ message: "password reset successfully", status: 200 });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500);
            });
        })
        .catch((err) => {
          console.log(err);
          return res.status(300).json({ message: "token expire", status: 300 });
        });
    } catch (e) {
      console.log(e);
      return res.status(500);
    }
  },
};

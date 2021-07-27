const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.user_token;

    if (token) {
      const isVerify = jwt.verify(token, process.env.SECRET_KEY);

      const user = await User.findOne({
        _id: isVerify.id,
        "tokens.token": token,
      });
      if (!user) {
        return res.status(402).json({ message: "user not authenticated" });
      }

      req.user = user;

      next();
    } else {
      req.user = null;
      next();
    }
  } catch (e) {
    console.log("auth middleware ", e);
    return res
      .status(404)
      .json({ message: "user is not authenticated", status: 404 });
  }
};

module.exports = auth;

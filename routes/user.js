const route = require("express").Router();
const userController = require("../controller/user");
const auth = require("../middleware/auth");

route.get("/user/logout", auth, userController.Logout);
route.get("/user/isLogin", auth, userController.Authenticated);
route.post("/register", userController.Register);
route.post("/login", userController.Login);

module.exports = route;

// router.get("/api/logout", (req, res) => {
//     res.clearCookie("jwttoken", { path: "/" });
//     res.status(201).send("user logout successfully");
//   });

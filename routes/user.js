const route = require("express").Router();
const userController = require("../controller/user");
const auth = require("../middleware/auth");
const multer = require("multer");

const uploadAvatar = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return new Error("file not supported");
    }
    cb(undefined, true);
  },
});

route.get("/user/logout", auth, userController.Logout);
route.get("/user/isLogin", auth, userController.Authenticated);
route.post("/register", uploadAvatar.single("avatar"), userController.Register);
route.post(
  "/addAvatar",
  uploadAvatar.single("productImg"),
  userController.addAvatar
);
route.post("/login", userController.Login);

module.exports = route;

// router.get("/api/logout", (req, res) => {
//     res.clearCookie("jwttoken", { path: "/" });
//     res.status(201).send("user logout successfully");
//   });

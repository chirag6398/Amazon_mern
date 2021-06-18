const route = require("express").Router();
const userController = require("../controller/user");

route.post("/register", userController.Register);
route.post("/login", userController.Login);

module.exports = route;

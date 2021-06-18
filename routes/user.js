const route = require("express").Router();
const userController = require("../controller/user");

route.post("/register", userController.Register);

module.exports = route;

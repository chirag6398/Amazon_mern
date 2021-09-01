const route = require("express").Router();
const auth = require("../middleware/auth");
const orderController = require("../controller/order");

route.post("/addOrders", auth, orderController.postOrders);

module.exports = route;

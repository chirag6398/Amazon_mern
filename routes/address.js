const route = require("express").Router();
const auth = require("../middleware/auth");
const addressController = require("../controller/address");

route.post("/postAddress", auth, addressController.postAddress);

module.exports = route;

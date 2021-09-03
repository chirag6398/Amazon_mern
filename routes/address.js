const route = require("express").Router();
const auth = require("../middleware/auth");
const addressController = require("../controller/address");

route.post("/postAddress", auth, addressController.postAddress);
route.get("/getAddress", auth, addressController.getAddress);
module.exports = route;

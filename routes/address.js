const route = require("express").Router();
const auth = require("../middleware/auth");
const addressController = require("../controller/address");

route.post("/postAddress", auth, addressController.postAddress);
route.put("/editAddress",auth,addressController.editAddress);
route.get("/getAddress", auth, addressController.getAddress);
module.exports = route;

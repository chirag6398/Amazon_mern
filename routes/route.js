const route = require("express").Router();

route.get("/", (req, res) => {
  res.send("its working");
});
module.exports = route;

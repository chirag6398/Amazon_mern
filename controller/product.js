const Product = require("../models/product");

module.exports = {
  addProduct: async (req, res) => {
    try {
      console.log(req.body);
      console.log(req.file);

      return res
        .status(200)
        .json({ message: "successufully added product", status: 200 });
    } catch (e) {
      console.log("error on add product", e);
    }
  },
};

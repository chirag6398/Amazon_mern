const Product = require("../models/product");
const sharp = require("sharp");
module.exports = {
  addProduct: async (req, res) => {
    try {
      const { title, desc, price } = req.body;
      if (!title || !desc || !price || !req.file) {
        return res
          .status(404)
          .json({ error: "plz fill all feilds", status: 404 });
      } else {
        const productImg = await sharp(req.file.buffer)
          .resize({ width: 250, height: 250 })
          .png()
          .toBuffer();

        const product = new Product({ title, desc, price, productImg });
        product.userId = req.user;
        // console.log(product);
        // console.log(req.user);
        const productSaveStatus = await product.save();
        if (productSaveStatus) {
          console.log(productSaveStatus);
          return res
            .status(200)
            .json({ message: "successufully added product", status: 200 });
        }

        return res
          .status(500)
          .json({ message: "internal server error", status: 500 });
      }
    } catch (e) {
      console.log("error on add product", e);
    }
  },
  getProducts: async (req, res) => {
    try {
      Product.find()
        .then((products) => {
          console.log(products);
          return res.status(200).json({ products });
        })
        .catch((e) => {
          console.log(e);
          return res
            .status(500)
            .json({ error: "internal server error", status: 500 });
        });
    } catch (e) {
      console.log("get product catch", e);
    }
  },
};

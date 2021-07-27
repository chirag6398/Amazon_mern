const Product = require("../models/product");
const User = require("../models/User");
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
  getProduct: async (req, res) => {
    try {
      const id = req.params.id;
      // console.log(id);
      Product.findById({ _id: id })
        .then((product) => {
          console.log(product);
          return res.status(200).json({ data: product, status: 200 });
        })
        .catch((e) => {
          console.log(e);
          return res.status(500);
        });
    } catch (e) {
      console.log("get product route", e);
    }
  },
  addToCart: async (req, res) => {
    try {
      User.findById({ _id: req.user._id })
        .then((user) => {
          user
            .addToCart(req.body.id)
            .then((response) => {
              console.log(response);

              return res.status(200).json({
                message: "product added to cart successfully",
                cart: response.cart,
                status: 200,
              });
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
      return res
        .status(404)
        .json({ error: "somthing went wrong", status: 404 });
    }
  },
};

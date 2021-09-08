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

        const productSaveStatus = await product.save();
        if (productSaveStatus) {
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

      Product.findById({ _id: id })
        .then((product) => {
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
              response
                .populate("cart.items.productId")
                .execPopulate()
                .then((user) => {
                  console.log(user);
                  return res.status(200).json({ cart: user.cart });
                })
                .catch((e) => {
                  console.log(e);
                  return res.status(500).json({ error: "server error" });
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
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      Product.findOneAndDelete({ _id: id })
        .then((product) => {
          return res
            .status(200)
            .json({ message: "product remove successfully", status: 200 });
        })
        .catch((e) => {
          console.log(e);
          return res.status(500);
        });
    } catch (err) {
      console.log(err);
      return res.status(404);
    }
  },
};

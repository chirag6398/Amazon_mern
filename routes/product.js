const route = require("express").Router();
const productController = require("../controller/product");
const multer = require("multer");
const auth = require("../middleware/auth");
const uploadProductImg = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return new Error("file not supported");
    }
    cb(undefined, true);
  },
});

route.post(
  "/addProduct",
  uploadProductImg.single("productImg"),
  auth,
  productController.addProduct
);
route.post("/addToCart", auth, productController.addToCart);
route.get("/getProducts", productController.getProducts);

route.get("/getProduct/:id", productController.getProduct);

module.exports = route;

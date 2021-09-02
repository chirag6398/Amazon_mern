const Order = require("../models/order");

module.exports = {
  postOrders: async (req, res) => {
    try {
      req.user
        .populate("cart.items.productId")
        .execPopulate()
        .then(async (us) => {
          const products = us.cart.items.map((pr) => {
            return {
              quantity: pr.quantity,
              product: { ...pr.productId._doc },
            };
          });

          const user = { name: req.user.username, userId: req.user._id };

          const isUserExist = await Order.findOne({
            "user.userId": req.user._id,
          });
          if (isUserExist) {
            isUserExist.products = products;
            console.log(isUserExist);
            const response = await isUserExist.save();
            if (response) {
              return res
                .status(200)
                .json({ message: "order save successfully" });
            } else {
              return res.status(500);
            }
          } else {
            const orderInstance = new Order({ products, user });
            const response = await orderInstance.save();
            if (response) {
              return res
                .status(200)
                .json({ message: "order save successfully" });
            } else {
              return res.status(500);
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
      return res.staus(404).json({ error: "internal error" });
    }
  },
  getOrders: async (req, res) => {
    try {
      const response = await Order.findOne({ "user.userId": req.user._id });

      if (response) {
        return res.status(200).json({ data: response, status: 200 });
      } else {
        return res.status(500).json({ error: "internal server error" });
      }
    } catch (e) {
      console.log(e);
    }
  },
};

const Order = require("../models/order");

module.exports = {
  postOrders: async (req, res) => {
    try {
      req.user
        .populate("cart.items.productId")
        .execPopulate()
        .then((us) => {
          const products = us.cart.items.map((pr) => {
            return {
              quantity: pr.quantity,
              product: pr.productId,
            };
          });
          console.log(products);
          const user = { name: req.user.username, userId: req.user._id };
          console.log(user);
          const orderInstance = new Order({ products, user });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
      return res.staus(404).json({ error: "internal error" });
    }
  },
};

const mongoose = require("mongoose");
const moment = require("moment");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: Buffer,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  createdAt: {
    type: String,
    default:
      moment().format("DD/MM/YYYY") + " : " + moment().format("hh/mm/ss"),
  },
  updatedAt: {
    type: String,
    default:
      moment().format("DD/MM/YYYY") + " : " + moment().format("hh/mm/ss"),
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
userSchema.methods.addToCart = async function (id) {
  try {
    let productIndex = -1;
    productIndex = this.cart.items.findIndex((prod) => {
      return prod.productId == id;
    });
    console.log(productIndex);
    const newCartItems = [...this.cart.items];
    if (productIndex != -1) {
      newCartItems[productIndex].quantity += 1;
    } else {
      const newProduct = { productId: id, quantity: 1 };
      newCartItems.push(newProduct);
    }

    this.cart.items = newCartItems;
    await this.save();
    return this;
  } catch (e) {
    console.log(e);
  }
};
userSchema.methods.removeCartItem = async function (id) {
  try {
    const newCartitems = this.cart.items.filter((prod) => {
      return prod._id.toString() != id.toString();
    });

    // const newCartItems = [...this.cart.items];
    // if (productIndex != -1) {
    //   newCartItems[productIndex].quantity += 1;
    // } else {
    //   const newProduct = { productId: id, quantity: 1 };
    //   newCartItems.push(newProduct);
    // }

    this.cart.items = newCartitems;
    await this.save();
    return this;
  } catch (e) {
    console.log(e);
  }
};

module.exports = mongoose.model("User", userSchema);

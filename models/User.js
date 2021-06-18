const mongoose = require("mongoose");
const moment = require("moment");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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

module.exports = mongoose.model("User", userSchema);

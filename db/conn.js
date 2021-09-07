const mongoose = require("mongoose");
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("mongo connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("mongoo connection failed");
  });

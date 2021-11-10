const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path=require("path")
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;
app.use(express.static(path.resolve(__dirname, "client/build")));

require("./db/conn");

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require("./routes/user"));
app.use(require("./routes/product"));
// app.use(require("./routes/route"));
app.use(require("./routes/order"));
app.use(require("./routes/address"));

app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});

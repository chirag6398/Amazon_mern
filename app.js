const dotenv = require("dotenv");
const express = require("express");
const app = express();
const morgan = require("morgan");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 5000;
// app.use(express.static(path.resolve(__dirname, "client/build")));

// mongoose connection
require("./db/conn");

// Middleware
app.use(express.json());
// app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// routes file serve
app.use(require("./Routes/route"));

// app.get("*", function (req, res) {
//   res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});

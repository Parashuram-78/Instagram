const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
dotenv.config({ path: "./config.env" });
const routes = require("./routes");
const db_url = process.env.DB_URL;

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", routes);
mongoose
  .connect(db_url)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("first")
  });

app.listen(5000, () => {
  console.log("server running on port 5000");
});

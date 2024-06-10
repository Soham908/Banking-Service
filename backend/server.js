const axios = require("axios");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userAuth = require("./routes/userAuthRoute");
const userMoney = require("./routes/userMoneyRoute");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "banking-service",
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log("error" + error);
  });

app.use(express.json());

app.use("/userAuth", userAuth);
app.use("/userMoney", userMoney);

app.listen(3001, () => {
  console.log("Server started, second try baby gurl");
});

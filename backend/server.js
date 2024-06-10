const axios = require("axios");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userAuth = require("./routes/userAuthRoute");
const userMoney = require("./routes/userMoneyRoute");
require("dotenv").config();
const cors = require('cors');


mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "banking-service",
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log("error" + error);
  });

app.use(express.json());
app.use(cors());


app.use("/userAuth", userAuth);
app.use("/userMoney", userMoney);

app.listen(process.env.PORT, () => {
  console.log("Server started, second try baby gurl");
});

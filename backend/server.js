const axios = require("axios");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userAuth = require("./routes/userAuthRoute");
const userMoney = require("./routes/userMoneyRoute");
const goalAppIntegrationRoute = require("./routes/goalAppIntegrationRoute");
require("dotenv").config();
const cors = require("cors");

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
app.use("/integration", goalAppIntegrationRoute);
app.get("/", (req, res) => {
  res.json({
    message: "You have reached the banking service api endpoint url, if you want to access the frontend use this link https://banking-service.vercel.app/",
    appName: "The name of this application is Banking Service",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Server started !");
});

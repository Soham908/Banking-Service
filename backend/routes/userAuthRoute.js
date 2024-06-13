const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();

router.post("/register-new", async (req, res) => {
  const register = await userModel.create({
    username: req.body.username,
    password: req.body.password,
    balanceAmount: 10000,
    transactionHistory: {
      description: "Account created bonus",
      amount: 10000,
      transactionType: "Debit",
    },
  });
  console.log(register);
  res.json({ register, success: true });
});

router.post("/login", async (req, res) => {
  const login = await userModel.findOne({ username: req.body.username });
  if (login && login.password === req.body.password) {
    res.json({ login, success: true });
  } else {
    console.log("wrong password");
    res.json({ success: false, message: "user does not exist or password wrong" })
  }
});

module.exports = router;

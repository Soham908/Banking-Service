const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();

router.get("/balance", async (req, res) => {
  const fetchUserData = await userModel.findOne({
    username: req.body.username,
  });
  res.json(fetchUserData);
});

router.post("/addMoney", async (req, res) => {
  const addMoney = await userModel.findOneAndUpdate(
    { username: req.body.username },
    {
      $inc: { balanceAmount: req.body.amount },
      $push: {
        transactionHistory: {
          amount: req.body.amount,
          description: req.body.description,
        },
      },
    },
    { new: true, upsert: true }
  );
  res.json(addMoney);
});

router.post("/transaction", async (req, res) => {
  const transaction = await userModel.findOneAndUpdate(
    { username: req.body.username },
    {
      $inc: { balanceAmount: req.body.amount },
      $push: { transactionHistory: req.body.transaction },
    },
    { new: true }
  );
  console.log(transaction);
  res.json(transaction);
});

module.exports = router;

const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();

router.get("/balance/:username", async (req, res) => {
  const fetchUserData = await userModel.findOne({
    username: req.params.username
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
          transactionType: req.body.transactionType
        },
      },
    },
    { new: true, upsert: true }
  );
  res.json(addMoney);
});

router.post("/transferMoney", async (req, res) => {
  const transaction = await userModel.findOneAndUpdate(
    { username: req.body.username },
    {
      $inc: { balanceAmount: req.body.amount },
      $push: {
        transactionHistory: {
          amount: req.body.amount,
          description: req.body.description,
          transactionType: req.body.transactionType
        },
      },
    },
    { new: true }
  );
  console.log(transaction);
  res.json(transaction);
});

router.get("/transaction-history/:username", async (req, res) => {
  const transactions = await userModel.findOne({username: req.params.username})
  res.json(transactions)
})

module.exports = router;

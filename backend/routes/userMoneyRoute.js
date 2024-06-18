const express = require("express");
const userModel = require("../models/userModel");
const router = express.Router();

router.get("/balance/:username", async (req, res) => {
  const fetchUserData = await userModel.findOne(
    {
      username: req.params.username,
    },
    { balanceAmount: 1 }
  );
  res.json(fetchUserData);
});

router.post("/add-money", async (req, res) => {
  const addMoney = await userModel.findOneAndUpdate(
    { username: req.body.username },
    {
      $inc: { balanceAmount: req.body.amount },
      $push: {
        transactionHistory: {
          amount: req.body.amount,
          description: req.body.description,
          transactionType: "Debit",
        },
      },
    },
    { new: true }
  );
  res.json({
    balanceAmount: addMoney.balanceAmount,
    transaction:
      addMoney.transactionHistory[addMoney.transactionHistory.length - 1],
  });
});

router.post("/transfer-money", async (req, res) => {
  const amt = parseFloat(req.body.amount) * -1 
  const transaction = await userModel.findOneAndUpdate(
    { username: req.body.username },
    {
      $inc: { balanceAmount: amt },
      $push: {
        transactionHistory: {
          amount: amt,
          description: req.body.description,
          transactionType: "Credit"
        },
      },
    },
    { new: true }
  );
  console.log(transaction);
  res.json({
    balanceAmount: transaction.balanceAmount,
    transaction:
      transaction.transactionHistory[transaction.transactionHistory.length - 1],
  });
});

router.get("/transaction-history/:username", async (req, res) => {
  const transactions = await userModel.findOne(
    { username: req.params.username },
    { transactionHistory: 1 }
  );
  res.json(transactions);
});

module.exports = router;

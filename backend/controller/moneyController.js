const userModel = require("../models/userModel");


// the route for this function => /api/money/add-money-to-account
// post method
exports.addMoneyToAccountControllerFunc = async (req, res) => {
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
    reservedFunds: addMoney.reservedFunds,
  });
};

// the route for this function => /api/money/transfer-money-from-account
// post method
exports.transferMoneyFromAccountControllerFunc = async (req, res) => {
  const amt = parseFloat(req.body.amount) * -1;
  const transferMoney = await userModel.findOneAndUpdate(
    { username: req.body.username },
    {
      $inc: { balanceAmount: amt },
      $push: {
        transactionHistory: {
          amount: amt,
          description: req.body.description,
          transactionType: "Credit",
        },
      },
    },
    { new: true }
  );
  res.json({
    balanceAmount: transferMoney.balanceAmount,
    transaction:
      transferMoney.transactionHistory[transferMoney.transactionHistory.length - 1],
    reservedFunds: transferMoney.reservedFunds,
  });
};

// the route for this function => /api/money/check-account-balance/:username
// get method
exports.checkAccountBalanceControllerFunc = async (req, res) => {
  const fetchUserData = await userModel.findOne(
    {
      username: req.params.username,
    },
    { balanceAmount: 1, reservedFunds: 1 }
  );
  res.json(fetchUserData);
};

// the route for this function => /api/money/check-transaction-history/:username
// get method
exports.checkTransactionHistoryControllerFunc = async (req, res) => {
  const transactions = await userModel.findOne(
    { username: req.params.username },
    { transactionHistory: 1 }
  );
  res.json(transactions);
};

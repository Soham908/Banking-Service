const userModel = require("../models/userModel");


// the route for this function  => /api/auth/register (post)
// the data required            => username and password
exports.registerControllerFunc = async (req, res) => {
  const register = await userModel.create({
    username: req.body.username,
    password: req.body.password,
    balanceAmount: 10000,
    reservedFunds: 0,
    transactionHistory: {
      description: "Account created bonus",
      amount: 10000,
      transactionType: "Debit",
    },
  });
  console.log(register);
  res.json({ register, success: true });
};

// the route for this function  => /api/auth/login    (post)
// the data required            => username and password
exports.loginControllerFunc = async (req, res) => {
  const login = await userModel.findOne({ username: req.body.username });
  if (login && login.password === req.body.password) {
    res.json({ login, success: true });
  } else {
    console.log("wrong password");
    res.json({
      success: false,
      message: "User does not exist or Wrong password",
    });
  }
};

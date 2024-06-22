const express = require("express");
const { checkAccountBalanceControllerFunc, addMoneyToAccountControllerFunc, transferMoneyFromAccountControllerFunc, checkTransactionHistoryControllerFunc } = require("../controller/moneyController");
const router = express.Router();

// base path => /api/money

router.post("/add-money-to-account", addMoneyToAccountControllerFunc);
router.post("/transfer-money-from-account", transferMoneyFromAccountControllerFunc);

router.get("/check-account-balance/:username", checkAccountBalanceControllerFunc);
router.get("/check-transaction-history/:username", checkTransactionHistoryControllerFunc);

module.exports = router;

const express = require('express')
const { reserveFundsRequestControllerFunc, reserveFundsResponseControllerFunc } = require('../controller/integrationFinanceGoalAppController')
const router = express.Router()

// base path => /api/integrate-app/finance-goal-app

router.post("/reserve-funds-request", reserveFundsRequestControllerFunc)
router.post("/reserve-funds-response", reserveFundsResponseControllerFunc)

module.exports = router
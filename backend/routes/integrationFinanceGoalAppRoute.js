const express = require('express')
const { reserveFundsRequestControllerFunc, reserveFundsResponseControllerFunc, releaseFundsRequestControllerFund } = require('../controller/integrationFinanceGoalAppController')
const router = express.Router()

// base path => /api/integrate-app/finance-goal-app

router.post("/reserve-funds-request", reserveFundsRequestControllerFunc)
router.post("/reserve-funds-response", reserveFundsResponseControllerFunc)

router.post("/release-funds-request", releaseFundsRequestControllerFund)

module.exports = router
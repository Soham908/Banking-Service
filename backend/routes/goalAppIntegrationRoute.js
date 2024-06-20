const express = require('express')
const { reserveFunds, reserveFundsResponse } = require('../controller/goalAppIntegrationController')
const router = express.Router()

router.post("/fin-goal/reserve-funds", reserveFunds)
router.post("/fin-goal/reserve-funds-response", reserveFundsResponse)

module.exports = router

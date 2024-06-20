const express = require('express')
const { getNotification } = require('../controller/notificationController')
const router = express.Router()

// /notification base path

router.get("/get-notification/:username", getNotification)

module.exports = router
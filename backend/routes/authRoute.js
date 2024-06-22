const express = require("express");
const { registerControllerFunc, loginControllerFunc } = require("../controller/authController");
const router = express.Router();

// base path => /api/auth

router.post("/register", registerControllerFunc);
router.post("/login", loginControllerFunc);

module.exports = router;

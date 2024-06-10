const express = require('express')
const userModel = require('../models/userModel')
const router = express.Router()

router.post('/register', async (req,res) => {
    const register = await userModel.create({
        username: req.body.username,
        password: req.body.password,
        balanceAmount: 1000
    })
    console.log(register);
    res.json(register)
})

router.get('/login', async (req, res) => {
    const login = await userModel.findOne({username: req.body.username, password: req.body.password})
    console.log(login);
    res.json(login)
})

module.exports = router
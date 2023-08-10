const express = require('express')
const UserController = require('../controllers/accountController')
const router = express.Router()

router.post('/login', UserController.login)

module.exports = router
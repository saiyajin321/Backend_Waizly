const express = require('express')
const logController = require('../controllers/logController')
const { authentication } = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const router = express.Router()


router.use(authentication)
router.get('/', authorization, logController.showLog)

module.exports = router
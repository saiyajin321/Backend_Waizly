const express = require('express')
const router = express.Router()
const productRouter = require('./Product')
const userRouter = require('./account')
const logRouter = require('./log')

router.use("/products", productRouter)
router.use("/user", userRouter)
router.use("/log", logRouter)


module.exports = router
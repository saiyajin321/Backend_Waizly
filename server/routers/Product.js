const express = require('express')
const productController = require('../controllers/productController')
const { authentication } = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const router = express.Router()

router.use(authentication)
router.get('/', productController.showProducts)
router.get('/:id', productController.showProductById)
router.post('/product', authorization, productController.addProducts)
router.delete('/product/:id', authorization, productController.deleteProducts)
router.put('/product/:id', authorization, productController.updateProduct)

module.exports = router
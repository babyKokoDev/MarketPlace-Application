const express = require('express')
const { addProducts, getProducts, editAProduct } = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()



router.post('/add-product', authMiddleware, addProducts)
router.get('/get-product', getProducts)
router.put('/edit-product/:id', authMiddleware, editAProduct)

module.exports = router
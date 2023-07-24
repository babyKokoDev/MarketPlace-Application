const express = require('express')
const { addProducts, getProducts } = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()



router.post('/add-product', authMiddleware, addProducts)
router.get('/get-product', getProducts)

module.exports = router
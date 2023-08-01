const express = require('express')
const { addProducts, getProducts, editAProduct, deleteProduct } = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()



router.post('/add-product', authMiddleware, addProducts)
router.get('/get-product', getProducts)
router.put('/edit-product/:id', authMiddleware, editAProduct)
router.delete('/delete-product/:id', authMiddleware, deleteProduct)

module.exports = router
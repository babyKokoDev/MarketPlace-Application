const express = require('express')
const { addProducts } = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()



router.post('/add-product', authMiddleware, addProducts)
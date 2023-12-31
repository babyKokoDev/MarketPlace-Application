const express = require("express");
const {
  addProducts,
  getProducts,
  editAProduct,
  deleteProduct,
  uploadImage,
  updateProductStatus,
  getProductById,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const multer = require("multer");

router.post("/add-product", authMiddleware, addProducts);
router.post("/get-product", getProducts);
router.put("/edit-product/:id", authMiddleware, editAProduct);
router.delete("/delete-product/:id", authMiddleware, deleteProduct);


// Get Image from PC
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

router.post('/upload-image-to-product', authMiddleware, multer({storage : storage}).single('file'), uploadImage)


// Update product status from admin 
router.put('/update-product-status/:id', authMiddleware, updateProductStatus)

// Get product by id
router.get('/get-product-by-id/:id', authMiddleware, getProductById)
module.exports = router;

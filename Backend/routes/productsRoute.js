const express = require("express");
const {
  addProducts,
  getProducts,
  editAProduct,
  deleteProduct,
  uploadImage,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const multer = require("multer");

router.post("/add-product", authMiddleware, addProducts);
router.get("/get-product", getProducts);
router.put("/edit-product/:id", authMiddleware, editAProduct);
router.delete("/delete-product/:id", authMiddleware, deleteProduct);


// Get Image from PC
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

router.post('/upload-image-to-product', authMiddleware, multer({storage : storage}).single('file'), uploadImage)

module.exports = router;

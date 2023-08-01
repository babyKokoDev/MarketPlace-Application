const Product = require("../models/productsModel");

const addProducts = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.send({
          success: true,
          products,
        })
    } catch (error) {
        res.send({
            success : false,
            message : error.message
        })
    }
}

const editAProduct = async (req, res) => {
   try {
      await Product.findByIdAndUpdate(req.params.id, req.body)
      res.send({
        success: true,
        message:'Product updated successfully'
      })
   } catch (error) {
      res.send({
        success : false,
        message : error.message
      })
   }
}

const deleteProduct = async (req, res) => {
  try {
        await Product.findByIdAndDelete(req.params.id)
        res.send({
          success : true,
          message : 'Product deleted successfully'
        })
  } catch (error) {
      res.send({
        success : false,
        message : error.message
      })
  }
}

module.exports = {
  addProducts,
  getProducts,
  editAProduct,
  deleteProduct
};

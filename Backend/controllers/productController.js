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
        
    } catch (error) {
        
    }
}

module.exports = {
  addProducts,
  getProducts
};

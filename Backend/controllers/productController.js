const Product = require("../models/productsModel");
const cloudinary  = require("../dB/cloudinaryConfig")
const User = require("../models/userModel")
const Notification = require("../models/notification")

const addProducts = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    // Send notification.admin
     const admins = await User.find({role : 'admin'})
     admins.forEach( async (admins)=> {
        const newNotification = new Notification({
          title: "New Product",
          message: `New product added by ${req.user.name}`,
          user: admins._id,
          onClick: "/admin",
          read : false
        })

        await newNotification.save()
     })



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
        const {seller, category = [], age = [], status} = req.body
        let filters = {}
        if (seller){
          filters.seller = seller
        }
        if (status){
          filters.status = status
        }
        if (category.length > 0){
          filters.category = { $in: category}
        }
        if (age.length > 0){
          age.forEach((item)=>{
              const fromAge = item.split('-')[0]
              const toAge = item.split('-')[1]
              filters.age = { $gte : fromAge, $lt : toAge}
          })
        }
        const products = await Product.find(filters).populate('seller').sort({ createdAt: -1 })
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

const  uploadImage = async (req, res) => {
  try {
      const result = await cloudinary.uploader.upload(req.file.path, {folder : "marketplace",})
      const productId = req.body.productId
      await Product.findByIdAndUpdate(productId, {
        $push : { images : result.secure_url }
      })
      res.send({
        success : true,
        message : 'Image uploaded successfully',
        data : result.secure_url
      })
  } catch (error) {
    res.send({
      success : false,
      message : error.message
    })
  }
}

const updateProductStatus = async (req, res) => {
  try {
      const { status } = req.body
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { status })

      // Send notification to seller 
      const newNotification = new Notification({
        title: "Product Status Updated",
        message: `Your Product ${updatedProduct.name} has been ${status}`,
        user: updatedProduct.seller,
        onClick: "/profile",
        read : false
      })
       await newNotification.save()


      res.send({
        success: true,
        message : 'Product status updated successfully'
      })
  } catch (error) {
    res.send({
      success : false,
      message : error.message
    })
  }
}

const getProductById = async (req, res) => {
  try {
     const product = await Product.findById(req.params.id).populate('seller')
     res.send({
       success: true,
       data : product
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
  deleteProduct,
  uploadImage,
  updateProductStatus,
  getProductById
};

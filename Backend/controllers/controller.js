const users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const user = await users.findOne({ email: req.body.email });
    if (user) {
      throw new Error("User already exists");
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //   Save New User
    const newUser = new users(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User saved successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    // check if user exists
    const user = await users.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }

    // check if user is active
    if(user.status !== 'active'){
      throw new Error('The user is blocked, please contact the admin')
    }

    // Compare Password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      throw new Error("Invalid password");
    }

    // create and assign token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send Response
    res.send({
      success: true,
      message: "User Login successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await users.findById(req.body.userId);
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const Users = await users.find();
    res.send({
      success: true,
      message: "Users fetched successfully",
      data: Users,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    await users.findByIdAndUpdate(req.params.id, req.body);
    res.send({
      success: true,
      message: "user status updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  userLogin,
  getCurrentUser,
  getAllUsers,
  updateUser,
};

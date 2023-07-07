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

    // create and assign token
    const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET)

    //   Save New User
    const newUser = req.body;
    await newUser.save();
    res.send({
      success: true,
      message: "User saved successfully",
      data : token
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

    // Compare Password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    // Send Response
    res.send({
      success: true,
      message: "User Login successfully",
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
};

const express = require("express");
const router = express.Router();
const { registerUser, userLogin } = require("../controllers/controller");


// New user registration
router.post("/register", registerUser);

// User Login
router.post('/login', userLogin)

module.exports = router;

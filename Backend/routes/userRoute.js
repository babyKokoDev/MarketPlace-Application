const express = require("express");
const router = express.Router();
const { registerUser, userLogin, getCurrentUser } = require("../controllers/controller");
const authMiddleware = require("../middleware/authMiddleware");


// New user registration
router.post("/register", registerUser);

// User Login
router.post('/login', userLogin)

// Get Current User
router.get("/get-current-user", authMiddleware, getCurrentUser)

module.exports = router;

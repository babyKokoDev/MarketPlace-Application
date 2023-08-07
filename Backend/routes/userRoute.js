const express = require("express");
const router = express.Router();
const { registerUser, userLogin, getCurrentUser, getAllUsers, updateUser } = require("../controllers/controller");
const authMiddleware = require("../middleware/authMiddleware");


// New user registration
router.post("/register", registerUser);

// User Login
router.post('/login', userLogin)

// Get Current User
router.get("/get-current-user", authMiddleware, getCurrentUser)

// Get All Users
router.get("/get-users", authMiddleware, getAllUsers)

// Update user Role
router.put("/update-user-status/:id", authMiddleware, updateUser)

module.exports = router;

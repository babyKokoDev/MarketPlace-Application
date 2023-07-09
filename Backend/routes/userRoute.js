const express = require("express");
const router = express.Router();
const { registerUser, userLogin, getCurrentUser } = require("../controllers/controller");


// New user registration
router.post("/register", registerUser);

// User Login
router.post('/login', userLogin)

// Get Current User
router.get("/get-current-user", getCurrentUser)

module.exports = router;

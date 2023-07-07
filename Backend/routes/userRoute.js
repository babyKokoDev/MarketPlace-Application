const express = require('express');
const router = express.Router()
const users = require('../models/userModel')
const bcrypt = require('bcryptjs')

// New user registration
router.post('/register', async (req, res) => {
    try {
        const user = await users.findOne({ email: req.body.email})
        if (user) {
            throw new Error('User already exists')
        }
        
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      req.body.password = hashedPassword
        
    } catch (error) {
        res.send({
            success : false,
            message : error.message
        })
    }
})
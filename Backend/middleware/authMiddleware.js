const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
     try {
        //  Get token from header
         const token = req.header('authorization').split(' ')[1]
         const decryptToken = jwt.verify(token, process.env.JWT_SECRET)
         req.body.userId = decryptToken.userId
         next()
     } catch (error) {
        res.send({
            success : false,
            message: error.message
          })
     }
}
const { postNotification, getNotification, deleteNotification } = require('../controllers/notificationController')
const authMiddleware = require('../middleware/authMiddleware')
const router = require('express').Router()


router.post('/notify', authMiddleware, postNotification)

// get all Notification by user
router.get('/get-all-notifications', authMiddleware, getNotification)

// Delete Notification
router.delete('/delete-notification', authMiddleware, deleteNotification)

module.exports = router

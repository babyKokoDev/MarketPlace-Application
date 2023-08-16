const { postNotification, getNotification, deleteNotification, readAllNotifications } = require('../controllers/notificationController')
const authMiddleware = require('../middleware/authMiddleware')
const router = require('express').Router()


router.post('/notify', authMiddleware, postNotification)

// get all Notification by user
router.get('/get-all-notifications', authMiddleware, getNotification)

// Delete Notification
router.delete('/delete-notification/:id', authMiddleware, deleteNotification)

// Read all notifications
router.put('/read-all-notifications', authMiddleware, readAllNotifications)

module.exports = router

const router = require('express').Router()
const { addBids, getBids } = require('../controllers/bidsController')
const authMiddleware = require('../middleware/authMiddleware')

// Place a new Bid
router.post('/place-new-bid', authMiddleware, addBids)

// get all bids
router.post('/get-all-bids', authMiddleware, getBids)

module.exports = router

const Bids = require('../models/bidModel')

const addBids = async (req, res) => {
    try {
        const newBid = new Bids(req.body)
        await newBid.save()
        res.send({
            success: true,
            message : 'Bids added successfully'
        })
    } catch (error) {
        res.send({
            success: false,
            message : error.message
        })
    }
}

const getBids = async (req, res) => {
    try {
        const { product, seller } = req.body
        let filters = {}
        if (product) {
           filters.product = product
        }
        if (seller) {
            filters.seller = seller
        }
        const bids = await Bids.find(filters).populate('product').populate('buyer').populate('seller').sort({ createdAt: -1 }) 
        res.send({
            success: true,
            data : bids
        })
    } catch (error) {
        res.send({
            success: false,
            message : error.message
        })
    }
}

module.exports = {
    addBids,
    getBids
}
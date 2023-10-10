const mongoose = require('mongoose')

const houseSchema = new mongoose.Schema({
    price: Number,
    info: String,
    status: String,
    address: String,
    image: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('House', houseSchema)
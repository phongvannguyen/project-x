const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for product listing
let Product = new Schema({
    category: {
        type: String
    },
    productName: {
        type: String
    },
    price: {
        type: Number
    },
    description: {
        type: String
    },
    images: {
        type: Array
    },
    viewCount: {
        type: Number
    },
    userId: {
        type: String,
        required: true
    }
}, {
    collection: 'Products'
});

module.exports = mongoose.model('Product', Product);
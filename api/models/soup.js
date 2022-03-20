const mongoose = require('mongoose');

const soupSchema = mongoose.Schema({
    // Primary key
    id: { type: mongoose.Schema.Types.ObjectId, required: false }, // Primary key
    title: { type: String, required: true }, // Unique key
    description: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

module.exports = mongoose.model('Soup', soupSchema);
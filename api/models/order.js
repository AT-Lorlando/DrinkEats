const mongoose = require('mongoose');



const orderSchema = new mongoose.Schema({
    // Primary key
    id: { type: mongoose.Schema.Types.ObjectId, required: false }, // Primary key
    userId: { type: String, required: true }, // Foreign key
    // products: [{
    //     id: { type: String, required: true }, // Foreign key
    //     quantity: { type: Number, required: true },
    // }],
    products: [{
        soup: {
            type: mongoose.Schema.Types.ObjectId, // Foreign key
            ref: 'Soup'},
        quantity: { type: Number, required: true },
        _id: false}],
    total: { type: Number, required: true },
    status: { type: String, required: true },
    // createdAt: { type: Date, required: false },
    // updatedAt: { type: Date, required: false },
    address_number: { type: String, required: true },
    address_street: { type: String, required: true },
    address_city: { type: String, required: true },
    address_zip: { type: Number, required: true },
    phone: { type: Number, required: true },
}, {
    timestamps: true,
    });

module.exports = mongoose.model('Order', orderSchema);
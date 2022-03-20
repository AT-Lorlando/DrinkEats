const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: false }, // Primary key
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true }, // Unique key
  address_number: { type: String, required: true },
  address_street: { type: String, required: true },
  address_city: { type: String, required: true },
  address_zip: { type: Number, required: true },
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, required: false }, // Primary key
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  email: { type: String, required: true, unique: true }, // Unique key
  password: { type: String, required: true },
  address_number: { type: String, required: false },
  address_street: { type: String, required: false },
  address_city: { type: String, required: false },
  address_zip: { type: Number, required: false },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
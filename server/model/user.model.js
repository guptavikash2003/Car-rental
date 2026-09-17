// File: model/user.model.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  image: { type: String, default: "" },
  role: { type: String, enum: ['user', 'owner'], default: 'user' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = { User }; 
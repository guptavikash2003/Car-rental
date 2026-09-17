const mongoose = require('mongoose');

require('dotenv').config();
// process.env.MONGO_URI
const connection = mongoose.connect("mongodb+srv://yshubh140704:Shubham@cluster0.pa2oky0.mongodb.net/Carrental");

module.exports = {connection};
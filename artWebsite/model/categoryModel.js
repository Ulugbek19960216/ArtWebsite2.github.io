const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: String,
    description: String, 
    imageUrl: String
});

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;
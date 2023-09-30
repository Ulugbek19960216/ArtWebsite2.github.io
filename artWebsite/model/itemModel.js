const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name: String,
    price: String,
    description: String, 
    imageUrl: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: "category"}
});

const itemModel = mongoose.model('product', itemSchema);

module.exports = itemModel;
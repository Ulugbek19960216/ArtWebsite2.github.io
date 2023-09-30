// Import the Mongoose library for working with MongoDB
const mongoose = require("mongoose");

// Define the schema for the 'category' collection
const categorySchema = new mongoose.Schema({
    name: String, // Field for category name (String data type)
    description: String, // Field for category description (String data type)
    imageUrl: String // Field for category image URL (String data type)
});

// Create a Mongoose model based on the schema, specifying the collection name ('category')
const categoryModel = mongoose.model('category', categorySchema);

// Export the categoryModel for use in other parts of your application
module.exports = categoryModel;
// Import the Mongoose library
const mongoose = require("mongoose");

// Connect to the MongoDB database using the specified URL "ArtWebsite"
mongoose
  .connect("mongodb://127.0.0.1:27017/ArtWebsite")
  .then(() => {
    console.log('Mongoose connected successfully');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Define the schema for your collection
const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // 'name' is a required field
    },
    email: {
        type: String,
        required: true // 'email' is a required field
    },
    password: {
        type: String,
        required: true // 'password' is a required field
    },
    confirmPassword: {
        type: String,
        required: true // 'confirmPassword' is a required field
    }
});

// Create a Mongoose model based on the schema, and specify the collection name
const LogInCollection = mongoose.model('LogInCollection', logInSchema);

// Export the Mongoose model so that it can be used in other parts of your applications
module.exports = LogInCollection;
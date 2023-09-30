// Import required modules and middleware
const categoryModel = require("../model/categoryModel"); // Import the category model
const upload = require("../middleware/uploadImage"); // Import the file upload middleware

// Define the categoryController function that takes the Express app as an argument
const categoryController = function(app) {
    
    // Handle POST request for creating a new category
    app.post("/category", upload.single("image"), async (req, res) => {
        try {
            console.log("hello world"); // Log a message to the console
            const {name, description} = req.body; // Extract name and description from the request body
            const imageUrl = `uploads/${req.file.filename}`; // Create the image URL
            const category = new categoryModel({name: name, description: description, imageUrl: imageUrl}); // Create a new category instance
            await category.save(); // Save the category to the database
            res.status(201).json(category); // Respond with a JSON representation of the created category
        } catch (error) {
            console.log("error occurred: " + error); // Log an error message if an error occurs
        }
    });

    // Handle GET request for retrieving categories
    app.get("/category", async (req, res) => {
        const categoryData = await categoryModel.find(); // Retrieve category data from the database
        res.render("category", {categoryData}); // Render the 'category' view and pass the category data
    });
};

// Export the categoryController function for use in other parts of your application
module.exports = categoryController;
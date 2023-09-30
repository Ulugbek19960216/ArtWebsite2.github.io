// Import required modules and middleware
const itemModel = require("../model/itemModel"); // Import the item model
const uploadItems = require("../middleware/uploadItemsImage"); // Import the file upload middleware

// Define the itemController function that takes the Express app as an argument
const itemController = function(app) {
    
    // Handle POST request for creating a new item within a specified category
    app.post("/items/:categoryId", uploadItems.single("image"), async (req, res)=> {
        const categoryId = req.params.categoryId; // Extract the category ID from the URL parameter
        const {name, price, description} = req.body; // Extract name, price, and description from the request body
        
        try {
            // Create the image URL using the uploaded file's filename
            const imageUrl = `uploads/${req.file.filename}`;
            
            // Create a new item instance with the provided data
            const item = new itemModel({
                name: name, 
                price: price, 
                description: description, 
                imageUrl: imageUrl,
                category: categoryId // Associate the item with the specified category
            });

            // Save the item to the database
            await item.save();
            
            // Respond with a JSON representation of the created item
            res.status(201).json(item);
        } catch (error) {
            console.log("error occurred: " + error); // Log an error message if an error occurs
        }
    });

    // Handle GET request for retrieving items within a specified category
    app.get("/items/:categoryId", async (req, res)=> {
        try {
            const categoryId = req.params.categoryId; // Extract the category ID from the URL parameter
            
            // Retrieve items data from the database based on the specified category
            const itemsData = await itemModel.find({category: categoryId});
            
            // Render the 'galleryItems' view and pass the retrieved items data
            res.render("galleryItems", {itemsData});
        } catch (error) {
            console.log(error); // Log an error message if an error occurs
            res.status(500).json({error: "internal server error"}); // Respond with a 500 Internal Server Error
        }
    });
}

// Export the itemController function for use in other parts of your application
module.exports = itemController;
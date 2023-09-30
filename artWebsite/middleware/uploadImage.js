// Import required libraries and modules
const path = require("path"); // Path module for handling file paths
const multer = require("multer"); // Multer for handling file uploads

//! Use of Multer

// Configure Multer storage options
var storage = multer.diskStorage({
    destination: 'public/uploads', // Specify the destination directory for uploaded files
    filename: (req, file, callBack) => {
        // Generate a custom filename for the uploaded file
        callBack(null, file.fieldname + formatTimeStamp(Date.now()) + "_" + file.originalname);
    }
});

// Create a Multer upload instance with the specified storage options
var upload = multer({
    storage: storage
});

// Function to format a timestamp into a custom string format
function formatTimeStamp(timestamp) {
    var date = new Date(timestamp);
    return (
        date.getFullYear() +
        "_" + (date.getMonth() + 1) +
        "_" + date.getDate() +
        "_" + date.getHours() +
        "_" + date.getMinutes() +
        "_" + date.getSeconds()
    );
}

// Export the Multer upload instance for use in other parts of your application
module.exports = upload;
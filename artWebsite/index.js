// Import required libraries and modules
const express = require('express'); // Express.js framework
const path = require("path"); // Path module for handling file paths
const LogInCollection = require('./mongodb'); // MongoDB model
const ejs = require('ejs'); // EJS template engine

// Define the path to the views directory
const templatePath = path.join(__dirname, "./views");

// Define the port number on which the server will run
// port changed from 3000 to 4000
const port = 4000;

// Create an instance of the Express application
const app = express();

// Middleware setup
app.use(express.static('public')); // Serve static files from the 'public' directory
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded form data

// Import and set up controllers for categories and items
const categoryController = require("./controller/categoryController");
const itemController = require("./controller/itemController");

// View engine configuration
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', templatePath); // Define the views directory

// Define routes and their handlers
app.get('/', (req, res) => {
  // Render the 'home' view when accessing the root URL
  res.render('home');
});

categoryController(app); // Set up category-related routes and handlers
itemController(app); // Set up item-related routes and handlers

app.get('/login', (req, res) => {
  // Render the 'login' view when accessing '/login'
  res.render('login');
});

// Uncomment and implement login logic here if needed
// app.post('/login', async (req, res) => {
//   // Handle login logic
// });

app.get('/register', (req, res) => {
  // Render the 'register' view when accessing '/register'
  res.render('register');
});

app.post('/register', async (req, res) => {
  // Handle registration form submission
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  };

  try {
    // Insert user registration data into the 'LogInCollection' MongoDB collection
    await LogInCollection.insertMany([data]);
  } catch (error) {
    console.error('Error inserting documents:', error);
  }

  // Redirect to the home page after successful registration
  res.redirect('/');
});

// Start the Express server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
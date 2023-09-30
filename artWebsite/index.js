const express = require('express')
const  path  = require("path")
const LogInCollection  = require('./mongodb')
const ejs = require('ejs')

const templatePath = path.join(__dirname, "./views")

const port = 3000;
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



const categoryController = require("./controller/categoryController")
const itemController = require("./controller/itemController")
// Set EJS as the view engine
app.set('view engine', 'ejs')
app.set('views', templatePath) // Define the views directory

app.get('/', (req, res) => {
  res.render('home')
});


categoryController(app)
itemController(app)
app.get('/login', (req, res) => {
  res.render('login')
});

// app.post('/login', async (req, res) => {
//   // Handle login logic
// });

app.get('/register', (req, res) => {
  res.render('register');
});


app.post('/register', async (req, res) => {

  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword
  };
  
  
  try {
    await LogInCollection.insertMany([data]);
  } catch (error) {
    console.error('Error inserting documents:', error);
  }
  res.redirect('/'); // Redirect to the home page after registration
});



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
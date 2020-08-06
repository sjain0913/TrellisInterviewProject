const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const northRoute = require('../routes/north.js');
const southRoute = require('../routes/south.js');
const eastRoute = require('../routes/east.js');
const westRoute = require('../routes/west.js');
const data = require('./data.js');

// Create express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Enable use of individual routes for each sensor
app.use('/sensors/north', northRoute);
app.use('/sensors/south', southRoute);
app.use('/sensors/east', eastRoute);
app.use('/sensors/west', westRoute);

app.use(function(req, res, next) {
  // Allow CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Route for home
app.get("/", (req, res) => {
  res.json("This is the home page of the express server")
})

// Route for list of all sensors
app.get("/sensors", (req, res) => {
  // Return all sensors
  res.json(data);
});

// Establish server on port from .env file
const PORT = 9000;
app.listen(PORT);
console.log("Express listening on port " + PORT);

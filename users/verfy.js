// Load Dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Load configuration from .env file
require("dotenv").config();

// Load and initialize MesageBird SDK
var messagebird = require("messagebird")(process.env.MESSAGEBIRD_API_KEY);

// Set up and configure the Express framework
var app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Handle phone number submission
app.post("/step2", function (req, res) {
  //   var number = 970597192568;
  var number = parseInt(req.body.number);
  console.log(req.body);
  console.log(number);
  // Make request to Verify API
  messagebird.verify.create(
    number,
    {
      originator: "Code",
    },
    function (err, response) {
      if (err) {
        // Request has failed
        console.log(err);
        res.status(400).json({
          error: err.errors[0].description,
        });
      } else {
        // Request was successful
        console.log(response);
        res.status(200).json({
          id: response,
        });
      }
    }
  );
});

// Verify whether the token is correct
app.post("/step3", function (req, res) {
  var id = req.body.id;
  var token = req.body.token;

  // Make request to Verify API
  messagebird.verify.verify(id, token, function (err, response) {
    if (err) {
      // Verification has failed
      console.log(err);
      res.status(400).json({
        error: err.errors[0].description,
        id: id,
      });
    } else {
      // Verification was successful
      console.log(response);
      res.status(200).json(response);
    }
  });
});

// Start the application
app.listen(8080);

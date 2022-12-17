const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { handleError } = require("./middleware/handleError");
const userRoutes = require("./route/user");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use(express.json());

app.use("/", userRoutes);

app.use(handleError);

module.exports = app;

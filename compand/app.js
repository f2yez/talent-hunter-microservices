const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { handleError } = require("./middleware/handleError");
const typeOfBusinessRoutes = require("./route/typeOfBusiness");
const UsersAndJobsCronRoutes = require("./route/UsersAndJobsCron");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/typeOfBusiness", typeOfBusinessRoutes);

app.use("/cronJbos", UsersAndJobsCronRoutes);

app.use(handleError);

module.exports = app;

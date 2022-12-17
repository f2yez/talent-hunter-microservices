const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { handleError } = require("./middleware/handleError");
const companyRoutes = require("./route/company");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", companyRoutes);

app.use(handleError);

module.exports = app;

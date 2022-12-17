const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const { handleError } = require("./middleware/handleError");
const jobRoutes = require("./route/job");

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

//cronJob

// require("./helper/cronJob");

app.use("/", jobRoutes);

app.use(handleError);

module.exports = app;

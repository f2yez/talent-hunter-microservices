const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const { handleError } = require("./middleware/handleError");

const skillsRoutes = require("./route/skills");
const educationRoutes = require("./route/education");
const experinceRoutes = require("./route/experince");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", skillsRoutes);
app.use("/eduction", educationRoutes);
app.use("/experience", experinceRoutes);

app.use(handleError);

module.exports = app;

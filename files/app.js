const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const { handleError } = require("./middleware/handleError");
const fileRoutes = require("./route/flie");

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(cors());
// app.use(express.json());

app.use("/", fileRoutes);

app.use(handleError);

module.exports = app;

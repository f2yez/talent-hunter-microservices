const app = require("./app");
const PORT = process.env.PORT || 5008;

const server = app.listen(
  PORT,
  console.log(`Server Of Languages running on PORT ${PORT}...`)
);

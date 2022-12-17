const app = require("./app");
const PORT = process.env.PORT || 5006;

const server = app.listen(
  PORT,
  console.log(`Server Of Skills running on PORT ${PORT}...`)
);

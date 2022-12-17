const app = require("./app");
const PORT = process.env.PORT || 5007;

const server = app.listen(
  PORT,
  console.log(`Server Of Command running on PORT ${PORT}...`)
);

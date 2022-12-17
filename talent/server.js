const app = require("./app");
const PORT = process.env.PORT || 5003;

const server = app.listen(
  PORT,
  console.log(`Server Of Company running on PORT ${PORT}...`)
);

const app = require("./app");
const PORT = process.env.PORT || 5004;

const server = app.listen(
  PORT,
  console.log(`Server Files running on PORT ${PORT}...`)
);

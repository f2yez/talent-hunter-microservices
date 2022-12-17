const jwt = require("jsonwebtoken");

const generateToken = (id, type, exp = "30d") => {
  return jwt.sign({ id, type }, process.env.key, {
    expiresIn: exp,
  });
};

module.exports = generateToken;

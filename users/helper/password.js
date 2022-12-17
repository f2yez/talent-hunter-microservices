const bcrypt = require("bcrypt");

const hashPassword = (password) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const comparePassword = (password, hash) => {
  const exist = bcrypt.compareSync(password, hash);

  return exist;
};

module.exports = {
  hashPassword,
  comparePassword,
};

const fs = require("fs");
var FileReader = require("filereader");

const getBase64 = (type, path) => {
  const contents = `data:${type};base64,` + fs.readFileSync(path, "base64");
  return contents;
};

module.exports = {
  getBase64,
};

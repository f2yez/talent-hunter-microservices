const fs = require("fs");
const mime = require("mime");

const ConvertToFile = (req, res, next) => {
  const userId = req.userId.id;
  const img = req.body.name;

  try {
    var matches = img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    response = {};

    if (matches.length !== 3) {
      return new Error("Invalid input string");
    }

    response.type = matches[1];
    response.data = new Buffer.from(matches[2], "base64");
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.getExtension(type);
    let fileName = `${userId}_${Date.now()}file.${extension}`;
    fs.writeFileSync("./Files/" + fileName, imageBuffer, "utf8");

    const name = `./Files/${fileName}`;
    req.name = {
      name,
      type,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ConvertToFile,
};

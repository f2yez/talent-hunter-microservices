const jwt = require("jsonwebtoken");
const db = require("../models/index");

const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        if (!token) {
          res.status(400);
          throw new Error("Not authorized, no token");
        }

        //decodes token id
        const decoded = jwt.verify(token, process.env.key);

        req.userId = decoded;

        next();
      } catch (error) {
        res.status(401);
        error.message = "Not authorized, token failed";
        next(error);
      }
    }

    if (!token) {
      res.status(400);
      throw new Error("Not authorized, no token");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { protect };

var express = require("express");
const router = express.Router();

const {
  addType,
  getType,
  updateType,
} = require("../controller/typeOfBusiness.controller");

router.post("/", addType);

router.get("/:id", getType);

router.put("/:id", updateType);

module.exports = router;

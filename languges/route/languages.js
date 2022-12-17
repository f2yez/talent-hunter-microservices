var express = require("express");
const router = express.Router();
const {
  addLanguages,
  getLanguages,
  updateLanguages,
} = require("../controller/languages.controller");

//add
router.post("/", addLanguages);
//get by user id
router.get("/:id", getLanguages);
//put
router.put("/:id", updateLanguages);

module.exports = router;

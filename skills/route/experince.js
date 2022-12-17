var express = require("express");
const router = express.Router();

const {
  addExperience,
  getExperience,
  updateExperience,
  deleteExperience,
  getAExperience,
} = require("../controller/experice.controller");

const { protect } = require("../middleware/auth");

router.post("/", protect, addExperience);

//get eduction by users
router.get("/getExperience", protect, getExperience);
//get by id
router.get("/getExperience/:id", protect, getAExperience);

router.put("/:id", protect, updateExperience);

router.delete("/:id", protect, deleteExperience);

module.exports = router;

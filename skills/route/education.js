var express = require("express");
const router = express.Router();

const {
  getEduction,
  addEduction,
  updateEduction,
  deleteEduction,
  getAEductionById
} = require("../controller/eduction.controller");

const { protect } = require("../middleware/auth");

// router.get("/", getSkills);

router.post("/", protect, addEduction);

//get eduction by users
router.get("/getEduction", protect, getEduction);
// get by id
router.get("/getEduction/:id", protect, getAEductionById);
 
router.put("/:id", protect, updateEduction);

router.delete("/:id", protect, deleteEduction);

module.exports = router;

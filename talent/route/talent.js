var express = require("express");
const router = express.Router();

const {
  addTalent,
  getTalent,
  eideTalent,
  getTalentForJob,
} = require("../controller/talent.controller");

//addTalent
router.post("/", addTalent);
//getTalent
router.get("/:id", getTalent);
//eideTalent
router.put("/:id", eideTalent);
//getTalentForJob
router.get("/getTalentForJob/:id", getTalentForJob);

module.exports = router;

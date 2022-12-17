var express = require("express");
const router = express.Router();

const {
  getSkills,
  addSkills,
  getASkills,
  updateSkills,
  deleteSkills,
  getASkillsByParentId,
  getSkillsJob,
} = require("../controller/skills.controller");

router.get("/", getSkills);

router.post("/", addSkills);

router.get("/:id", getASkills);

router.get("/parent/:id", getASkillsByParentId);

router.get("/getSkillsJob/:id", getSkillsJob);

router.put("/:id", updateSkills);

router.delete("/:id", deleteSkills);

module.exports = router;

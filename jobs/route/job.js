var express = require("express");
const router = express.Router();

const {
  addJob,
  getAJob,
  getJob,
  updateJob,
  deleteJob,
  getAJobByComapny,
  getAJobByComapnyDraft,
  makeRelase,
  compare,
  getJobForAll,
} = require("../controller/job.controller");

const { protect } = require("../middleware/auth");

//add job
router.post("/", protect, addJob);
//get a jpb
router.get("/:id", getAJob);
//get getAJobDraft
router.get("/getAJobByComapnyDraft/:id", protect, getAJobByComapnyDraft);
//get getAJobByComapny
router.get("/getAJobByComapny/:id", protect, getAJobByComapny);
// makeRelase
router.put("/makeRelase/:id", makeRelase);
// get jobs
router.get("/", getJob);
//get JobForAll
router.get("/all/getJobForAll", getJobForAll);
// update
router.put("/:id", updateJob);
// delete
router.delete("/:id", deleteJob);
//compare
router.get("/compare/job", compare);

module.exports = router;

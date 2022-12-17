var express = require("express");
const router = express.Router();

const {
  addPlan,
  getAPlan,
  getPlans,
  EditPlan,
  deletePlan,
} = require("../controller/plan.controller");

//add a plan
router.post("/", addPlan);
//get a plan
router.get("/:id", getAPlan);
//get plans
router.get("/", getPlans);
//put plan
router.put("/:id", EditPlan);
//delete plan
router.delete("/:id", deletePlan);

module.exports = router;

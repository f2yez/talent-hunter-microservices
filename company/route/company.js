var express = require("express");
const router = express.Router();

const {
  addCompany,
  getCompany,
  eideCompany,
  addCompanyee,
  getACompany,
} = require("../controller/company.controller");
const { protect } = require("../middleware/auth");

//addCompany
router.post("/", addCompany);
//addCompanyee
router.get("/", addCompanyee);
//getCompany
router.get("/:id", getCompany);
//getACompany
router.get("/getACompany/:id", protect, getACompany);
//eideCompany
router.put("/:id", eideCompany);

module.exports = router;

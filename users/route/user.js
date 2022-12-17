var express = require("express");
const router = express.Router();
const {
  Register,
  login,
  emailVerified,
  sendForForgot,
  githubCallback,
  newPassword,
  githubSuccess,
  updata,
  getAUser,
  updataImg,
  getAllUsersForJobs,
  updateJob,
  getAllJobsByadmin,
  getAUserBYCompanyId,
  getEmailForACompny,
} = require("../controller/user.controller");
const { protect } = require("../middleware/auth");

//Register
router.post("/", Register);
//login
router.post("/login", login);
//emailVerified
router.get("/verified/:id", emailVerified);
//getAUser
router.get("/getAUser", protect, getAUser);
//getAUserBYCompanyId
router.get("/getAUserBYCompanyId/:id", protect, getAUserBYCompanyId);
//forgotEmail
router.post("/sendLink", sendForForgot);
//make new password
router.post("/newPassword", newPassword);
//github
router.get("/github/callback", githubCallback);
//githubSuccess
router.get("/success", githubSuccess);
//update
router.put("/update", protect, updata);
//updataImg
router.put("/updataImg", updataImg);
// make update for job by admin
router.get("/updateJob/:id", protect, updateJob);
//getAllJobsByadmin
router.get("/getAllJobsByadmin", protect, getAllJobsByadmin);
//getAllUsersForJobs
router.get("/getAllUsersForJobs", getAllUsersForJobs);
//getEmailForACompny
router.get("/getEmailForACompny/:id", getEmailForACompny);
module.exports = router;

var express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const {
  getAFile,
  getFiles,
  addFile,
  EditFile,
  deleteFile,
  addImageProfile,
} = require("../controller/file.controller");
const { ConvertToFile } = require("../middleware/base64toFile");

// get a file
// router.get("/:id", protect, getAFile);
router.get("/:id", getAFile);
//get all files
router.get("/", protect, getFiles);
//add file
router.post("/", protect, ConvertToFile, addFile);
//add img profile
router.post("/profile", protect, ConvertToFile, addImageProfile);
//put
router.put("/:id", protect, ConvertToFile, EditFile);
//delete
router.delete("/:id", protect, deleteFile);

module.exports = router;

var express = require("express");
const router = express.Router();

const { cronJbos, makeGroubing } = require("../controller/UsersAndJobsCron");

//cronJbos
router.get("/", cronJbos);
//makeGroubing
router.get("/makeGroubing", makeGroubing);

module.exports = router;

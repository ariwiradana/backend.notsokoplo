const express = require("express");
const router = express.Router();
const { getHello } = require("../controller/hello.controller");

router.route("/").get(getHello);
module.exports = router;

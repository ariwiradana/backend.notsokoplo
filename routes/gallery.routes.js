const express = require("express");
const router = express.Router();
const { getGallery, setGallery } = require("../controller/gallery.controller");

router.route("/").get(getGallery).post(setGallery);
module.exports = router;

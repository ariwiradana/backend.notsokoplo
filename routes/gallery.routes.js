const express = require("express");
const router = express.Router();
const {
  getGallery,
  setGallery,
  updateGallery,
} = require("../controller/gallery.controller");

router.route("/").get(getGallery).post(setGallery).put(updateGallery);
module.exports = router;

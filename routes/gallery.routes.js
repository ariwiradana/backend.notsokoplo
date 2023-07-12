const express = require("express");
const router = express.Router();
const {
  getGallery,
  getGalleryPath,
  setGallery,
  updateGallery,
} = require("../controller/gallery.controller");

router.route("/").get(getGallery).post(setGallery)
router.route("/:path").get(getGalleryPath).put(updateGallery);
module.exports = router;

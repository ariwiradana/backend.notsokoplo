const express = require("express");
const router = express.Router();
const {
  getGallery,
  getGalleryPath,
  setGallery,
  updateGallery,
  deleteGallery,
  setGalleryMulti,
  setGalleryThumbnail,
  getGalleryThumbnail,
} = require("../controller/gallery.controller");

router.route("/").get(getGallery).post(setGallery);
router.route("/multi").post(setGalleryMulti);
router.route("/thumbnail").get(getGalleryThumbnail).post(setGalleryThumbnail);
router
  .route("/:path")
  .get(getGalleryPath)
  .put(updateGallery)
  .delete(deleteGallery);
module.exports = router;

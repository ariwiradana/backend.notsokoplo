const express = require("express");
const router = express.Router();
const {
  getGallery,
  getGalleryPath,
  setGallery,
  updateGallery,
  deleteGallery,
  setGalleryMulti,
} = require("../controller/gallery.controller");

router.route("/").get(getGallery).post(setGallery);
router.route("/multi").post(setGalleryMulti);
router
  .route("/:path")
  .get(getGalleryPath)
  .put(updateGallery)
  .delete(deleteGallery);
module.exports = router;

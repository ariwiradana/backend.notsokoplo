const express = require("express");
const router = express.Router();
const {
  getSlideshow,
  deleteSlideshow,
  setSlideshow,
  updateSlideshow,
} = require("../controller/slideshow.controller");

router.route("/").get(getSlideshow).post(setSlideshow);
router.route("/:_id").put(updateSlideshow).delete(deleteSlideshow);
module.exports = router;

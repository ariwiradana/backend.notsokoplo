const express = require("express");
const router = express.Router();
const {
  getGigs,
  deleteGigs,
  setGigs,
  updateGigs,
} = require("../controller/gigs.controller");

router.route("/").get(getGigs).post(setGigs);
router.route("/:_id").put(updateGigs).delete(deleteGigs);
module.exports = router;

const mongoose = require("mongoose");

const SlideshowSchema = mongoose.Schema({
  image: String,
  slug: String,
});

module.exports = mongoose.model("slideshow", SlideshowSchema);

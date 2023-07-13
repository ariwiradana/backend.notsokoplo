const mongoose = require("mongoose");

const SlideshowSchema = mongoose.Schema({
  image: String,
});

module.exports = mongoose.model("slideshow", SlideshowSchema);

const mongoose = require("mongoose");

const GallerySchema = mongoose.Schema({
  path: String,
  src: String,
  alt: String,
  date: String,
  title: String,
});

module.exports = mongoose.model("gallery", GallerySchema);

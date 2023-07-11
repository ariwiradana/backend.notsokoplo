const mongoose = require("mongoose");

const GallerySchema = mongoose.Schema({
  path: String,
  src: Object,
  alt: String,
  date: Date,
  title: String,
});

module.exports = mongoose.model("gallery", GallerySchema);

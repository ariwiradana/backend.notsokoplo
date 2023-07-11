const mongoose = require("mongoose");

const GallerySchema = mongoose.Schema({
  path: String,
  thumbnail: Object,
  alt: String,
  date: Date,
  title: String,
  images: Array,
});

module.exports = mongoose.model("gallery", GallerySchema);

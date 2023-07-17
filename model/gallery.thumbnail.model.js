const mongoose = require("mongoose");

const GalleryThumbnailSchema = mongoose.Schema({
  path: String,
  image: String,
  alt: String,
  date: Date,
  title: String,
});

module.exports = mongoose.model("thumbnail", GalleryThumbnailSchema);

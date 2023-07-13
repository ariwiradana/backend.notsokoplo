const mongoose = require("mongoose");

const GigsSchema = mongoose.Schema({
  event: String,
  place: String,
  date: Date,
});

module.exports = mongoose.model("gigs", GigsSchema);

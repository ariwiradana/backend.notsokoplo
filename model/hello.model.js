const mongoose = require("mongoose");

const HelloSchema = mongoose.Schema({
  message: String,
});

module.exports = mongoose.model("hello", HelloSchema);

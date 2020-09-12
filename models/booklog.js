const mongoose = require("mongoose");

const booklogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Booklog", booklogSchema);

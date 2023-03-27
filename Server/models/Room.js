const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  roomDescription: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);

const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    enum: ["deluxe", "normal"],
    required: true,
  },
  roomPrice: {
    type: Number,
    required: true,
  },
});

// Set the default values for roomType and roomPrice
roomSchema.pre("save", function (next) {
  if (this.roomType === "deluxe") {
    this.roomPrice = 1200;
  } else if (this.roomType === "normal") {
    this.roomPrice = 800;
  }
  next();
});

module.exports = mongoose.model("Room", roomSchema);

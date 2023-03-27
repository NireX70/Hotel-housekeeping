const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  numberofPeople: {
    type: Number,
    required: true,
  },
  roomNumber: {
    type: mongoose.Types.ObjectId,
    ref: "Room",
  },
  amountDeposit: {
    type: Number,
    required: true,
  },
  checkInDate: {
    type: String,
    required: true,
  },
  checkOutDate: {
    type: String,
    required: false,
  },
  enteredBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("GuestRegister", guestSchema);

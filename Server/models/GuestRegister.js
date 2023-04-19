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
  roomId: {
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
  account: [
    {
      type: mongoose.Types.ObjectId,
      ref: "GuestBill",
    },
  ],
});

module.exports = mongoose.model("GuestRegister", guestSchema);

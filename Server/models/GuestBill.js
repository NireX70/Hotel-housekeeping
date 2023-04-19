const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const guestbillSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  item: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("GuestBill", guestbillSchema);

const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  staffname: {
    type: String,
    required: true,
  },
  staffphone: {
    type: String,
    required: true,
  },
  staffaddress: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Staff", staffSchema);

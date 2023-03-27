const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDescription: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: mongoose.Types.ObjectId,
    ref: "Staff",
  },

});

module.exports = mongoose.model("Task", taskSchema);

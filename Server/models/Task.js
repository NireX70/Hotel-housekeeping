const mongoose = require("mongoose");
const roomController = require("../controllers/room");

const taskSchema = new mongoose.Schema({
  taskDescription: {
    type: String,
    required: true,
  },
  roomNumber: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);

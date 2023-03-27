const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
<<<<<<< HEAD
  fullname: {
    type: String,
    required: true,
  },
=======
>>>>>>> d1feed47d57c0682c15c403ccfe9f44a917c9c2e
});
module.exports = mongoose.model("User", UserSchema);

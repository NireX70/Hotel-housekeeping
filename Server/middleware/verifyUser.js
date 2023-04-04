const User = require("../models/User");

const verifyUser = async (req, res, next) => {
  try {
    const { email } = req.method == "GET" ? req.query : req.body;
    //check the user extencees
    let exist = await User.findOne({ email: email });
    if (!exist) return res.status(400).send({ error: "User not found" });
    next();
  } catch (err) {
    return res.status(404).send({ error: "Authenction user" });
  }
};
module.exports = verifyUser;

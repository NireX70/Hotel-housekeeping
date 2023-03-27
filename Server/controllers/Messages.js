const CustomerMessage = require("../models/CustomerMessage");

const sendMessage = async (req, res) => {
  const message = req.body.message;
  const sendMessage = await CustomerMessage.create({ message });
  res.status(200).json({ sendMessage });
};

const viewMessage = async (req, res) => {
  const allMessages = await CustomerMessage.find();
  if (!allMessages) {
    return res.status(404).json({ msg: "No messages found" });
  }
  return res.status(200).json({ allMessages });
};
module.exports = { sendMessage, viewMessage };

const GuestRegister = require("../models/GuestRegister");

exports.guestRegister = async (req, res, next) => {
  const {
    name,
    address,
    phone,
    email,
    numberofPeople,
    roomNumber,
    amountDeposit,
    checkInDate,
  } = req.body;

  const newGuest = new GuestRegister({
    name,
    address,
    phone,
    email,
    numberofPeople,
    roomNumber,
    amountDeposit,
    checkInDate,
  });
  try {
    await newGuest.save();
    return res.status(201).json({ message: "Guest registered successfully" });
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
};

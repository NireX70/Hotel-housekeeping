const GuestRegister = require("../models/GuestRegister");
const Room = require("../models/Room");
const Bill = require("../models/GuestBill");

const GuestBill = require("../models/GuestBill");

// const Notification = require("../models/Notification");

//function for registration of the guest
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

  try {
    const roomId = await Room.findOne({ roomNumber: roomNumber }, "_id");
    console.log(roomId);
    const newGuest = new GuestRegister({
      name,
      address,
      phone,
      email,
      numberofPeople,
      roomId: roomId._id,
      amountDeposit,
      checkInDate,
      account: [],
    });

    await newGuest.save();

    return res.status(201).json({ message: "Guest registered successfully" });
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
};

exports.enterGuestBill = async (req, res) => {
  try {
    const guest = await GuestRegister.findOne({
      phone: req.body.phone,
      checkOutDate: { $in: ["", null] },
    });
    console.log("|Guest", guest);
    console.log(req.body.quantity);

    const bill = new Bill({
      date: Date.now(),
      item: req.body.item,
      quantity: req.body.quantity,
      price: req.body.price,
      total: +req.body.quantity * +req.body.price,
    });
    console.log(bill);
    await bill.save();

    let guestAccount = guest.account;
    console.log(guestAccount);
    guestAccount.push(bill);
    let newGuestAccount = guestAccount;

    console.log(newGuestAccount);
    guest.account = newGuestAccount;
    const updatedGuest = await GuestRegister.findOneAndUpdate(
      { phone: guest.phone, checkOutDate: { $in: ["", null] } },
      { account: newGuestAccount },
      { new: true }
    );
    console.log(updatedGuest);
    res.status(200).json({ message: "Bill saved successfully" });
  } catch (err) {
    console.log(err);
  }
};

exports.getGuestInfo = async (req, res) => {
  try {
    const guests = await GuestRegister.find({}).select(
      "name email roomId phone"
    );
    res.status(200).json(guests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllGuests = async (req, res) => {
  try {
    const guests = await GuestRegister.find();
    const count = guests.length; // Count the number of documents retrieved
    res.status(200).json({ count, guests }); // Send the count and the documents in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.allGuest = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const guests = await GuestRegister.find(keyword).find({
    _id: { $ne: req.guests._id },
  });
  res.send(guests);
};

// const doc = new PDFDocument();
// const stream = doc.pipe(blobStream());

// // Add content to the PDF document
// doc.fontSize(16).text("Bill Details");

// // Generate the PDF and create a buffer
// doc.end();
// stream.on("finish", function () {
//   const buffer = stream.toBuffer();
//   res.setHeader("Content-Type", "application/pdf");
//   res.setHeader("Content-Disposition", "attachment; filename=bill.pdf");
//   res.setHeader("Content-Length", buffer.length);
//   res.status(200).send(buffer);
// });

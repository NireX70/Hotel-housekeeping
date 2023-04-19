const GuestRegister = require("../models/GuestRegister.js");
const Room = require("../models/Room");
const mongoose = require("mongoose");
const Task = require("../models/Task");

exports.roomDetails = async (req, res, next) => {
  const rooms = await Room.find({});
  const currentGuests = await GuestRegister.find({
    checkOutDate: { $in: ["", null] },
  }).populate([
    {
      path: "roomId",
    },
    { path: "account" },
  ]);
  console.log("currentGuests", currentGuests);
  const usedRooms = currentGuests.map((guests) => guests.roomId._id.toString());
  console.log("usedRooms", usedRooms);
  const roomDetails = rooms.map((room) => {
    console.log(room._id);
    if (usedRooms.includes(room._id.toString())) {
      const guest = currentGuests.filter((guest) => {
        console.log("guest inside this room", guest);
        return guest.roomId._id.toString() === room._id.toString();
      });
      return { guest: guest[0], room };
    } else {
      return { room };
    }
  });

  console.log(roomDetails);

  return res.status(200).json({ details: roomDetails });
};

exports.latestGuestsInfo = async (req, res, next) => {
  const currentGuests = await GuestRegister.find({
    checkOutDate: { $in: ["", null] },
  }).populate([
    {
      path: "roomId",
    },
  ]);

  return res.status(200).json({ details: currentGuests });
};

exports.latestCheckout = async (req, res, next) => {
  const currentCheckout = await GuestRegister.find({
    checkOutDate: {
      $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      $lte: new Date(),
    },
  }).count();
  console.log(currentCheckout);

  return res.status(200).json(currentCheckout);
};

exports.roomCheckout = async (req, res, next) => {
  const id = req.params.id;
  console.log("guestId", id);
  try {
    const guests = await GuestRegister.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      {
        checkOutDate: Date.now(),
      },
      { new: true }
    );
    return res.status(200).json(guests);
  } catch (err) {
    console.log(err);
  }
};

exports.postTask = async (req, res) => {
  try {
    const roomNumber = req.query.room;
    const newTask = new Task({
      roomNumber: roomNumber,
      taskDescription: "Clean Room",
    });

    await newTask.save();
    console.log("newwwwwwwwwww", newTask);
    return res.status(201).json({ message: "Task Made" });
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const tasks = await Task.find({});

    return res.status(201).json({ tasks });
  } catch (err) {
    return res.status(422).json({ error: err.message });
  }
};
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    return res.status(204).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};

// exports.populateRoom = async (req, res, next) => {
//   let rooms = [];

//   // loop to create 8 rooms with different room numbers and types
//   for (let i = 0; i < 8; i++) {
//     let roomType, roomPrice;

//     // set roomType and roomPrice based on the value of i
//     if (i % 2 === 0) {
//       roomType = "deluxe";
//       roomPrice = 1200;
//     } else {
//       roomType = "normal";
//       roomPrice = 800;
//     }

//     // create a new room with the given roomNumber, roomType, and roomPrice
//     const room = new Room({
//       roomNumber: `20${i}`,
//       roomType,
//       roomPrice,
//     });

//     // save the room to the database
//     await room.save();

//     // add the saved room to the rooms array
//     rooms.push(room);
//   }

//   return res.status(200).json({ rooms });
// };

// const filterConfig = filterBy
// ? filterBy === "Squad"
//   ? { userId: { $in: squadUsers } }
//   : { updatedAt: { $gte: new Date(startDate), $lte: new Date(endDate) } }
// : {};

// const room = await Room.find(filterConfig).populate({
//   path: "userId",
//   select: `-password`,
// });

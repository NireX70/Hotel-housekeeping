// const chats = require("../models/chats");
const { chatsInfo } = require("../utils/data");
const asyncHandler = require("express-async-handler");

const User = require("../models/User");
const Chat = require("../models/chats");

exports.accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  

  var isChat = await Chat.find({
    isGroupChat: false,

    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name  email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.userId, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      console.log(createdChat);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

exports.fetchCharts = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.userId } } })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ upadateAt: -1 })
      .then(async (result) => {
        results = await User.populate(result, {
          path: "latestMessage",
          select: "name email",
        });
      });
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

exports.getChats = async (req, res) => {
  res.send(chatsInfo);
};
exports.singleChat = async (req, res) => {
  const singleChat = chatsInfo.find((c) => c._id === req.params.id);
  res.send(singleChat);
  console.log(req.params.id);
};

// const sendMessage = async (req, res) => {
//   const message = req.body.message;
//   const sendMessage = await CustomerMessage.create({ message });
//   res.status(200).json({ sendMessage });
// };

// const viewMessage = async (req, res) => {
//   const allMessages = await CustomerMessage.find();
//   if (!allMessages) {
//     return res.status(404).json({ msg: "No messages found" });
//   }
//   return res.status(200).json({ allMessages });
// };

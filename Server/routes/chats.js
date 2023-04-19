const express = require("express");
const router = express.Router();

const chatsController = require("../controllers/chatsController.js");
const reqSignIn = require("../middleware/auth.js");

router.post("/chat",reqSignIn, chatsController.accessChat);
router.get("/chat", chatsController.fetchCharts);

router.get("/chats", chatsController.getChats);
router.get("/chats/:id", chatsController.singleChat);

module.exports = router;

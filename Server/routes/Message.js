const express = require("express");
const router = express.Router();

const MessageController = require("../controllers/Messages.js");

router.post("/sendMessage", MessageController.sendMessage);
router.get("/viewMessage", MessageController.viewMessage);

module.exports = router;

const express = require("express");
const router = express.Router();

const staffController = require("../controllers/staff");

router.post("/guest-register", staffController.guestRegister);

module.exports = router;

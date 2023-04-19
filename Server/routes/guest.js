const express = require("express");
const router = express.Router();

const staffController = require("../controllers/guest");

//fot the guest registration
router.post("/guest-register", staffController.guestRegister);

//routes fot the bill entry of respective guest
router.post("/guest/bill/entry", staffController.enterGuestBill);

module.exports = router;

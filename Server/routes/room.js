const express = require("express");
const router = express.Router();
const roomController = require("../controllers/room");
const staffController = require("../controllers/guest");

router.get("/roomDetails", roomController.roomDetails);

router.get("/latestcheckout", roomController.latestCheckout);
router.get("/latestguests", roomController.latestGuestsInfo);

router.patch("/roomCheckout/:id", roomController.roomCheckout);

//routes fot posting the routes
router.post("/task", roomController.postTask);

//routes fot getting all the task
router.get("/task", roomController.getTask);

//endpoint for deleting the specified task
router.delete("/task/:id", roomController.deleteTask);

//enpoint for getting roomNumber

router.get("/roomDetails?roomNumber", roomController.roomDetails);

// router.get("/populateRoom", roomController.populateRoom);
router.get("/registered-guest", staffController.getGuestInfo);

router.get("/registered-guest", staffController.getGuestInfo);
router.get("/guests", staffController.getAllGuests);

// router.get('/roomNumber', roomController.getroomNumber);

module.exports = router;

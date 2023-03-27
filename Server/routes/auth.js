const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

router.post("/signup", authController.signup);

router.post("/login", authController.login);
<<<<<<< HEAD
router.post("/logout", authController.postLogout);
=======

>>>>>>> d1feed47d57c0682c15c403ccfe9f44a917c9c2e
module.exports = router;

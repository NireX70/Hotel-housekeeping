const reqSignIn = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const verifyUser = require("../middleware/verifyUser");

router.post("/signup", authController.signup);

router.post("/login", verifyUser, authController.login);

//protected routes auth
router.get("/user-auth", reqSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

router.post("/logout", authController.postLogout);

module.exports = router;

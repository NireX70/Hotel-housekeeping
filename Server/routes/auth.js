const reqSignIn = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const middlewareController = require("../middleware/verifyUser");

//endpoint fot register the user
router.post("/signup", authController.signup);
router.post("/signupguest", authController.guestsignup);

//routes for login the user

router.post("/login", middlewareController.verifyUser, authController.login);

//routes for login the guest
router.post(
  "/loginguest",
  middlewareController.verifyGuestUser,
  authController.loginguest
);

//protected routes auth
router.get("/user-auth", reqSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

//routes for login
router.post("/logout", authController.postLogout);

module.exports = router;

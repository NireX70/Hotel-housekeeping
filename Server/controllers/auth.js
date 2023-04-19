const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const GuestUser = require("../models/guestuser");

//for signup

exports.signup = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const fullname = req.body.fullname;

    //validation-
    if (!fullname) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Name is required" });
    }
    if (!password) {
      return res.send({ error: "Name is required" });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(406).json({
        message: "The email is already registered. Please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email: email,
      password: hashedPassword,
      fullname: fullname,
    });
    const createdUser = await user.save();

    res.status(200).json({
      user: { email: createdUser.email, _id: createdUser.id },
    });
    console.log("created user");
  } catch (error) {
    res.send(error);
  }
};
//for login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ errors: "user not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(404).json({ errors: "Invalid password" });
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      process.env.JWT_SECRET
      // { expiresIn: "24h" }
    );
    return res
      .status(200)
      .json({ token: token, id: user.id, email: user.email });
  } catch (error) {
    console.error(error);
  }
};

// for Guest Signup
exports.guestsignup = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const fullname = req.body.fullname;

    //validation-
    if (!fullname) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "password is required" });
    }
    const emailExists = await GuestUser.findOne({ email });
    if (emailExists) {
      return res.status(406).json({
        message: "The email is already registered. Please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const guestuser = new GuestUser({
      email: email,
      password: hashedPassword,
      fullname: fullname,
    });
    const createdGuestUser = await GuestUser.save();

    res.status(200).json({
      guestuser: { email: createdGuestUser.email, _id: createdUser.id },
    });
    console.log("created Guest User");
  } catch (error) {
    res.send(error);
  }
};

//for login
exports.loginguest = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const guestuser = await GuestUser.findOne({ email: email });
    console.log(guestuser);
    if (!guestuser) {
      return res.status(404).json({ errors: "user not found" });
    }
    const passwordMatch = await bcrypt.compare(password, guestuser.password);

    if (!passwordMatch) {
      return res.status(404).json({ errors: "Invalid password" });
    }
    const token = jwt.sign(
      {
        email: guestuser.email,
        userId: guestuser._id,
      },
      process.env.JWT_SECRET
      // { expiresIn: "24h" }
    );
    return res
      .status(200)
      .json({ token: token, id: guestuser.id, email: guestuser.email });
  } catch (error) {
    console.error(error);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });
};

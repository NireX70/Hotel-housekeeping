const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//for signup
exports.signup = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const fullname = req.body.fullname;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(406).json({
        message: "The email is already registered. Please login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
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
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  console.log(user);
  if (!user) {
    return res.status(422).json({ errors: "user not found" });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (passwordMatch) {
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      "somesupersecretsecret",
      { expiresIn: "1h" }
    );
    return res.status(200).json({ token: token, id: user.id });
  } else {
    return res.status(422).json({ errors: "Incorrect password" });
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });
};

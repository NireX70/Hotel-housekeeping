const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const User = require("../models/User");
// Protecting routes on the basis of token
const reqSignIn = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(400).json({
        error: "400 Bad Request",
        message: "The server could not understand the request",
      });
    }
    const token = authHeader.split(" ")[1];

    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user; // Adding decoded user object to request

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid token " });
  }
};

module.exports = reqSignIn;

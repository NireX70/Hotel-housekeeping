require("dotenv").config();
process.on("uncaughtException", (error) => {
  console.error(error);
});
const cors = require("cors");
const express = require("express");
<<<<<<< HEAD
const ErrorHandler = require("./utils/ErrorHandler");
const app = express();
const authRoute = require("./routes/auth");
const staffRoute = require("./routes/staff");
const cookieParse = require("cookie-parser");
const bodyParser = require("body-parser");
=======
const app = express();
const authRoute = require("./routes/auth");
const staffRoute = require("./routes/staff");

>>>>>>> d1feed47d57c0682c15c403ccfe9f44a917c9c2e
const connectDB = require("./database/connect.js");
const messageRouter = require("./routes/Message");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
<<<<<<< HEAD
app.use(cookieParse());
app.use(bodyParser.urlencoded({ extended: true }));
=======
>>>>>>> d1feed47d57c0682c15c403ccfe9f44a917c9c2e

app.use(authRoute);
app.use(staffRoute);

app.use("/api/sendMessage", messageRouter);

const port = process.env.PORT || 5000;
<<<<<<< HEAD
//for error handling
app.use(ErrorHandler);
=======
>>>>>>> d1feed47d57c0682c15c403ccfe9f44a917c9c2e

//creating a function to start the connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server started. Listening on port ${port} ...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

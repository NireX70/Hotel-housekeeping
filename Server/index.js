require("dotenv").config();
process.on("uncaughtException", (error) => {
  console.error(error);
});
const cors = require("cors");
const express = require("express");
// const ErrorHandler = require("./utils/ErrorHandler");
const app = express();
const authRoute = require("./routes/auth");
const staffRoute = require("./routes/guest");
const roomRoute = require("./routes/room");
const chatsRoute = require("./routes/chats");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./database/connect.js");
const http = require("http");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.use(authRoute);
app.use(staffRoute);
app.use(roomRoute);
app.use(chatsRoute);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;
// app.use(ErrorHandler);

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

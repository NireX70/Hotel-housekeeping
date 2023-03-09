require("dotenv").config();
process.on("uncaughtException", (error) => {
  console.error(error);
});
const cors = require("cors");
const express = require("express");
const app = express();
const authRoute = require("./routes/auth");
const staffRoute = require("./routes/staff");

const connectDB = require("./database/connect.js");
const messageRouter = require("./routes/Message");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use(authRoute);
app.use(staffRoute);

app.use("/api/sendMessage", messageRouter);

const port = process.env.PORT || 5000;

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

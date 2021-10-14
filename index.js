const express = require("express");
const mongoose = require("mongoose");

const app = express();

const authRouter = require("./src/Router/Authentication");
const hardwarePostRouter = require("./src/Router/Hardware/postRouters");
const userPostRouter = require("./src/Router/User/postRouters");
const userGetRouter = require("./src/Router/User/getRouter");
const userPutRouter = require("./src/Router/User/putRouter");
const userDeleteRouter = require("./src/Router/User/deleteRouter");

app.use("/auth", authRouter);
app.use("/hardware", hardwarePostRouter);
app.use("/user/post", userPostRouter);
app.use("/user/get", userGetRouter);
app.use("/user/put", userPutRouter);
app.use("/user/delete", userDeleteRouter);

//parse application/json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const HOSTNAME = "192.168.1.3";
const PORT = 3000;
const dbURL = "mongodb://localhost:27017/greenUp";

app.get("/", (req, res) => {
  res.send("Index.js");
});

async function start() {
  try {
    await mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    app.listen(PORT, HOSTNAME, () => {
      console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
    });
  } catch (err) {
    console.log(err);
  }
}
start();

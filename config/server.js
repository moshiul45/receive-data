// External Import
require("dotenv").config();
const cors = require("cors");
const logger = require("morgan");
const express = require("express");

// Internal Import
const config = require("./config");
const errorMiddleware = require("../src/middlewares/errorMiddleware");
const { saveBase64File } = require("../src/helper");

const app = express();
const env = process.env.NODE_ENV || "development";

// Middleware
app.use(logger("dev"));
app.use(cors(config[env].corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));



//Receiver API
app.post("/upload", (req, res) => {
  try {
    const serverIP = req.headers["x-forwarded-for"] || req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.socket.remoteAddress;
    saveBase64File(req?.body, serverIP)
    res.end()
  } catch (error) {
    console.log(error)
    res.end()
  }

});


app.use((req, res, next) => {
  return res.status(404).send({ status: false, message: "This route does not exist" });
});

app.use(errorMiddleware); // Error Handling Middleware

module.exports = app;

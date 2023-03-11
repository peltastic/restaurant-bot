const config = require("./config");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
dotenv.config()

function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connetion Successfull");
    })
    .catch((err) => {
    console.log(process.env.MONGO_URI)
      console.log(err.message);
    });
}

module.exports = connectDB

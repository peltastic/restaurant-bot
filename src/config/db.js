const config = require("./config");
const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB Connetion Successfull");
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = connectDB

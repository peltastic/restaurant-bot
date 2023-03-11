const express = require("express");
const path = require("path");
const socket = require("socket.io");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const messageRoutes = require("./routes/messages.routes");
const orderRoutes = require("./routes/orders.routes")
const getResponse = require("./utils/response")


dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.disable("etag");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(function (err, req, res, next) {
  console.log(err);
  res
    .status(err.status || 500)
    .send({ message: err.message, stack: err.stack });
});

connectDB();

app.get("/", (req, res) => {
  return res.render("loading");
});

app.use(messageRoutes);
app.use("/order", orderRoutes)

app.use("*", (req, res) => {
  return res.render("404");
});

const server = app.listen(PORT, () => {
  console.log(`app listening at port ${PORT}`);
});

const io = socket(server);


io.on("connection", (socket) => {
  global.socket = socket
  console.log("user connected");
  socket.on("send message", (msg) => {
    const response = getResponse(msg)
    socket.emit("bot response", response)
  });
});

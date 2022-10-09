const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();
const io = require("socket.io")(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`${socket.id} user connected`);

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} user disconnected`);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("listening on port " + process.env.PORT || 3000);
});

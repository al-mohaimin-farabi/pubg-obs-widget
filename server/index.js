require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { handleLeaderboardConnection } = require("./namespaces/leaderboard");
const { NAMESPACES } = require("./utils/constants");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH"],
  },
});

// Middleware for logging connections
io.use((socket, next) => {
  console.log(`Socket connecting: ${socket.id}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Set up namespaces
const leaderboardNamespace = io.of(NAMESPACES.LEADERBOARD);
leaderboardNamespace.on("connection", handleLeaderboardConnection);

// // Legacy root namespace (for backward compatibility, can be removed later)
// io.on("connection", (socket) => {
//   console.log("Legacy connection to root namespace");
//   handleLeaderboardConnection(socket);
// });

const PORT = process.env.PORT || 5000;
if (!global.serverStarted) {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  global.serverStarted = true;
}

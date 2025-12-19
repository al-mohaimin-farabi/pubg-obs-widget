const leaderboardService = require("../services/leaderboardService");
const configService = require("../services/configService");
const { EVENTS } = require("../utils/constants");

function handleLeaderboardConnection(socket) {
  console.log(`User connected to leaderboard namespace: ${socket.id}`);

  // Send initial data
  const data = leaderboardService.getLeaderboardData();
  if (data) {
    socket.emit(EVENTS.LEADERBOARD.UPDATE, data);
  }

  const config = configService.getConfig();
  if (config) {
    socket.emit(EVENTS.CONFIG.UPDATE, config);
  }

  // Handle client requests for leaderboard data
  socket.on(EVENTS.LEADERBOARD.REQUEST, () => {
    const data = leaderboardService.getLeaderboardData();
    if (data) {
      socket.emit(EVENTS.LEADERBOARD.UPDATE, data);
    }
  });

  // Handle client requests for config
  socket.on(EVENTS.CONFIG.REQUEST, () => {
    const config = configService.getConfig();
    socket.emit(EVENTS.CONFIG.UPDATE, config);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected from leaderboard namespace: ${socket.id}`);
  });

  // Listen for leaderboard updates
  socket.on(EVENTS.LEADERBOARD.UPDATE, (data) => {
    socket.broadcast.emit(EVENTS.LEADERBOARD.UPDATE, data);
  });

  // Listen for Config updates
  socket.on(EVENTS.CONFIG.UPDATE, (newConfig) => {
    const updated = configService.updateConfig(newConfig);
    // Broadcast to EVERYONE including sender (to confirm sync)
    // socket.broadcast.emit(EVENTS.CONFIG.UPDATE, updated);
    // Actually, usually we want to emit to the namespace.
    socket.nsp.emit(EVENTS.CONFIG.UPDATE, updated);
  });
}

module.exports = { handleLeaderboardConnection };

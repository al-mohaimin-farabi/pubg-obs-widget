const leaderboardService = require("../services/leaderboardService");
const { EVENTS } = require("../utils/constants");

function handleLeaderboardConnection(socket) {
  console.log(`User connected to leaderboard namespace: ${socket.id}`);

  // Send initial leaderboard data
  const data = leaderboardService.getLeaderboardData();
  if (data) {
    socket.emit(EVENTS.LEADERBOARD.UPDATE, data);
  }

  // Handle client requests for leaderboard data
  socket.on(EVENTS.LEADERBOARD.REQUEST, () => {
    const data = leaderboardService.getLeaderboardData();
    if (data) {
      socket.emit(EVENTS.LEADERBOARD.UPDATE, data);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected from leaderboard namespace: ${socket.id}`);
  });

  // Listen for leaderboard updates (from admin/other sources)
  socket.on(EVENTS.LEADERBOARD.UPDATE, (data) => {
    // In a real app, validate and update data
    // For now, broadcast to all in namespace
    socket.broadcast.emit(EVENTS.LEADERBOARD.UPDATE, data);
  });
}

module.exports = { handleLeaderboardConnection };

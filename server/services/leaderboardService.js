const fs = require("fs");
const path = require("path");

let leaderboardData = null;

function loadData() {
  try {
    const jsonFilePath = path.join(
      __dirname,
      "../after-match-score-group.json"
    );
    const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
    leaderboardData = JSON.parse(jsonData);
  } catch (error) {
    console.error("Error loading leaderboard data:", error);
    leaderboardData = null;
  }
}

function getLeaderboardData() {
  return leaderboardData;
}

function reloadData() {
  loadData();
}

// Initialize data on module load
loadData();

module.exports = { getLeaderboardData, reloadData };

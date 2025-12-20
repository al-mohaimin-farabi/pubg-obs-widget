let currentConfig = {
  matchNumber: 85,
  skin: "default",
  tournamentName: "Grand Finals",
  dayNumber: 3,
  matchNumberTotal: 18,
  title: "Overall Rankings",
};

function getConfig() {
  return currentConfig;
}

function updateConfig(newConfig) {
  currentConfig = { ...currentConfig, ...newConfig };
  return currentConfig;
}

module.exports = {
  getConfig,
  updateConfig,
};

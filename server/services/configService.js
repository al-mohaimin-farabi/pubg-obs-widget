let currentConfig = {
  matchNumber: 85,
  skin: "default", // or filename
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

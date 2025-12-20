let currentConfig = {
  matchNumber: 85,
  skin: "default",
  tournamentName: "Grand Finals Day 3 M13 /18",
  title: "Overall Rankings",
  // Styling
  headerBg: "#FAD48A",
  headerText: "#4D64D1",
  headerIsGradient: false,
  headerGradient: "linear-gradient(to right, #FAD48A, #F87171)",
  titleText: "#FFFFFF",
  titleIsGradient: true,
  titleGradient:
    "linear-gradient(to bottom, hsl(43 94% 72%) 0%, hsl(43 94% 72%) 5%, hsl(4 86% 66%) 100%)",
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

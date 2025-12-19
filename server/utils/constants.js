// Event constants for standardized communication
const EVENTS = {
  LEADERBOARD: {
    UPDATE: "leaderboard:update",
    REQUEST: "leaderboard:request",
    ERROR: "leaderboard:error",
  },
  CONFIG: {
    UPDATE: "config:update",
    REQUEST: "config:request",
  },
};

// Namespace constants
const NAMESPACES = {
  LEADERBOARD: "/leaderboard",
};

module.exports = { EVENTS, NAMESPACES };

// Event constants for client-server communication
export const EVENTS = {
  LEADERBOARD: {
    UPDATE: "leaderboard:update",
    REQUEST: "leaderboard:request",
    ERROR: "leaderboard:error",
  },
} as const;

// Namespace constants
export const NAMESPACES = {
  LEADERBOARD: "/leaderboard",
} as const;

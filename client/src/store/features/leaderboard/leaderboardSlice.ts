import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* =======================
   Types
======================= */

export interface TeamPlayer {
  id: number;
  in_game_name: string;
  image: string;
}

export interface Team {
  team_id: number;
  team_name: string;
  team_logo: string;
  team_clan_tag: string;
  team_color: string;
  points: number;
  kills: number;
  total_points: number;
  placement_point: number;
  position: number;
  games_played: number;
  chicken_dinner: boolean;
  games_won: number;
  players: TeamPlayer[];
}

export interface LeaderboardState {
  teams: Team[];
}

/* =======================
   Initial State (with data)
======================= */

const initialState: LeaderboardState = {
  teams: [],
};

/* =======================
   Slice
======================= */

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    setTeams: (state, action: PayloadAction<Team[]>) => {
      state.teams = action.payload;
    },
  },
});

export const { setTeams } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;

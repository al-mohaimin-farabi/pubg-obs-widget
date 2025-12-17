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
  loading: boolean;
  error: string | null;
}

/* =======================
   Initial State (with data)
======================= */

const initialState: LeaderboardState = {
  teams: [
    {
      team_id: 30743,
      team_name: "HORBOYS ESPORTS",
      team_logo: "https://tournalink.com/storage/82435/20251211_201931.png",
      team_clan_tag: "HORBOYS",
      team_color: "rgb(196, 7, 43)",
      points: 147,
      kills: 89,
      total_points: 147,
      placement_point: 58,
      position: 1,
      games_played: 12,
      chicken_dinner: false,
      games_won: 3,
      players: [
        {
          id: 279831,
          in_game_name: "TENSKYBLUE",
          image: "https://tournalink.com/storage/82476/20251211_175957.png",
        },
        {
          id: 279832,
          in_game_name: "HAZELOO",
          image: "https://tournalink.com/storage/82478/20251211_180055.png",
        },
        {
          id: 279834,
          in_game_name: "LELEBOY",
          image: "https://tournalink.com/storage/82477/20251211_180021.png",
        },
        {
          id: 279833,
          in_game_name: "LENN",
          image: "https://tournalink.com/storage/82475/20251211_175931.png",
        },
      ],
    },
    {
      team_id: 30744,
      team_name: "KING BEAR",
      team_logo: "https://tournalink.com/storage/82434/20251211_202000.png",
      team_clan_tag: "KB",
      team_color: "rgb(221, 219, 214)",
      points: 114,
      kills: 71,
      total_points: 114,
      placement_point: 43,
      position: 2,
      games_played: 12,
      chicken_dinner: false,
      games_won: 3,
      players: [],
    },
    {
      team_id: 27589,
      team_name: "FRATERNITY ESPORTS",
      team_logo: "https://tournalink.com/storage/69390/003.png",
      team_clan_tag: "FTR",
      team_color: "rgb(43, 27, 26)",
      points: 114,
      kills: 63,
      total_points: 114,
      placement_point: 51,
      position: 3,
      games_played: 12,
      chicken_dinner: false,
      games_won: 2,
      players: [],
    },
    {
      team_id: 30745,
      team_name: "MANUFUTU",
      team_logo: "https://tournalink.com/storage/82433/20251211_202139.png",
      team_clan_tag: "MANUFUTU",
      team_color: "rgb(40, 33, 35)",
      points: 99,
      kills: 75,
      total_points: 99,
      placement_point: 24,
      position: 4,
      games_played: 12,
      chicken_dinner: false,
      games_won: 1,
      players: [],
    },
  ],
  loading: false,
  error: null,
};

/* =======================
   Slice
======================= */

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    updateTeam: (
      state,
      action: PayloadAction<{
        team_id: number;
        updates: Partial<Team>;
      }>
    ) => {
      const { team_id, updates } = action.payload;
      const team = state.teams.find((t) => t.team_id === team_id);
      if (team) {
        Object.assign(team, updates);
      }
    },
  },
});

export const { updateTeam } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;

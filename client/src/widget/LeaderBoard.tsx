import Heading from "../components/Heading";
import LeaderBoardTable from "../components/LeaderboardTable";
import { useSocket } from "../hooks/useSocket";
import { useAppDispatch } from "../hooks/redux";
import { setTeams } from "../store/features/leaderboard/leaderboardSlice";
import type { Team } from "../store/features/leaderboard/leaderboardSlice";
import { NAMESPACES } from "../utils/constants";
import { useEffect } from "react";

const LeaderBoard = () => {
  const dispatch = useAppDispatch();

  const data = useSocket({
    namespace: NAMESPACES.LEADERBOARD,
  });

  useEffect(() => {
    if (data && typeof data === "object" && "data" in data) {
      const leaderboardData = data as { data: { teams: Team[] } };
      if (leaderboardData.data?.teams) {
        dispatch(setTeams(leaderboardData.data.teams));
      }
    }
  }, [data, dispatch]);

  return (
    <div className="font-oswald h-svh w-full space-y-4 overflow-hidden">
      <div className="flex h-full items-end justify-items-end gap-6 p-4 pl-16">
        <LeaderBoardTable className="" />
        <div className="flex h-full w-full items-end justify-end">
          <Heading />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;

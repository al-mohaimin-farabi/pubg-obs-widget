// import Heading from "../components/Heading";
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
    <div className="font-oswald w-full h-100 overflow-hidden space-y-4">
      {/* <Heading /> */}
      <LeaderBoardTable />
    </div>
  );
};

export default LeaderBoard;

import { useAppSelector } from "../hooks/redux";
import { cn } from "../lib/utils";
import { Separator } from "./ui/separator";

const LeaderBoardTable = () => {
  const leaderboard = useAppSelector((state) => state.leaderboard.teams);

  return (
    <div className="font-oswald fixed bottom-4 left-16 w-196.25 overflow-hidden">
      <div className="leaderboard-grid relative grid w-full gap-1 font-semibold">
        {/* Header Row */}
        <div className="grid grid-cols-[60px_56px_20px_1fr_80px_60px_80px_60px] gap-1 bg-linear-to-r from-widget-muted from-30% to-widget-accent py-1 text-nowrap text-widget-secondary">
          <div className="grid place-content-center px-2 py-1 text-center text-sm">
            RANK
          </div>
          <div className=""></div>
          <div className=""></div>
          <div className="grid items-center px-2 py-1 text-left text-sm">
            TEAM
          </div>
          <div className="grid place-content-center px-2 py-1 text-center text-sm">
            PLACE PTS
          </div>
          <div className="grid place-content-center px-2 py-1 text-center text-sm">
            ELIMS
          </div>
          <div className="grid place-content-center px-2 py-1 text-center text-sm">
            TOTAL PTS
          </div>
          <div className="grid place-content-center px-2 py-1 text-center text-sm">
            <img
              src="/chicken.png"
              className="mx-auto max-h-16 w-full max-w-16 overflow-hidden"
              alt=""
            />
          </div>
        </div>

        {/* Data Rows */}
        {leaderboard.map((team, index) => (
          <div
            key={team.team_id}
            className={cn(
              "grid max-h-11.5 grid-cols-[60px_56px_20px_1fr_80px_60px_80px_60px] gap-1 bg-linear-to-r from-widget-accent from-60% to-widget-muted/80 text-white",
              // Add spacing between rows manually, except for the last row
              index < leaderboard.length - 1 ? "" : ""
            )}
          >
            <div className="flex items-center justify-center overflow-hidden bg-widget-muted py-3 text-center text-nowrap">
              <span className="text-lg font-bold">#{team.position}</span>
            </div>
            <div className="grid place-content-center overflow-hidden px-2 py-1">
              <img src="/bd-flag.webp" className="w-14" alt="" />
            </div>
            <div className="flex items-center justify-center overflow-hidden py-1">
              <Separator
                className="w-1 rounded bg-white"
                orientation="vertical"
              />
            </div>
            <div className="flex items-center overflow-hidden px-2 py-1 text-sm">
              <div className="flex items-center gap-2">
                <img
                  className="h-12 w-12 object-cover"
                  src={`${team?.team_logo}`}
                />
                <span className="shrink-0 text-lg uppercase">
                  {team.team_name}
                </span>
              </div>
            </div>
            <div className="grid place-content-center overflow-hidden px-2 py-1 text-center text-base">
              {team.placement_point || 0}
            </div>
            <div className="grid place-content-center overflow-hidden px-2 py-1 text-center text-base">
              {team.kills || 0}
            </div>
            <div className="grid place-content-center overflow-hidden px-2 py-1 text-center text-base">
              {team.total_points || 0}
            </div>
            <div className="grid place-content-center overflow-hidden px-2 py-1 text-center text-base">
              {team.games_won || 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoardTable;

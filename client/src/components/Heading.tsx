import { useAppSelector } from "@/hooks/redux";
import { GradientText } from "./GradientText";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

const Heading = () => {
  const leaderboard = useAppSelector((state) => state.leaderboard.teams);
  const firstTeam = leaderboard[0];

  return (
    <div className="relative w-full uppercase">
      <div className="relative w-full">
        <div className="relative flex w-full justify-center">
          {firstTeam?.players.map((p, i) => (
            <img
              key={p.id}
              src={p.image}
              alt={p.in_game_name}
              className={`h-[calc(100vh-400px)] ${i !== 0 ? "-ml-52" : ""} relative`}
              style={{
                zIndex: 10 + i,
              }}
            />
          ))}
          <div className="absolute bottom-0 z-100">
            <div className={cn("flex items-center")}>
              <p className="text-9xl font-extrabold">#{firstTeam?.position}</p>

              <img src="/bd-flag.webp" className="ml-6 w-26" alt="" />

              <Separator
                className="mx-4 rounded bg-widget-accent data-[orientation=vertical]:h-30 data-[orientation=vertical]:w-1"
                orientation="vertical"
              />

              <div className="flex items-center gap-2">
                <img
                  className="h-26 w-26 object-cover"
                  src={`${firstTeam?.team_logo}`}
                />
                <span className="shrink-0 text-7xl font-extrabold text-widget-accent uppercase">
                  {firstTeam?.team_clan_tag}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto w-max pb-16">
        <div className="mt-1 flex justify-end font-semibold">
          <div className="flex items-center bg-widget-secondary p-1 px-2 font-normal text-widget-muted">
            Grand Finals Day 3 M13 /18
          </div>
        </div>
        <GradientText
          from="widget-secondary"
          to="widget-primary"
          direction="vertical"
          className="text-6xl font-bold"
        >
          Overall Rankings
        </GradientText>
      </div>
    </div>
  );
};

export default Heading;

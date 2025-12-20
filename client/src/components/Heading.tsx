import { useAppSelector } from "@/hooks/redux";
import { GradientText } from "./GradientText";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

interface Config {
  matchNumber: number;
  skin: string;
  tournamentName?: string;
  dayNumber?: number;
  matchNumberTotal?: number;
  title?: string;
}

const Heading = ({ config }: { config?: Config }) => {
  const leaderboard = useAppSelector((state) => state.leaderboard.teams);
  const firstTeam = leaderboard[0];

  return (
    <div className="relative w-full uppercase">
      <div className="relative w-full">
        <div className="relative flex w-full justify-center">
          {firstTeam?.players.map((p, i) => {
            const isLast = i === 3;

            return (
              <img
                key={p.id}
                src={p.image}
                alt={p.in_game_name}
                className={`h-[calc(100vh-400px)] ${i !== 0 ? "-ml-52" : ""} relative`}
                style={{
                  zIndex: isLast ? 10 : 10 + i,
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 80%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, black 80%, transparent 100%)",
                }}
              />
            );
          })}
          <div className="absolute bottom-0 z-100 w-full">
            <div className={cn("mx-auto flex w-max items-center")}>
              <p className="text-9xl font-extrabold text-widget-secondary">
                #{firstTeam?.position}
              </p>

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
            {config?.tournamentName || "Grand Finals"} Day{" "}
            {config?.dayNumber || 1} M{config?.matchNumber || 1} /
            {config?.matchNumberTotal || 18}
          </div>
        </div>
        <GradientText
          from="widget-secondary"
          to="widget-primary"
          direction="vertical"
          className="text-6xl font-bold"
        >
          {config?.title || "Overall Rankings"}
        </GradientText>
      </div>
    </div>
  );
};

export default Heading;

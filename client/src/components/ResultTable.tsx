import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";
import { cn } from "../lib/utils";
import { Separator } from "./ui/separator";

const ResultTable = ({
  className,
  skin = "/skin.png",
}: {
  className?: string;
  skin?: string;
}) => {
  const leaderboard = useAppSelector((state) => state.leaderboard.teams);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    // Wait for data and skin
    const imageUrls = leaderboard.map((team) => team.team_logo).filter(Boolean);
    const staticImages = ["/chicken.png", "/bd-flag.webp", skin];
    const allImages = [...imageUrls, ...staticImages];

    const promises = allImages.map((src) => {
      if (!src) return Promise.resolve();
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src as string;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(promises).then(() => {
      setImagesLoaded(true);
    });
  }, [leaderboard, skin]);

  if (!imagesLoaded && leaderboard.length > 0) return null;

  return (
    <div
      className={cn(
        "font-oswald relative max-w-196.25 min-w-196.25 overflow-hidden",
        className
      )}
    >
      <div className="leaderboard-grid relative z-10 grid w-full gap-1 font-semibold">
        {/* Header Row */}

        <div className="relative z-10 grid grid-cols-[60px_1fr_80px_60px_80px_60px] gap-1 text-nowrap text-widget-secondary">
          <div className="grid h-7 place-content-center overflow-hidden px-2 text-center text-sm">
            RANK
          </div>
          <div className="grid h-7 items-center overflow-hidden px-2 text-left text-sm">
            TEAM
          </div>
          <div className="grid h-7 place-content-center overflow-hidden px-2 text-center text-sm">
            PLACE PTS
          </div>
          <div className="grid h-7 place-content-center overflow-hidden px-2 text-center text-sm">
            ELIMS
          </div>
          <div className="grid h-7 place-content-center overflow-hidden px-2 text-center text-sm">
            TOTAL PTS
          </div>
          <div className="grid h-7 place-content-center overflow-hidden px-2 text-center text-sm">
            <img
              src="/chicken.png"
              className="mx-auto w-full overflow-hidden"
              alt=""
            />
          </div>
        </div>

        {leaderboard.map((team, index) => (
          <div
            key={team.team_id}
            className={cn(
              "relative z-10 grid max-h-11.5 grid-cols-[60px_56px_20px_1fr_80px_60px_80px_60px] gap-1 text-white",
              index < leaderboard.length - 1 ? "" : "",
              `bg-[${team.team_color || "#000000"}] bg-opacity-80`
            )}
          >
            <div className="flex h-11.5 max-h-11.5 items-center justify-center overflow-hidden">
              <span className="text-lg font-bold">#{team.position}</span>
            </div>
            <div className="grid h-11.5 max-h-11.5 place-content-center overflow-hidden px-2">
              <img src="/bd-flag.webp" className="w-14" alt="" />
            </div>
            <div className="flex h-11.5 max-h-11.5 items-center justify-center overflow-hidden">
              <Separator
                className="rounded bg-white data-[orientation=vertical]:h-[80%] data-[orientation=vertical]:w-0.5"
                orientation="vertical"
              />
            </div>
            <div className="flex h-11.5 max-h-11.5 items-center overflow-hidden px-2 text-center text-lg">
              <div className="flex items-center gap-2">
                <img
                  className="h-10 w-10 object-cover"
                  src={`${team?.team_logo}`}
                />
                <span className="shrink-0 uppercase">{team.team_name}</span>
              </div>
            </div>
            <div className="grid h-11.5 max-h-11.5 place-content-center overflow-hidden px-2 text-center text-base">
              {team.placement_point || 0}
            </div>
            <div className="grid h-11.5 max-h-11.5 place-content-center overflow-hidden px-2 text-center text-base">
              {team.kills || 0}
            </div>
            <div className="grid h-11.5 max-h-11.5 place-content-center overflow-hidden px-2 text-center text-base">
              {team.total_points || 0}
            </div>
            <div className="grid h-11.5 max-h-11.5 place-content-center overflow-hidden px-2 text-center text-base">
              {team.games_won || 0}
            </div>
          </div>
        ))}
        <img
          src={skin}
          className="absolute inset-0 h-full w-full object-cover"
          alt=""
        />
      </div>
    </div>
  );
};

export default ResultTable;

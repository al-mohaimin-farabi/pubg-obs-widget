import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetMatchEndResultQuery } from "@/services/MatchEndResultApi";

interface MatchResult {
  playerName?: string;
  score?: number;
  teamName?: string;
}

const DashboardLeaderboard = () => {
  // For now, skip the query since we don't have a match number
  const { data, error, isLoading } = useGetMatchEndResultQuery(
    { matchNumber: 1 }, // Default match number for demo
    { skip: true } // Skip for now until we implement match selection
  );

  if (isLoading) {
    return (
      <main className="flex-1 space-y-6 p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">Loading leaderboard data...</div>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 space-y-6 p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">
              Error loading leaderboard data
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <Button variant="outline">Refresh Data</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Match Results</CardTitle>
        </CardHeader>
        <CardContent>
          {data ? (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 font-semibold">
                <div>Rank</div>
                <div>Player</div>
                <div>Score</div>
                <div>Team</div>
              </div>
              {data.map((result: MatchResult, index: number) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 border-t py-2"
                >
                  <div>{index + 1}</div>
                  <div>{result.playerName || "Unknown"}</div>
                  <div>{result.score || 0}</div>
                  <div>{result.teamName || "Unknown"}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No data available. Please load a match first.
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default DashboardLeaderboard;

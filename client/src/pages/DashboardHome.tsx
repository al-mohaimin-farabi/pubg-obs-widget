import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DashboardHome = () => {
  const [matchNumber, setMatchNumber] = useState("");

  return (
    <main className="flex-1 space-y-6 p-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Match Number Input */}
        <Card>
          <CardHeader>
            <CardTitle>Match Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="match-number"
                  className="mb-2 block text-sm font-medium"
                >
                  Match Number
                </label>
                <Input
                  id="match-number"
                  type="number"
                  placeholder="Enter match number"
                  value={matchNumber}
                  onChange={(e) => setMatchNumber(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button className="w-full">Load Match Data</Button>
            </div>
          </CardContent>
        </Card>

        {/* Widget Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Widget Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Leaderboard Widget</span>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Real-time Updates</span>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DashboardHome;

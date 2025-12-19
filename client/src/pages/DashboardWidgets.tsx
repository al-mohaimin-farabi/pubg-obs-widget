import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  LayoutDashboard,
  Copy,
  ExternalLink,
  Check,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Widget {
  id: string;
  name: string;
  description: string;
  url: string;
  thumbnail: string;
}

const widgets: Widget[] = [
  {
    id: "leaderboard",
    name: "Match End Leaderboard",
    description: "Display final standings after match completion",
    url: "/matchresult",
    thumbnail: "leaderboard",
  },
];

import PageHeader from "@/components/layouts/PageHeader";

// ... existing imports

export default function DashboardWidgets() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const copyToClipboard = (url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <div className="h-full overflow-auto bg-gray-50 dark:bg-gray-950">
      <PageHeader
        title="Widgets"
        description="Configure and manage your OBS stream widgets"
      />

      {/* Content */}
      <div className="p-8">
        {/* Widget Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {widgets.map((widget) => (
            <Card key={widget.id} className="transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-32 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-indigo-700">
                  <LayoutDashboard className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-lg text-gray-900 dark:text-white">
                  {widget.name}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {widget.description}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* URL Input */}
                  <div className="relative">
                    <Input
                      readOnly
                      value={`${window.location.origin}${widget.url}`}
                      className="pr-20 text-xs"
                    />
                    <button
                      onClick={() => copyToClipboard(widget.url)}
                      className="absolute top-1/2 right-1 flex -translate-y-1/2 items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      {copiedUrl === widget.url ? (
                        <>
                          <Check className="h-3 w-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.open(widget.url, "_blank")}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Preview
                    </button>
                    <Link
                      to={
                        widget.id === "leaderboard"
                          ? "/dashboard/configs/leaderboard"
                          : "#"
                      }
                      className="flex-1"
                    >
                      <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
                        <Settings className="h-4 w-4" />
                        Configure
                      </button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* OBS Setup Guide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">
              OBS Setup Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  1
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Add Browser Source
                  </p>
                  <p>
                    In OBS, click the + button in Sources and select "Browser"
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  2
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Copy Widget URL
                  </p>
                  <p>
                    Copy the widget URL from above and paste it into the URL
                    field
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  3
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Set Dimensions
                  </p>
                  <p>
                    Set width to 1920 and height to 1080 (or your stream
                    resolution)
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  4
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    Position & Scale
                  </p>
                  <p>
                    Position the widget on your stream layout and you're done!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

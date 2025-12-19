import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Maximize2, RefreshCw } from "lucide-react";

import PageHeader from "@/components/layouts/PageHeader";

export default function DashboardPreview() {
  const [selectedWidget, setSelectedWidget] = useState("/matchresult");
  const [key, setKey] = useState(0);

  const widgets = [{ name: "Match End Leaderboard", url: "/matchresult" }];

  const refreshPreview = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="h-full overflow-auto bg-gray-50 dark:bg-gray-950">
      <PageHeader
        title="Widget Preview"
        description="Preview how your widgets will appear in OBS"
      />

      {/* Content */}
      <div className="p-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Widget Selector */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                Select Widget
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {widgets.map((widget) => (
                  <button
                    key={widget.url}
                    onClick={() => setSelectedWidget(widget.url)}
                    className={`w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                      selectedWidget === widget.url
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400"
                        : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                    }`}
                  >
                    {widget.name}
                  </button>
                ))}
              </div>

              {/* Controls */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={refreshPreview}
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </button>
                <button
                  onClick={() => window.open(selectedWidget, "_blank")}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  <Maximize2 className="h-4 w-4" />
                  Full Screen
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Area */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-gray-900 dark:text-white">
                  Preview
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Monitor className="h-4 w-4" />
                  <span>1920 × 1080</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-100 dark:border-gray-700 dark:bg-gray-900">
                <div className="aspect-video">
                  <iframe
                    key={key}
                    src={selectedWidget}
                    className="h-full w-full"
                    title="Widget Preview"
                  />
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                This is how your widget will appear in OBS. Use the controls on
                the left to switch between different widgets or refresh the
                preview.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

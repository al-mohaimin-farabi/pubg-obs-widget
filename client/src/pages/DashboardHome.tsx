import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { LayoutDashboard, ExternalLink } from "lucide-react";
import PageHeader from "@/components/layouts/PageHeader";

export default function DashboardOverview() {
  return (
    <div className="h-full overflow-auto bg-gray-50 dark:bg-gray-950">
      <PageHeader
        title="Widget Management"
        description="Central control panel for your stream widgets"
      />

      {/* Content */}
      <div className="p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Quick Links */}
          <Link to="/dashboard/widgets" className="block">
            <Card className="h-full transition-shadow hover:border-indigo-500/50 hover:shadow-lg">
              <CardHeader>
                <LayoutDashboard className="mb-2 h-8 w-8 text-indigo-600" />
                <CardTitle className="text-gray-900 dark:text-white">
                  Manage Widgets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configure widget URLs, copy links for OBS, and view setup
                  guides.
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/dashboard/preview" className="block">
            <Card className="h-full transition-shadow hover:border-indigo-500/50 hover:shadow-lg">
              <CardHeader>
                <ExternalLink className="mb-2 h-8 w-8 text-indigo-600" />
                <CardTitle className="text-gray-900 dark:text-white">
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Test and preview your widgets in real-time before going live.
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

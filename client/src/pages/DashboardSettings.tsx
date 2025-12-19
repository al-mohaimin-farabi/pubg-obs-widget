import PageHeader from "@/components/layouts/PageHeader";

export default function DashboardSettings() {
  return (
    <div className="h-full overflow-auto bg-gray-50 dark:bg-gray-950">
      <PageHeader title="Settings" description="Application settings" />
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center p-8">
        <p className="text-gray-500 dark:text-gray-400">
          Settings coming soon...
        </p>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex h-16 items-center justify-between border-b border-gray-200 bg-white px-8 dark:border-gray-800 dark:bg-black",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        {description && (
          <>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </>
        )}
      </div>
      {children}
    </div>
  );
}

import { memo } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  className?: string;
}

// Memoize the StatCard component to prevent re-renders if props don't change
export const StatCard = memo(function StatCard({
  title,
  value,
  className,
}: StatCardProps) {
  return (
    <div className={cn("bg-white h-[155px] rounded-[15px] flex items-center px-5 shadow-[0px_4px_10px_0px_#0000001A]", className)}>
      <div>
        <h3 className={`text-sm font-medium  mb-6 ${className}`}>{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
});

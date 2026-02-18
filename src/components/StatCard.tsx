import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down";
  className?: string;
}

const StatCard = ({ icon: Icon, label, value, change, trend, className }: StatCardProps) => {
  return (
    <div className={cn("glass rounded-xl p-5", className)}>
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {change && (
          <span
            className={cn(
              "text-xs font-medium",
              trend === "up" ? "text-success" : "text-destructive"
            )}
          >
            {change}
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default StatCard;

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

const GlassCard = ({ children, className, glow }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "glass rounded-xl p-6",
        glow && "animate-pulse-glow",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;

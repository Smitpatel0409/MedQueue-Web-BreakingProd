import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Priority = "High" | "Medium" | "Low";

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export const PriorityBadge = ({ priority, className }: PriorityBadgeProps) => {
  const variants = {
    High: "bg-priority-high text-priority-high-foreground",
    Medium: "bg-priority-medium text-priority-medium-foreground",
    Low: "bg-priority-low text-priority-low-foreground",
  };

  return (
    <Badge className={cn(variants[priority], "font-medium", className)}>
      {priority}
    </Badge>
  );
};

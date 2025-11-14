import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "WAITING" | "PLEASE PROCEED" | "COMPLETED" | "NOW BEING SEEN" | "SKIPPED";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const variants = {
    "WAITING": "bg-status-waiting text-white",
    "PLEASE PROCEED": "bg-status-proceed text-white animate-pulse",
    "COMPLETED": "bg-status-completed text-white",
    "NOW BEING SEEN": "bg-primary text-primary-foreground",
    "SKIPPED": "bg-muted text-muted-foreground",
  };

  return (
    <Badge className={cn(variants[status], "font-medium", className)}>
      {status}
    </Badge>
  );
};

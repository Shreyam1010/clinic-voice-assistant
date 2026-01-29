import { Phone, PhoneIncoming, PhoneMissed, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Call {
  id: string;
  patientName: string;
  phoneNumber: string;
  type: "incoming" | "outgoing" | "missed";
  duration: string;
  time: string;
  department: string;
  status: "completed" | "missed" | "transferred";
}

interface RecentCallsProps {
  calls: Call[];
}

export function RecentCalls({ calls }: RecentCallsProps) {
  const getCallIcon = (type: Call["type"]) => {
    switch (type) {
      case "incoming":
        return <PhoneIncoming className="h-4 w-4 text-success" />;
      case "missed":
        return <PhoneMissed className="h-4 w-4 text-destructive" />;
      default:
        return <Phone className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusBadge = (status: Call["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary" className="bg-success/10 text-success">Completed</Badge>;
      case "missed":
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive">Missed</Badge>;
      case "transferred":
        return <Badge variant="secondary" className="bg-warning/10 text-warning">Transferred</Badge>;
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="font-semibold text-foreground">Recent Calls</h3>
        <a href="/calls" className="text-sm font-medium text-primary hover:underline">
          View all
        </a>
      </div>

      <div className="divide-y divide-border">
        {calls.map((call, index) => (
          <div
            key={call.id}
            className="flex items-center gap-4 px-5 py-3 transition-colors hover:bg-muted/30"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              {getCallIcon(call.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground truncate">{call.patientName}</p>
                {getStatusBadge(call.status)}
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{call.phoneNumber}</span>
                <span>•</span>
                <span>{call.department}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-1.5 text-sm text-foreground">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                {call.duration}
              </div>
              <p className="text-xs text-muted-foreground">{call.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Phone, PhoneOff, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentStatusProps {
  isOnline: boolean;
  currentCall?: {
    patientName: string;
    duration: string;
    department: string;
  };
  stats: {
    todayCalls: number;
    avgDuration: string;
    successRate: number;
  };
}

export function AgentStatus({ isOnline, currentCall, stats }: AgentStatusProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Voice Agent Status</h3>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "status-pulse relative flex h-2.5 w-2.5 rounded-full",
              isOnline ? "bg-success" : "bg-muted-foreground"
            )}
          />
          <span className={cn("text-sm font-medium", isOnline ? "text-success" : "text-muted-foreground")}>
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      {currentCall ? (
        <div className="mt-4 rounded-lg bg-primary/5 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Phone className="h-5 w-5 animate-pulse text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{currentCall.patientName}</p>
              <p className="text-sm text-muted-foreground">{currentCall.department}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">{currentCall.duration}</p>
              <p className="text-xs text-muted-foreground">Duration</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex items-center gap-3 rounded-lg bg-muted/50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <PhoneOff className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No active call - waiting for incoming calls</p>
        </div>
      )}

      <div className="mt-5 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Phone className="h-4 w-4 text-primary" />
            <span className="text-lg font-bold text-foreground">{stats.todayCalls}</span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">Today's Calls</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Clock className="h-4 w-4 text-info" />
            <span className="text-lg font-bold text-foreground">{stats.avgDuration}</span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">Avg Duration</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="text-lg font-bold text-foreground">{stats.successRate}%</span>
          </div>
          <p className="mt-0.5 text-xs text-muted-foreground">Success Rate</p>
        </div>
      </div>
    </div>
  );
}

import { Calendar, Clock, User, Stethoscope } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  type: "new" | "follow-up";
}

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="font-semibold text-foreground">Today's Appointments</h3>
        <a href="/appointments" className="text-sm font-medium text-primary hover:underline">
          View all
        </a>
      </div>

      <div className="divide-y divide-border">
        {appointments.map((apt, index) => (
          <div
            key={apt.id}
            className="px-5 py-4 transition-colors hover:bg-muted/30"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{apt.patientName}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Stethoscope className="h-3.5 w-3.5" />
                    <span>{apt.doctorName}</span>
                    <span>•</span>
                    <span>{apt.department}</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary" className={apt.type === "new" ? "bg-primary/10 text-primary" : "bg-secondary"}>
                {apt.type === "new" ? "New Patient" : "Follow-up"}
              </Badge>
            </div>

            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{apt.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{apt.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

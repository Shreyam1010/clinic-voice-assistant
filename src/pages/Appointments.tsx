import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Phone,
  MoreVertical,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  type: "new" | "follow-up";
  status: "confirmed" | "pending" | "cancelled" | "completed";
  bookedVia: "ai-agent" | "manual" | "online";
  notes?: string;
}

const appointments: Appointment[] = [
  {
    id: "1",
    patientName: "Vikram Singh",
    patientPhone: "+91 98765 43210",
    doctorName: "Dr. Meera Patel",
    department: "Cardiology",
    date: "2024-01-15",
    time: "11:30 AM",
    type: "new",
    status: "confirmed",
    bookedVia: "ai-agent",
    notes: "Chest pain and shortness of breath",
  },
  {
    id: "2",
    patientName: "Lakshmi Iyer",
    patientPhone: "+91 87654 32109",
    doctorName: "Dr. Arjun Reddy",
    department: "ENT",
    date: "2024-01-15",
    time: "2:00 PM",
    type: "follow-up",
    status: "confirmed",
    bookedVia: "ai-agent",
  },
  {
    id: "3",
    patientName: "Mohammed Ali",
    patientPhone: "+91 76543 21098",
    doctorName: "Dr. Sunita Rao",
    department: "Orthopaedics",
    date: "2024-01-15",
    time: "3:30 PM",
    type: "new",
    status: "pending",
    bookedVia: "ai-agent",
    notes: "Knee pain for 2 weeks",
  },
  {
    id: "4",
    patientName: "Neha Gupta",
    patientPhone: "+91 65432 10987",
    doctorName: "Dr. Kavita Sharma",
    department: "Dermatology",
    date: "2024-01-15",
    time: "4:00 PM",
    type: "follow-up",
    status: "confirmed",
    bookedVia: "manual",
  },
  {
    id: "5",
    patientName: "Rajesh Krishnan",
    patientPhone: "+91 54321 09876",
    doctorName: "Dr. Anil Kumar",
    department: "General Medicine",
    date: "2024-01-15",
    time: "5:00 PM",
    type: "new",
    status: "cancelled",
    bookedVia: "ai-agent",
  },
  {
    id: "6",
    patientName: "Deepa Venkat",
    patientPhone: "+91 43210 98765",
    doctorName: "Dr. Meera Patel",
    department: "Cardiology",
    date: "2024-01-15",
    time: "10:00 AM",
    type: "follow-up",
    status: "completed",
    bookedVia: "ai-agent",
  },
];

export default function Appointments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getStatusBadge = (status: Appointment["status"]) => {
    const variants = {
      confirmed: "bg-success/10 text-success border-success/20",
      pending: "bg-warning/10 text-warning border-warning/20",
      cancelled: "bg-destructive/10 text-destructive border-destructive/20",
      completed: "bg-muted text-muted-foreground border-muted",
    };

    return (
      <Badge variant="outline" className={cn("capitalize", variants[status])}>
        {status}
      </Badge>
    );
  };

  const getBookedViaBadge = (via: Appointment["bookedVia"]) => {
    if (via === "ai-agent") {
      return (
        <Badge variant="secondary" className="bg-primary/10 text-primary">
          AI Agent
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="capitalize">
        {via}
      </Badge>
    );
  };

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Group appointments by time slots
  const timeSlots = ["Morning", "Afternoon", "Evening"];
  const getTimeSlot = (time: string) => {
    const hour = parseInt(time.split(":")[0]);
    const isPM = time.includes("PM");
    const hour24 = isPM && hour !== 12 ? hour + 12 : hour;
    if (hour24 < 12) return "Morning";
    if (hour24 < 17) return "Afternoon";
    return "Evening";
  };

  return (
    <DashboardLayout title="Appointments" subtitle="Manage patient appointments">
      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search patients, doctors, departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Today
          </Button>
          <Button>
            + New Appointment
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {appointments.filter((a) => a.status === "confirmed").length}
                </p>
                <p className="text-sm text-muted-foreground">Confirmed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {appointments.filter((a) => a.status === "pending").length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {appointments.filter((a) => a.status === "completed").length}
                </p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {appointments.filter((a) => a.bookedVia === "ai-agent").length}
                </p>
                <p className="text-sm text-muted-foreground">Via AI Agent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Appointments Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredAppointments.map((apt) => (
          <Card
            key={apt.id}
            className={cn(
              "group transition-all duration-200 hover:shadow-card-hover",
              apt.status === "cancelled" && "opacity-60"
            )}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{apt.patientName}</p>
                    <p className="text-sm text-muted-foreground">{apt.patientPhone}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Stethoscope className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{apt.doctorName}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{apt.department}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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

              {apt.notes && (
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                  {apt.notes}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusBadge(apt.status)}
                  <Badge variant="outline" className="capitalize">
                    {apt.type}
                  </Badge>
                </div>
                {getBookedViaBadge(apt.bookedVia)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}

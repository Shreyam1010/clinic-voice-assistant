import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, Phone, PhoneIncoming, PhoneMissed, Play, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface CallLog {
  id: string;
  patientName: string;
  phoneNumber: string;
  type: "incoming" | "outgoing" | "missed";
  duration: string;
  timestamp: string;
  department: string;
  status: "completed" | "missed" | "transferred" | "escalated";
  language: string;
  summary: string;
}

const callLogs: CallLog[] = [
  {
    id: "1",
    patientName: "Priya Sharma",
    phoneNumber: "+91 98765 43210",
    type: "incoming",
    duration: "4:32",
    timestamp: "2024-01-15 10:30 AM",
    department: "Cardiology",
    status: "completed",
    language: "Hindi",
    summary: "New appointment request for chest pain consultation",
  },
  {
    id: "2",
    patientName: "Rahul Kumar",
    phoneNumber: "+91 87654 32109",
    type: "incoming",
    duration: "2:15",
    timestamp: "2024-01-15 10:05 AM",
    department: "Orthopaedics",
    status: "completed",
    language: "English",
    summary: "Follow-up appointment rescheduling",
  },
  {
    id: "3",
    patientName: "Unknown Caller",
    phoneNumber: "+91 76543 21098",
    type: "missed",
    duration: "-",
    timestamp: "2024-01-15 09:45 AM",
    department: "-",
    status: "missed",
    language: "-",
    summary: "Call not answered - no voicemail left",
  },
  {
    id: "4",
    patientName: "Anita Desai",
    phoneNumber: "+91 65432 10987",
    type: "incoming",
    duration: "6:48",
    timestamp: "2024-01-15 09:30 AM",
    department: "Dermatology",
    status: "transferred",
    language: "Kannada",
    summary: "Complex query - transferred to human staff",
  },
  {
    id: "5",
    patientName: "Suresh Menon",
    phoneNumber: "+91 54321 09876",
    type: "incoming",
    duration: "3:22",
    timestamp: "2024-01-15 09:15 AM",
    department: "ENT",
    status: "completed",
    language: "English",
    summary: "New patient registration and appointment booking",
  },
  {
    id: "6",
    patientName: "Kavitha Nair",
    phoneNumber: "+91 43210 98765",
    type: "incoming",
    duration: "5:10",
    timestamp: "2024-01-15 09:00 AM",
    department: "General Medicine",
    status: "escalated",
    language: "Hindi",
    summary: "Emergency query - escalated to on-call doctor",
  },
];

export default function Calls() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const getCallIcon = (type: CallLog["type"]) => {
    switch (type) {
      case "incoming":
        return <PhoneIncoming className="h-4 w-4 text-success" />;
      case "missed":
        return <PhoneMissed className="h-4 w-4 text-destructive" />;
      default:
        return <Phone className="h-4 w-4 text-primary" />;
    }
  };

  const getStatusBadge = (status: CallLog["status"]) => {
    const variants = {
      completed: "bg-success/10 text-success border-success/20",
      missed: "bg-destructive/10 text-destructive border-destructive/20",
      transferred: "bg-warning/10 text-warning border-warning/20",
      escalated: "bg-info/10 text-info border-info/20",
    };

    return (
      <Badge variant="outline" className={cn("capitalize", variants[status])}>
        {status}
      </Badge>
    );
  };

  const filteredCalls = callLogs.filter((call) => {
    const matchesSearch =
      call.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.phoneNumber.includes(searchTerm) ||
      call.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || call.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout title="Call Logs" subtitle="View and manage all incoming calls">
      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, phone, or department..."
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
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="missed">Missed</SelectItem>
              <SelectItem value="transferred">Transferred</SelectItem>
              <SelectItem value="escalated">Escalated</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-12"></TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCalls.map((call) => (
              <TableRow key={call.id} className="group">
                <TableCell>{getCallIcon(call.type)}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-foreground">{call.patientName}</p>
                    <p className="text-sm text-muted-foreground">{call.phoneNumber}</p>
                  </div>
                </TableCell>
                <TableCell>{call.department}</TableCell>
                <TableCell>{call.duration}</TableCell>
                <TableCell>{call.language}</TableCell>
                <TableCell>{getStatusBadge(call.status)}</TableCell>
                <TableCell className="text-muted-foreground">{call.timestamp}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Play className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}

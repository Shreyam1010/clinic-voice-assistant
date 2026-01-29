import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  UserPlus,
  Phone,
  Mail,
  Calendar,
  MapPin,
  MoreVertical,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  gender: "male" | "female" | "other";
  location: string;
  registeredDate: string;
  lastVisit: string;
  totalVisits: number;
  preferredLanguage: string;
  status: "active" | "inactive";
}

const patients: Patient[] = [
  {
    id: "P001",
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    email: "priya.sharma@email.com",
    age: 34,
    gender: "female",
    location: "Bengaluru, Karnataka",
    registeredDate: "2023-06-15",
    lastVisit: "2024-01-10",
    totalVisits: 8,
    preferredLanguage: "Hindi",
    status: "active",
  },
  {
    id: "P002",
    name: "Rahul Kumar",
    phone: "+91 87654 32109",
    email: "rahul.k@email.com",
    age: 45,
    gender: "male",
    location: "Mumbai, Maharashtra",
    registeredDate: "2023-08-22",
    lastVisit: "2024-01-12",
    totalVisits: 5,
    preferredLanguage: "English",
    status: "active",
  },
  {
    id: "P003",
    name: "Anita Desai",
    phone: "+91 76543 21098",
    email: "anita.d@email.com",
    age: 28,
    gender: "female",
    location: "Mysuru, Karnataka",
    registeredDate: "2023-11-05",
    lastVisit: "2024-01-08",
    totalVisits: 3,
    preferredLanguage: "Kannada",
    status: "active",
  },
  {
    id: "P004",
    name: "Suresh Menon",
    phone: "+91 65432 10987",
    email: "suresh.m@email.com",
    age: 52,
    gender: "male",
    location: "Chennai, Tamil Nadu",
    registeredDate: "2023-04-10",
    lastVisit: "2023-12-20",
    totalVisits: 12,
    preferredLanguage: "English",
    status: "active",
  },
  {
    id: "P005",
    name: "Kavitha Nair",
    phone: "+91 54321 09876",
    email: "kavitha.n@email.com",
    age: 39,
    gender: "female",
    location: "Kochi, Kerala",
    registeredDate: "2023-09-18",
    lastVisit: "2023-11-15",
    totalVisits: 2,
    preferredLanguage: "English",
    status: "inactive",
  },
  {
    id: "P006",
    name: "Mohammed Ali",
    phone: "+91 43210 98765",
    email: "mohammed.a@email.com",
    age: 41,
    gender: "male",
    location: "Hyderabad, Telangana",
    registeredDate: "2023-07-25",
    lastVisit: "2024-01-14",
    totalVisits: 6,
    preferredLanguage: "Hindi",
    status: "active",
  },
];

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout title="Patients" subtitle="Manage patient records and history">
      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">{patients.length}</p>
            <p className="text-sm text-muted-foreground">Total Patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">
              {patients.filter((p) => p.status === "active").length}
            </p>
            <p className="text-sm text-muted-foreground">Active Patients</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">18</p>
            <p className="text-sm text-muted-foreground">New This Month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-foreground">4.2</p>
            <p className="text-sm text-muted-foreground">Avg Visits/Patient</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>Patient</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Language</TableHead>
              <TableHead>Visits</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id} className="group">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                      {patient.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {patient.age} yrs • {patient.gender}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      {patient.phone}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" />
                      {patient.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5 text-sm">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    {patient.location}
                  </div>
                </TableCell>
                <TableCell>{patient.preferredLanguage}</TableCell>
                <TableCell>
                  <span className="font-medium">{patient.totalVisits}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">{patient.lastVisit}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      patient.status === "active"
                        ? "bg-success/10 text-success border-success/20"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
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

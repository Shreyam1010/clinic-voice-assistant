import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AgentStatus } from "@/components/dashboard/AgentStatus";
import { RecentCalls } from "@/components/dashboard/RecentCalls";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { DepartmentStats } from "@/components/dashboard/DepartmentStats";
import { Phone, Calendar, Clock, Users } from "lucide-react";

// Mock data
const recentCalls = [
  {
    id: "1",
    patientName: "Priya Sharma",
    phoneNumber: "+91 98765 43210",
    type: "incoming" as const,
    duration: "4:32",
    time: "10 mins ago",
    department: "Cardiology",
    status: "completed" as const,
  },
  {
    id: "2",
    patientName: "Rahul Kumar",
    phoneNumber: "+91 87654 32109",
    type: "incoming" as const,
    duration: "2:15",
    time: "25 mins ago",
    department: "Orthopaedics",
    status: "completed" as const,
  },
  {
    id: "3",
    patientName: "Unknown Caller",
    phoneNumber: "+91 76543 21098",
    type: "missed" as const,
    duration: "-",
    time: "45 mins ago",
    department: "-",
    status: "missed" as const,
  },
  {
    id: "4",
    patientName: "Anita Desai",
    phoneNumber: "+91 65432 10987",
    type: "incoming" as const,
    duration: "6:48",
    time: "1 hour ago",
    department: "Dermatology",
    status: "transferred" as const,
  },
];

const upcomingAppointments = [
  {
    id: "1",
    patientName: "Vikram Singh",
    doctorName: "Dr. Meera Patel",
    department: "Cardiology",
    date: "Today",
    time: "11:30 AM",
    type: "new" as const,
  },
  {
    id: "2",
    patientName: "Lakshmi Iyer",
    doctorName: "Dr. Arjun Reddy",
    department: "ENT",
    date: "Today",
    time: "2:00 PM",
    type: "follow-up" as const,
  },
  {
    id: "3",
    patientName: "Mohammed Ali",
    doctorName: "Dr. Sunita Rao",
    department: "Orthopaedics",
    date: "Today",
    time: "3:30 PM",
    type: "new" as const,
  },
];

const departmentStats = [
  { name: "Cardiology", calls: 24, percentage: 30, color: "hsl(174, 62%, 40%)" },
  { name: "Orthopaedics", calls: 18, percentage: 22, color: "hsl(200, 80%, 50%)" },
  { name: "Dermatology", calls: 15, percentage: 19, color: "hsl(152, 60%, 42%)" },
  { name: "ENT", calls: 12, percentage: 15, color: "hsl(38, 92%, 50%)" },
  { name: "General Medicine", calls: 11, percentage: 14, color: "hsl(280, 60%, 50%)" },
];

export default function Dashboard() {
  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Monitor your clinic's AI voice agent performance"
    >
      {/* Metrics Row */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Calls Today"
          value="127"
          subtitle="24 ongoing"
          icon={<Phone className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
          variant="primary"
        />
        <MetricCard
          title="Appointments Booked"
          value="43"
          subtitle="via AI agent"
          icon={<Calendar className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true }}
          variant="success"
        />
        <MetricCard
          title="Avg Call Duration"
          value="3:42"
          subtitle="minutes"
          icon={<Clock className="h-5 w-5" />}
          trend={{ value: 5, isPositive: false }}
          variant="warning"
        />
        <MetricCard
          title="New Patients"
          value="18"
          subtitle="registered today"
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 15, isPositive: true }}
          variant="default"
        />
      </div>

      {/* Main Content Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left Column - Agent Status & Calls */}
        <div className="space-y-6 lg:col-span-2">
          <AgentStatus
            isOnline={true}
            currentCall={{
              patientName: "Suresh Menon",
              duration: "02:45",
              department: "Cardiology",
            }}
            stats={{
              todayCalls: 127,
              avgDuration: "3:42",
              successRate: 94,
            }}
          />
          <RecentCalls calls={recentCalls} />
        </div>

        {/* Right Column - Appointments & Stats */}
        <div className="space-y-6">
          <DepartmentStats departments={departmentStats} />
          <UpcomingAppointments appointments={upcomingAppointments} />
        </div>
      </div>
    </DashboardLayout>
  );
}

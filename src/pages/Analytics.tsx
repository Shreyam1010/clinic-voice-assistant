import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const weeklyData = [
  { day: "Mon", calls: 45, appointments: 18 },
  { day: "Tue", calls: 52, appointments: 22 },
  { day: "Wed", calls: 48, appointments: 20 },
  { day: "Thu", calls: 61, appointments: 28 },
  { day: "Fri", calls: 55, appointments: 24 },
  { day: "Sat", calls: 38, appointments: 15 },
  { day: "Sun", calls: 22, appointments: 8 },
];

const departmentPerformance = [
  { name: "Cardiology", calls: 156, success: 94, avgDuration: "4:12" },
  { name: "Orthopaedics", calls: 124, success: 91, avgDuration: "3:45" },
  { name: "Dermatology", calls: 98, success: 96, avgDuration: "2:58" },
  { name: "ENT", calls: 87, success: 89, avgDuration: "3:22" },
  { name: "General Medicine", calls: 142, success: 92, avgDuration: "3:38" },
];

const hourlyDistribution = [
  { hour: "8-10", calls: 45 },
  { hour: "10-12", calls: 78 },
  { hour: "12-14", calls: 42 },
  { hour: "14-16", calls: 65 },
  { hour: "16-18", calls: 58 },
  { hour: "18-20", calls: 32 },
];

const languageStats = [
  { language: "English", percentage: 45, color: "hsl(174, 62%, 40%)" },
  { language: "Hindi", percentage: 35, color: "hsl(200, 80%, 50%)" },
  { language: "Kannada", percentage: 15, color: "hsl(152, 60%, 42%)" },
  { language: "Other", percentage: 5, color: "hsl(38, 92%, 50%)" },
];

export default function Analytics() {
  const maxCalls = Math.max(...weeklyData.map((d) => d.calls));
  const maxHourlyCalls = Math.max(...hourlyDistribution.map((d) => d.calls));

  return (
    <DashboardLayout title="Analytics" subtitle="Performance insights and trends">
      {/* Time Period Selector */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Showing data for:</span>
          <Select defaultValue="week">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Calls</p>
                <p className="text-3xl font-bold text-foreground">847</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <ArrowUpRight className="h-4 w-4 text-success" />
              <span className="text-success">12%</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Success Rate</p>
                <p className="text-3xl font-bold text-foreground">92.4%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <ArrowUpRight className="h-4 w-4 text-success" />
              <span className="text-success">3.2%</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Duration</p>
                <p className="text-3xl font-bold text-foreground">3:42</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info/10">
                <Clock className="h-6 w-6 text-info" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <ArrowDownRight className="h-4 w-4 text-destructive" />
              <span className="text-destructive">8%</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Appointments</p>
                <p className="text-3xl font-bold text-foreground">312</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10">
                <Calendar className="h-6 w-6 text-warning" />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1 text-sm">
              <ArrowUpRight className="h-4 w-4 text-success" />
              <span className="text-success">18%</span>
              <span className="text-muted-foreground">vs last week</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        {/* Weekly Call Volume */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Weekly Call Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end justify-between gap-2">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex flex-1 flex-col items-center gap-2">
                  <div className="relative w-full flex flex-col gap-1">
                    <div
                      className="w-full rounded-t bg-primary/20 transition-all duration-300 hover:bg-primary/30"
                      style={{ height: `${(day.appointments / maxCalls) * 140}px` }}
                    />
                    <div
                      className="w-full rounded-t bg-primary transition-all duration-300 hover:bg-primary/80"
                      style={{ height: `${((day.calls - day.appointments) / maxCalls) * 140}px` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-primary" />
                <span className="text-muted-foreground">Total Calls</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-primary/20" />
                <span className="text-muted-foreground">Appointments</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hourly Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Peak Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hourlyDistribution.map((slot) => (
                <div key={slot.hour} className="flex items-center gap-3">
                  <span className="w-16 text-sm text-muted-foreground">{slot.hour}</span>
                  <div className="flex-1 h-6 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${(slot.calls / maxHourlyCalls) * 100}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-sm font-medium">{slot.calls}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Department Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Department Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentPerformance.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-32">
                      <p className="font-medium text-foreground">{dept.name}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{dept.calls} calls</span>
                      <span>•</span>
                      <span>{dept.avgDuration} avg</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          dept.success >= 95 ? "bg-success" : dept.success >= 90 ? "bg-primary" : "bg-warning"
                        )}
                        style={{ width: `${dept.success}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-sm font-medium">{dept.success}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Language Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Language Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {languageStats.map((lang) => (
                <div key={lang.language}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-foreground">{lang.language}</span>
                    <span className="text-muted-foreground">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${lang.percentage}%`, background: lang.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">AI Language Detection</span>
              </div>
              <p className="text-xs text-muted-foreground">
                98.5% accuracy in detecting caller's preferred language within first 3 seconds
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

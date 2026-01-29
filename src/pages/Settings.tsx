import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Phone,
  Globe,
  Bell,
  Shield,
  Mic,
  Clock,
  Users,
  Save,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [clinicName, setClinicName] = useState("ABC Clinic");
  const [greeting, setGreeting] = useState(
    "Welcome to ABC Clinic. How may I help you today?"
  );
  const [languages, setLanguages] = useState(["English", "Hindi", "Kannada"]);
  const [autoLanguageDetection, setAutoLanguageDetection] = useState(true);
  const [callRecording, setCallRecording] = useState(true);
  const [escalationEnabled, setEscalationEnabled] = useState(true);
  const [maxWaitTime, setMaxWaitTime] = useState("30");

  const departments = [
    { name: "Cardiology", phone: "+91 80 1234 5001", active: true },
    { name: "Orthopaedics", phone: "+91 80 1234 5002", active: true },
    { name: "Dermatology", phone: "+91 80 1234 5003", active: true },
    { name: "ENT", phone: "+91 80 1234 5004", active: true },
    { name: "General Medicine", phone: "+91 80 1234 5005", active: true },
  ];

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <DashboardLayout title="Settings" subtitle="Configure your AI voice agent">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="general" className="gap-2">
            <Building2 className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="voice" className="gap-2">
            <Mic className="h-4 w-4" />
            Voice Agent
          </TabsTrigger>
          <TabsTrigger value="departments" className="gap-2">
            <Users className="h-4 w-4" />
            Departments
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Clinic Information
              </CardTitle>
              <CardDescription>
                Basic details about your clinic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="clinicName">Clinic Name</Label>
                  <Input
                    id="clinicName"
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Main Phone Number</Label>
                  <Input id="phone" defaultValue="+91 80 1234 5000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" type="email" defaultValue="contact@abcclinic.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="asia-kolkata">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asia-kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="asia-mumbai">Asia/Mumbai</SelectItem>
                      <SelectItem value="asia-chennai">Asia/Chennai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  defaultValue="123, Health Street, Bengaluru, Karnataka 560001"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Operating Hours
              </CardTitle>
              <CardDescription>
                Set when the AI agent should be active
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Weekday Hours</Label>
                  <div className="flex items-center gap-2">
                    <Input defaultValue="08:00" type="time" className="w-28" />
                    <span className="text-muted-foreground">to</span>
                    <Input defaultValue="20:00" type="time" className="w-28" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Weekend Hours</Label>
                  <div className="flex items-center gap-2">
                    <Input defaultValue="09:00" type="time" className="w-28" />
                    <span className="text-muted-foreground">to</span>
                    <Input defaultValue="14:00" type="time" className="w-28" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">24/7 Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Enable AI agent to answer calls around the clock
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Voice Agent Settings */}
        <TabsContent value="voice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="h-5 w-5 text-primary" />
                Greeting & Language
              </CardTitle>
              <CardDescription>
                Customize how the AI greets callers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="greeting">Welcome Greeting</Label>
                <Textarea
                  id="greeting"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  This message is played when a caller connects
                </p>
              </div>

              <div className="space-y-2">
                <Label>Supported Languages</Label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="gap-1.5">
                      {lang}
                      <button
                        onClick={() =>
                          setLanguages(languages.filter((l) => l !== lang))
                        }
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="h-6">
                    <Plus className="mr-1 h-3 w-3" />
                    Add
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Auto Language Detection</p>
                  <p className="text-sm text-muted-foreground">
                    Automatically detect caller's preferred language
                  </p>
                </div>
                <Switch
                  checked={autoLanguageDetection}
                  onCheckedChange={setAutoLanguageDetection}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Call Handling
              </CardTitle>
              <CardDescription>
                Configure how calls are processed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Call Recording</p>
                  <p className="text-sm text-muted-foreground">
                    Record all calls for quality and training purposes
                  </p>
                </div>
                <Switch checked={callRecording} onCheckedChange={setCallRecording} />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Human Escalation</p>
                  <p className="text-sm text-muted-foreground">
                    Allow transfer to human staff for complex queries
                  </p>
                </div>
                <Switch
                  checked={escalationEnabled}
                  onCheckedChange={setEscalationEnabled}
                />
              </div>

              <div className="space-y-2">
                <Label>Max Wait Time Before Escalation</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={maxWaitTime}
                    onChange={(e) => setMaxWaitTime(e.target.value)}
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">seconds</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Departments */}
        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Department Routing
              </CardTitle>
              <CardDescription>
                Configure department phone numbers for call routing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <div
                    key={dept.name}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{dept.name}</p>
                        <p className="text-sm text-muted-foreground">{dept.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch checked={dept.active} />
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Missed Call Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when a call goes unanswered
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Escalation Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Notify when a call is escalated to human staff
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">Daily Summary</p>
                  <p className="text-sm text-muted-foreground">
                    Receive a daily report of call activity
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">New Appointment Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified for each new appointment booked
                  </p>
                </div>
                <Switch />
              </div>

              <div className="space-y-2">
                <Label>Notification Email</Label>
                <Input type="email" defaultValue="admin@abcclinic.com" />
              </div>

              <div className="space-y-2">
                <Label>SMS Notifications</Label>
                <Input type="tel" defaultValue="+91 98765 00000" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </DashboardLayout>
  );
}

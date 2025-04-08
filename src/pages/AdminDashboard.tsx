import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shell, DashboardHeader, AdminSidebar } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for appointments overview
const appointmentsOverview = {
  today: 12,
  tomorrow: 16,
  thisWeek: 58,
  total: 143,
  pending: 8,
  confirmed: 135,
};

// Mock data for recent appointments
const recentAppointments = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Sarah Johnson",
    date: "2023-06-15",
    time: "10:00 AM",
    status: "Confirmed"
  },
  {
    id: 2,
    patient: "Jane Smith",
    doctor: "Dr. Michael Chen",
    date: "2023-06-15",
    time: "11:30 AM",
    status: "Confirmed"
  },
  {
    id: 3,
    patient: "Robert Wilson",
    doctor: "Dr. Emily Rodriguez",
    date: "2023-06-15",
    time: "2:00 PM",
    status: "Pending"
  },
  {
    id: 4,
    patient: "Lisa Johnson",
    doctor: "Dr. David Kim",
    date: "2023-06-15",
    time: "3:30 PM",
    status: "Confirmed"
  },
  {
    id: 5,
    patient: "Michael Brown",
    doctor: "Dr. Lisa Patel",
    date: "2023-06-15",
    time: "4:45 PM",
    status: "Confirmed"
  }
];

// Mock data for doctor statistics
const doctorStats = {
  total: 15,
  available: 12,
  onLeave: 3,
  specialties: 8
};

const AdminDashboard = () => {
  // Get access to users data from AuthContext
  const { getRegisteredUsers } = useAuth();
  
  // State for patient statistics
  const [patientStats, setPatientStats] = useState({
    totalPatients: 0,
    newThisMonth: 147,
    activePatients: 0,
    averageAge: 42
  });
  
  // Effect to update patient stats when component mounts
  useEffect(() => {
    const users = getRegisteredUsers();
    if (users) {
      setPatientStats({
        ...patientStats,
        totalPatients: users.length,
        activePatients: users.filter(user => user.role === "user").length
      });
    }
  }, [getRegisteredUsers]);

  return (
    <Shell 
      header={<DashboardHeader />} 
      sidebar={<AdminSidebar />}
      className="p-0"
    >
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Link to="/admin/appointments">
              <Button>Manage Appointments</Button>
            </Link>
            <Button onClick={() => navigate('/admin/settings')}>
              <Cog className="mr-2 h-4 w-4" />
              Admin Settings
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="animate-fade-in">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Today's Appointments
                  </CardTitle>
                  <svg className="h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{appointmentsOverview.today}</div>
                  <p className="text-xs text-muted-foreground">
                    +{appointmentsOverview.tomorrow} scheduled for tomorrow
                  </p>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in delay-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Requests
                  </CardTitle>
                  <svg className="h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{appointmentsOverview.pending}</div>
                  <p className="text-xs text-muted-foreground">
                    {appointmentsOverview.confirmed} confirmed appointments
                  </p>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in delay-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Doctors
                  </CardTitle>
                  <svg className="h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{doctorStats.total}</div>
                  <p className="text-xs text-muted-foreground">
                    {doctorStats.available} available today
                  </p>
                </CardContent>
              </Card>
              
              <Card className="animate-fade-in delay-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Patients
                  </CardTitle>
                  <svg className="h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{patientStats.totalPatients}</div>
                  <p className="text-xs text-muted-foreground">
                    +{patientStats.newThisMonth} new this month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-1 md:col-span-2 lg:col-span-4 animate-fade-in delay-400">
                <CardHeader>
                  <CardTitle>Today's Appointments</CardTitle>
                  <CardDescription>
                    A list of today's appointments and their status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                              {appointment.patient.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h3 className="font-medium">{appointment.patient}</h3>
                              <p className="text-sm text-muted-foreground">{appointment.doctor}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <p className="text-sm">{appointment.time}</p>
                          <span className={`
                            mt-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                            ${appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                          `}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1 md:col-span-2 lg:col-span-3 animate-fade-in delay-500">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common administrative tasks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 grid-cols-1">
                    <Button className="w-full justify-start" variant="outline">
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Add New Doctor
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Register New Patient
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Update Doctor Schedule
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Send Notification
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Generate Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Patients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{patientStats.totalPatients}</div>
                  <p className="text-xs text-muted-foreground">
                    {patientStats.activePatients} active patients
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    New Patients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{patientStats.newThisMonth}</div>
                  <p className="text-xs text-muted-foreground">
                    This month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Appointment Completion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">94%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.5% from last month
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Patient Age
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{patientStats.averageAge}</div>
                  <p className="text-xs text-muted-foreground">
                    Years
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Appointments by Department</CardTitle>
                  <CardDescription>
                    Distribution of appointments across medical departments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      Chart visualization would go here (with recharts library)
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Appointment Trends</CardTitle>
                  <CardDescription>
                    Weekly appointment booking trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      Chart visualization would go here (with recharts library)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Send Notifications</CardTitle>
                <CardDescription>
                  Send notifications to patients about upcoming appointments or other important information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                    <Button className="w-full justify-start" variant="outline">
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Send Appointment Reminders
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Notify About Schedule Changes
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Send Health Tips & Information
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      General Announcements
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recently Sent Notifications</CardTitle>
                <CardDescription>
                  History of notifications sent to patients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Appointment Reminder</h3>
                        <p className="text-sm text-muted-foreground">
                          Sent to 15 patients with upcoming appointments tomorrow
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">Today, 10:32 AM</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Schedule Change</h3>
                        <p className="text-sm text-muted-foreground">
                          Notified 3 patients about Dr. Chen's unavailability on Friday
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">Yesterday, 2:15 PM</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Health Tips Newsletter</h3>
                        <p className="text-sm text-muted-foreground">
                          Monthly newsletter sent to all patients (2,578 recipients)
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">June 1, 2023</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Shell>
  );
};

export default AdminDashboard;

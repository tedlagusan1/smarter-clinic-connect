
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shell, DashboardHeader, DashboardSidebar } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Mock data for upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "General Practitioner",
      date: "2023-06-15",
      time: "10:00 AM",
      status: "Confirmed"
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      date: "2023-06-20",
      time: "2:30 PM",
      status: "Pending"
    }
  ];
  
  // Mock data for health reminders
  const healthReminders = [
    {
      id: 1,
      title: "Annual Physical Checkup",
      description: "It's time for your annual physical examination",
      dueDate: "2023-07-10"
    },
    {
      id: 2,
      title: "Vaccination Reminder",
      description: "Your flu vaccination is due soon",
      dueDate: "2023-06-30"
    }
  ];
  
  return (
    <Shell 
      header={<DashboardHeader />} 
      sidebar={<DashboardSidebar />}
      className="p-0"
    >
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Button onClick={() => navigate("/dashboard/book")}>
              Book New Appointment
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="animate-fade-in">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
              <p className="text-xs text-muted-foreground">
                Next: {upcomingAppointments[0]?.date} at {upcomingAppointments[0]?.time}
              </p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in delay-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Health Reminders</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{healthReminders.length}</div>
              <p className="text-xs text-muted-foreground">
                Next: {healthReminders[0]?.title} by {healthReminders[0]?.dueDate}
              </p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in delay-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Past Appointments</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Last: 2023-05-28
              </p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in delay-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
              <svg className="h-4 w-4 text-muted-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Active prescriptions
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <Card className="animate-fade-in delay-400">
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>
                View your scheduled appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming appointments</p>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{appointment.doctor}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                        <p className="text-sm">
                          {appointment.date} at {appointment.time}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`
                          inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                          ${appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                        `}>
                          {appointment.status}
                        </span>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate("/dashboard/appointments")}
                          >
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-500">
            <CardHeader>
              <CardTitle>Health Reminders</CardTitle>
              <CardDescription>
                Stay up to date with your health schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              {healthReminders.length === 0 ? (
                <p className="text-sm text-muted-foreground">No health reminders</p>
              ) : (
                <div className="space-y-4">
                  {healthReminders.map((reminder) => (
                    <div key={reminder.id} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{reminder.title}</h3>
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          Due: {reminder.dueDate}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {reminder.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  );
};

export default Dashboard;

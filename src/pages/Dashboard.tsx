
import React, { useEffect, useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();

  // Fetch appointments from Supabase
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Separate logical metrics
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [healthReminders] = useState([]); // Still empty for now

  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      const today = new Date();
      const yyyyMMdd = today.toISOString().slice(0, 10);
      // Fetch all user's appointments
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .order("date", { ascending: true })
        .order("time", { ascending: true });
      if (!error) {
        setAppointments(data || []);
        // Separate logic for upcoming
        setUpcomingAppointments((data || []).filter(a => a.date >= yyyyMMdd));
      } else {
        setAppointments([]);
        setUpcomingAppointments([]);
      }
      setLoading(false);
    }
    fetchAppointments();
  }, []);

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
              <div className="text-2xl font-bold">{loading ? "-" : upcomingAppointments.length}</div>
              <p className="text-xs text-muted-foreground">
                {loading ? "Loading..." : (
                  upcomingAppointments.length > 0
                    ? `Next: ${upcomingAppointments[0]?.date} at ${upcomingAppointments[0]?.time}`
                    : "No upcoming appointments"
                )}
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
                No health reminders
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
              <div className="text-2xl font-bold">
                {loading ? "-" : appointments.filter(a => a.date < new Date().toISOString().slice(0,10)).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {loading
                  ? "Loading..."
                  : appointments.filter(a => a.date < new Date().toISOString().slice(0,10)).length === 0
                  ? "No past appointments"
                  : ""}
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
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                No active prescriptions
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
              {loading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : upcomingAppointments.length === 0 ? (
                <p className="text-sm text-muted-foreground">No upcoming appointments</p>
              ) : (
                <div className="space-y-4">
                  {upcomingAppointments.map(a => (
                    <div key={a.id} className="p-3 border rounded-lg">
                      <div className="font-semibold">{a.doctor_name}</div>
                      <div className="text-sm text-muted-foreground">{a.specialty}</div>
                      <div className="text-sm">{a.date} at {a.time}</div>
                      <div className="text-xs">{a.location}</div>
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
              <p className="text-sm text-muted-foreground">No health reminders</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  );
};

export default Dashboard;

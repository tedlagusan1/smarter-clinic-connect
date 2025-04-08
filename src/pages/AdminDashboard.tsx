import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shell, DashboardHeader, AdminSidebar } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for appointments
const mockAppointments = [
  { id: 1, patientName: "John Doe", date: "2024-03-15", time: "10:00 AM", doctor: "Dr. Smith" },
  { id: 2, patientName: "Jane Smith", date: "2024-03-16", time: "11:00 AM", doctor: "Dr. Jones" },
  { id: 3, patientName: "Alice Johnson", date: "2024-03-17", time: "09:00 AM", doctor: "Dr. Smith" },
];

// Mock data for doctors
const mockDoctors = [
  { id: 101, name: "Dr. Smith", specialty: "Cardiology", availability: "Mon-Fri" },
  { id: 102, name: "Dr. Jones", specialty: "Pediatrics", availability: "Tue-Sat" },
];

const AdminDashboard = () => {
  // Get access to users data from AuthContext
  const { getRegisteredUsers } = useAuth();
  
  // State to hold the number of registered users
  const [registeredUsersCount, setRegisteredUsersCount] = useState(0);
  
  // State to hold appointment and doctor data
  const [appointments, setAppointments] = useState(mockAppointments);
  const [doctors, setDoctors] = useState(mockDoctors);
  
  useEffect(() => {
    // Fetch registered users count when the component mounts
    const fetchUsersCount = async () => {
      try {
        const users = await getRegisteredUsers();
        setRegisteredUsersCount(users.length);
      } catch (error) {
        console.error("Failed to fetch registered users:", error);
        setRegisteredUsersCount(0);
      }
    };
    
    fetchUsersCount();
  }, [getRegisteredUsers]);
  
  return (
    <Shell header={<DashboardHeader />} sidebar={<AdminSidebar />}>
      <div className="container max-w-7xl mx-auto py-6 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Link to="/admin/appointments">
              <Button>Manage Appointments</Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Registered Users</CardTitle>
              <CardDescription>Total number of registered users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registeredUsersCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Total Appointments</CardTitle>
              <CardDescription>Number of appointments scheduled</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{appointments.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Available Doctors</CardTitle>
              <CardDescription>Number of doctors in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doctors.length}</div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="appointments">
            <h2 className="text-2xl font-semibold mb-4">Recent Appointments</h2>
            <ul>
              {appointments.map(appointment => (
                <li key={appointment.id} className="py-2 border-b">
                  {appointment.patientName} - {appointment.date} at {appointment.time} with {appointment.doctor}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="doctors">
            <h2 className="text-2xl font-semibold mb-4">Available Doctors</h2>
            <ul>
              {doctors.map(doctor => (
                <li key={doctor.id} className="py-2 border-b">
                  {doctor.name} ({doctor.specialty}) - Availability: {doctor.availability}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="analytics">
            <h2 className="text-2xl font-semibold mb-4">System Analytics</h2>
            <p>Detailed analytics and reporting will be available here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </Shell>
  );
};

export default AdminDashboard;

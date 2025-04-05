
import React, { useState } from "react";
import { Shell, DashboardHeader, DashboardSidebar } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

// Mock data for upcoming appointments
const upcomingAppointmentsData = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "General Practitioner",
    date: "2023-06-15",
    time: "10:00 AM",
    status: "Confirmed",
    location: "Main Clinic, Room 101"
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "Cardiologist",
    date: "2023-06-20",
    time: "2:30 PM",
    status: "Pending",
    location: "Cardiology Center, Room 305"
  }
];

// Mock data for past appointments
const pastAppointmentsData = [
  {
    id: 101,
    doctor: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    date: "2023-05-05",
    time: "11:30 AM",
    status: "Completed",
    location: "Children's Wing, Room 210"
  },
  {
    id: 102,
    doctor: "Dr. Sarah Johnson",
    specialty: "General Practitioner",
    date: "2023-05-10",
    time: "9:00 AM",
    status: "Completed",
    location: "Main Clinic, Room 103"
  },
  {
    id: 103,
    doctor: "Dr. David Kim",
    specialty: "Dermatologist",
    date: "2023-04-25",
    time: "3:15 PM",
    status: "Cancelled",
    location: "Dermatology Center, Room 402"
  }
];

const Appointments = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState(upcomingAppointmentsData);
  const [pastAppointments, setPastAppointments] = useState(pastAppointmentsData);
  const [cancelReason, setCancelReason] = useState("");
  const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null);
  const [rescheduleNote, setRescheduleNote] = useState("");
  const [appointmentToReschedule, setAppointmentToReschedule] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleCancelAppointment = () => {
    if (!cancelReason) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide a reason for cancellation"
      });
      return;
    }
    
    // Update the appointment status to Cancelled
    const updatedAppointments = upcomingAppointments.map(appointment => {
      if (appointment.id === appointmentToCancel) {
        return { ...appointment, status: "Cancelled" };
      }
      return appointment;
    });
    
    // Move the cancelled appointment to past appointments
    const cancelledAppointment = upcomingAppointments.find(appointment => appointment.id === appointmentToCancel);
    if (cancelledAppointment) {
      setPastAppointments([
        { ...cancelledAppointment, status: "Cancelled" },
        ...pastAppointments
      ]);
      
      // Remove from upcoming appointments
      setUpcomingAppointments(upcomingAppointments.filter(appointment => appointment.id !== appointmentToCancel));
    }
    
    toast({
      title: "Success",
      description: "Appointment cancelled successfully"
    });
    
    setCancelReason("");
    setAppointmentToCancel(null);
    setDialogOpen(false);
  };
  
  const handleRescheduleRequest = () => {
    if (!rescheduleNote) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide a note for reschedule request"
      });
      return;
    }
    
    // Here we would typically send the reschedule request to the backend
    toast({
      title: "Success",
      description: "Reschedule request sent successfully"
    });
    
    setRescheduleNote("");
    setAppointmentToReschedule(null);
    setRescheduleDialogOpen(false);
  };
  
  const openCancelDialog = (id: number) => {
    setAppointmentToCancel(id);
    setDialogOpen(true);
  };
  
  const openRescheduleDialog = (id: number) => {
    setAppointmentToReschedule(id);
    setRescheduleDialogOpen(true);
  };
  
  return (
    <Shell
      header={<DashboardHeader />}
      sidebar={<DashboardSidebar />}
      className="p-0"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Appointments</h1>
          <Button onClick={() => navigate("/dashboard/book")}>
            Book New Appointment
          </Button>
        </div>
        
        <Tabs defaultValue="upcoming" className="animate-fade-in">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-6">
            {upcomingAppointments.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-6">
                    <h3 className="text-lg font-medium mb-2">No upcoming appointments</h3>
                    <p className="text-muted-foreground mb-4">You don't have any scheduled appointments.</p>
                    <Button onClick={() => navigate("/dashboard/book")}>
                      Book an Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className={`h-2 ${appointment.status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-lg">{appointment.doctor}</h3>
                          <p className="text-muted-foreground">{appointment.specialty}</p>
                          <div className="flex items-center mt-2">
                            <svg className="h-4 w-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm">{appointment.date} at {appointment.time}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <svg className="h-4 w-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm">{appointment.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-start md:items-end gap-2">
                          <span className={`
                            inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                            ${appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                              appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}
                          `}>
                            {appointment.status}
                          </span>
                          
                          <div className="flex gap-2 mt-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openRescheduleDialog(appointment.id)}
                            >
                              Reschedule
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => openCancelDialog(appointment.id)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="mt-6">
            {pastAppointments.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-6">
                    <h3 className="text-lg font-medium">No past appointments</h3>
                    <p className="text-muted-foreground">Your appointment history will appear here.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <Card key={appointment.id} className="overflow-hidden">
                    <div className={`h-2 ${
                      appointment.status === 'Completed' ? 'bg-green-500' : 
                      appointment.status === 'Cancelled' ? 'bg-red-500' : 
                      'bg-gray-500'
                    }`}></div>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <h3 className="font-medium text-lg">{appointment.doctor}</h3>
                          <p className="text-muted-foreground">{appointment.specialty}</p>
                          <div className="flex items-center mt-2">
                            <svg className="h-4 w-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm">{appointment.date} at {appointment.time}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <svg className="h-4 w-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm">{appointment.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-start md:items-end gap-2">
                          <span className={`
                            inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                            ${appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                              appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                              'bg-gray-100 text-gray-800'}
                          `}>
                            {appointment.status}
                          </span>
                          
                          {appointment.status === 'Completed' && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                            >
                              View Summary
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Appointment</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this appointment? Please provide a reason.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Cancellation</Label>
                <Input
                  id="reason"
                  placeholder="Please provide a reason"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Back
              </Button>
              <Button variant="destructive" onClick={handleCancelAppointment}>
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={rescheduleDialogOpen} onOpenChange={setRescheduleDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reschedule Appointment</DialogTitle>
              <DialogDescription>
                Please provide a note for your reschedule request. The clinic will contact you to arrange a new time.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="rescheduleNote">Reschedule Note</Label>
                <Input
                  id="rescheduleNote"
                  placeholder="Let us know your preferred dates/times"
                  value={rescheduleNote}
                  onChange={(e) => setRescheduleNote(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRescheduleDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRescheduleRequest}>
                Send Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Toaster />
      </div>
    </Shell>
  );
};

export default Appointments;

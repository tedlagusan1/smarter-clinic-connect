
import React, { useState } from "react";
import { Shell, DashboardHeader, AdminSidebar } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock data for appointments
const appointmentsData = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Sarah Johnson",
    department: "General Practice",
    date: "2023-06-15",
    time: "10:00 AM",
    status: "Scheduled",
    notes: "Annual checkup"
  },
  {
    id: 2,
    patient: "Jane Smith",
    doctor: "Dr. Michael Chen",
    department: "Cardiology",
    date: "2023-06-15",
    time: "11:30 AM",
    status: "Scheduled",
    notes: "Follow-up appointment"
  },
  {
    id: 3,
    patient: "Robert Wilson",
    doctor: "Dr. Emily Rodriguez",
    department: "Pediatrics",
    date: "2023-06-15",
    time: "2:00 PM",
    status: "Scheduled",
    notes: "Vaccination"
  },
  {
    id: 4,
    patient: "Lisa Johnson",
    doctor: "Dr. David Kim",
    department: "Dermatology",
    date: "2023-06-16",
    time: "3:30 PM",
    status: "Scheduled",
    notes: "Skin condition assessment"
  }
];

const pastAppointmentsData = [
  {
    id: 101,
    patient: "Michael Brown",
    doctor: "Dr. Sarah Johnson",
    department: "General Practice",
    date: "2023-06-10",
    time: "9:15 AM",
    status: "Completed",
    notes: "Blood pressure check"
  },
  {
    id: 102,
    patient: "Sarah Taylor",
    doctor: "Dr. Michael Chen",
    department: "Cardiology",
    date: "2023-06-09",
    time: "1:00 PM",
    status: "Completed",
    notes: "ECG test"
  },
  {
    id: 103,
    patient: "James Anderson",
    doctor: "Dr. Emily Rodriguez",
    department: "Pediatrics",
    date: "2023-06-08",
    time: "10:30 AM",
    status: "Cancelled",
    notes: "Child development assessment"
  }
];

const AdminAppointments = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState(appointmentsData);
  const [pastAppointments, setPastAppointments] = useState(pastAppointmentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [editAppointmentDialog, setEditAppointmentDialog] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState<any>(null);
  const [statusUpdateDialog, setStatusUpdateDialog] = useState(false);
  const [appointmentToUpdate, setAppointmentToUpdate] = useState<any>(null);
  const [newStatus, setNewStatus] = useState("");
  const [statusNote, setStatusNote] = useState("");
  
  // Filter appointments based on search term
  const filteredUpcoming = upcomingAppointments.filter(appointment => 
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredPast = pastAppointments.filter(appointment => 
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleEditAppointment = (appointment: any) => {
    setAppointmentToEdit({ ...appointment });
    setEditAppointmentDialog(true);
  };
  
  const saveAppointmentChanges = () => {
    if (!appointmentToEdit) return;
    
    const updatedAppointments = upcomingAppointments.map(appointment => {
      if (appointment.id === appointmentToEdit.id) {
        return appointmentToEdit;
      }
      return appointment;
    });
    
    setUpcomingAppointments(updatedAppointments);
    setEditAppointmentDialog(false);
    toast.success("Appointment updated successfully");
  };
  
  const handleStatusUpdate = (appointment: any) => {
    setAppointmentToUpdate(appointment);
    setNewStatus(appointment.status);
    setStatusNote("");
    setStatusUpdateDialog(true);
  };
  
  const saveStatusUpdate = () => {
    if (!appointmentToUpdate) return;
    
    if (newStatus === appointmentToUpdate.status) {
      toast.error("Please select a different status");
      return;
    }
    
    // Update status in upcoming appointments
    const isInUpcoming = upcomingAppointments.some(a => a.id === appointmentToUpdate.id);
    
    if (isInUpcoming) {
      if (newStatus === "Completed" || newStatus === "Cancelled") {
        // Move to past appointments
        const updatedUpcoming = upcomingAppointments.filter(a => a.id !== appointmentToUpdate.id);
        setPastAppointments([
          { ...appointmentToUpdate, status: newStatus, notes: statusNote || appointmentToUpdate.notes },
          ...pastAppointments
        ]);
        setUpcomingAppointments(updatedUpcoming);
      } else {
        // Update in upcoming
        const updatedUpcoming = upcomingAppointments.map(a => {
          if (a.id === appointmentToUpdate.id) {
            return { ...a, status: newStatus, notes: statusNote || a.notes };
          }
          return a;
        });
        setUpcomingAppointments(updatedUpcoming);
      }
    } else {
      // Update in past appointments
      const updatedPast = pastAppointments.map(a => {
        if (a.id === appointmentToUpdate.id) {
          return { ...a, status: newStatus, notes: statusNote || a.notes };
        }
        return a;
      });
      setPastAppointments(updatedPast);
    }
    
    setStatusUpdateDialog(false);
    toast.success(`Appointment status updated to ${newStatus}`);
  };
  
  return (
    <Shell
      header={<DashboardHeader />}
      sidebar={<AdminSidebar />}
      className="p-0"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Appointment Management</h1>
          <Button>Create New Appointment</Button>
        </div>
        
        <div className="mb-6">
          <div className="relative w-full max-w-sm">
            <Input
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>
                  View and manage all scheduled appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredUpcoming.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUpcoming.map(appointment => (
                          <TableRow key={appointment.id}>
                            <TableCell className="font-medium">{appointment.patient}</TableCell>
                            <TableCell>{appointment.doctor}</TableCell>
                            <TableCell>{appointment.department}</TableCell>
                            <TableCell>
                              {appointment.date} <br />
                              <span className="text-sm text-muted-foreground">{appointment.time}</span>
                            </TableCell>
                            <TableCell>
                              <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                appointment.status === 'Scheduled' ? 'bg-green-100 text-green-800' : 
                                appointment.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                                appointment.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {appointment.status}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">{appointment.notes}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleStatusUpdate(appointment)}
                                >
                                  Update Status
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleEditAppointment(appointment)}
                                >
                                  Edit
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No upcoming appointments found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="past">
            <Card>
              <CardHeader>
                <CardTitle>Past Appointments</CardTitle>
                <CardDescription>
                  History of completed and cancelled appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredPast.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Patient</TableHead>
                          <TableHead>Doctor</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPast.map(appointment => (
                          <TableRow key={appointment.id}>
                            <TableCell className="font-medium">{appointment.patient}</TableCell>
                            <TableCell>{appointment.doctor}</TableCell>
                            <TableCell>{appointment.department}</TableCell>
                            <TableCell>
                              {appointment.date} <br />
                              <span className="text-sm text-muted-foreground">{appointment.time}</span>
                            </TableCell>
                            <TableCell>
                              <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                appointment.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                                appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {appointment.status}
                              </div>
                            </TableCell>
                            <TableCell className="max-w-[200px] truncate">{appointment.notes}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleStatusUpdate(appointment)}
                              >
                                Update Status
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No past appointments found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Edit Appointment Dialog */}
        <Dialog open={editAppointmentDialog} onOpenChange={setEditAppointmentDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Appointment</DialogTitle>
              <DialogDescription>
                Update appointment details below
              </DialogDescription>
            </DialogHeader>
            {appointmentToEdit && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-date">Date</Label>
                    <Input
                      id="edit-date"
                      type="date"
                      value={appointmentToEdit.date}
                      onChange={(e) => setAppointmentToEdit({ ...appointmentToEdit, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-time">Time</Label>
                    <Input
                      id="edit-time"
                      type="time"
                      value={appointmentToEdit.time.replace(" AM", "").replace(" PM", "")}
                      onChange={(e) => {
                        const time = e.target.value;
                        const hours = parseInt(time.split(":")[0]);
                        const minutes = time.split(":")[1];
                        const period = hours >= 12 ? "PM" : "AM";
                        const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
                        const formattedTime = `${displayHours}:${minutes} ${period}`;
                        setAppointmentToEdit({ ...appointmentToEdit, time: formattedTime });
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-doctor">Doctor</Label>
                  <select
                    id="edit-doctor"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={appointmentToEdit.doctor}
                    onChange={(e) => setAppointmentToEdit({ ...appointmentToEdit, doctor: e.target.value })}
                  >
                    <option value="Dr. Sarah Johnson">Dr. Sarah Johnson - General Practice</option>
                    <option value="Dr. Michael Chen">Dr. Michael Chen - Cardiology</option>
                    <option value="Dr. Emily Rodriguez">Dr. Emily Rodriguez - Pediatrics</option>
                    <option value="Dr. David Kim">Dr. David Kim - Dermatology</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-notes">Notes</Label>
                  <textarea
                    id="edit-notes"
                    className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Add notes about the appointment"
                    value={appointmentToEdit.notes}
                    onChange={(e) => setAppointmentToEdit({ ...appointmentToEdit, notes: e.target.value })}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditAppointmentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={saveAppointmentChanges}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Status Update Dialog */}
        <Dialog open={statusUpdateDialog} onOpenChange={setStatusUpdateDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Appointment Status</DialogTitle>
              <DialogDescription>
                Change the status of this appointment
              </DialogDescription>
            </DialogHeader>
            {appointmentToUpdate && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="appointment-info">Appointment Info</Label>
                  <div id="appointment-info" className="text-sm p-3 bg-muted rounded-md">
                    <p><span className="font-medium">Patient:</span> {appointmentToUpdate.patient}</p>
                    <p><span className="font-medium">Doctor:</span> {appointmentToUpdate.doctor}</p>
                    <p><span className="font-medium">Date/Time:</span> {appointmentToUpdate.date} at {appointmentToUpdate.time}</p>
                    <p><span className="font-medium">Current Status:</span> {appointmentToUpdate.status}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-status">New Status</Label>
                  <select
                    id="new-status"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="No Show">No Show</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status-note">Add Note (Optional)</Label>
                  <textarea
                    id="status-note"
                    className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Add a note about this status change"
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setStatusUpdateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={saveStatusUpdate}>
                Update Status
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Shell>
  );
};

export default AdminAppointments;

import React, { useState } from "react";
import { Shell, DashboardHeader, AdminSidebar } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock data for doctors and their schedules
const doctorsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Practitioner",
    schedules: [
      { id: 101, day: "Monday", startTime: "09:00", endTime: "17:00", status: "Available" },
      { id: 102, day: "Tuesday", startTime: "09:00", endTime: "17:00", status: "Available" },
      { id: 103, day: "Wednesday", startTime: "09:00", endTime: "17:00", status: "Available" },
      { id: 104, day: "Thursday", startTime: "09:00", endTime: "17:00", status: "Available" },
      { id: 105, day: "Friday", startTime: "09:00", endTime: "13:00", status: "Available" }
    ]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiologist",
    schedules: [
      { id: 201, day: "Monday", startTime: "10:00", endTime: "18:00", status: "Available" },
      { id: 202, day: "Wednesday", startTime: "10:00", endTime: "18:00", status: "Available" },
      { id: 203, day: "Friday", startTime: "10:00", endTime: "18:00", status: "Available" }
    ]
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    schedules: [
      { id: 301, day: "Monday", startTime: "08:00", endTime: "16:00", status: "Available" },
      { id: 302, day: "Tuesday", startTime: "08:00", endTime: "16:00", status: "Available" },
      { id: 303, day: "Thursday", startTime: "08:00", endTime: "16:00", status: "Available" },
      { id: 304, day: "Friday", startTime: "08:00", endTime: "12:00", status: "Available" }
    ]
  },
  {
    id: 4,
    name: "Dr. David Kim",
    specialty: "Dermatologist",
    schedules: [
      { id: 401, day: "Tuesday", startTime: "09:00", endTime: "17:00", status: "Available" },
      { id: 402, day: "Thursday", startTime: "09:00", endTime: "17:00", status: "Available" }
    ]
  }
];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const AdminDoctorSchedules = () => {
  const [doctors, setDoctors] = useState(doctorsData);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [editScheduleDialog, setEditScheduleDialog] = useState(false);
  const [scheduleToEdit, setScheduleToEdit] = useState<any>(null);
  
  const selectDoctor = (doctor: any) => {
    setSelectedDoctor(doctor);
  };
  
  const handleEditSchedule = (schedule: any) => {
    setScheduleToEdit({ ...schedule });
    setEditScheduleDialog(true);
  };
  
  const saveScheduleChanges = () => {
    if (!scheduleToEdit || !selectedDoctor) return;
    
    const updatedDoctors = doctors.map(doctor => {
      if (doctor.id === selectedDoctor.id) {
        const updatedSchedules = doctor.schedules.map(schedule => {
          if (schedule.id === scheduleToEdit.id) {
            return scheduleToEdit;
          }
          return schedule;
        });
        return { ...doctor, schedules: updatedSchedules };
      }
      return doctor;
    });
    
    setDoctors(updatedDoctors);
    // Update the selected doctor reference
    const updatedDoctor = updatedDoctors.find(d => d.id === selectedDoctor.id);
    if (updatedDoctor) {
      setSelectedDoctor(updatedDoctor);
    }
    
    setEditScheduleDialog(false);
    toast.success("Schedule updated successfully");
  };
  
  const handleDeleteSchedule = (scheduleId: number) => {
    if (!selectedDoctor) return;
    
    const updatedDoctors = doctors.map(doctor => {
      if (doctor.id === selectedDoctor.id) {
        const updatedSchedules = doctor.schedules.filter(schedule => schedule.id !== scheduleId);
        return { ...doctor, schedules: updatedSchedules };
      }
      return doctor;
    });
    
    setDoctors(updatedDoctors);
    
    // Update the selected doctor reference
    const updatedDoctor = updatedDoctors.find(d => d.id === selectedDoctor.id);
    if (updatedDoctor) {
      setSelectedDoctor(updatedDoctor);
    }
    
    toast.success("Schedule removed successfully");
  };
  
  return (
    <Shell
      header={<DashboardHeader />}
      sidebar={<AdminSidebar />}
      className="p-0"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Doctor Schedules</h1>
          <Button>Add New Doctor</Button>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Doctors</CardTitle>
              <CardDescription>
                Select a doctor to view and manage their schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {doctors.map(doctor => (
                  <div 
                    key={doctor.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedDoctor?.id === doctor.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => selectDoctor(doctor)}
                  >
                    <h3 className="font-medium">{doctor.name}</h3>
                    <p className={`text-sm ${selectedDoctor?.id === doctor.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                      {doctor.specialty}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                {selectedDoctor ? `${selectedDoctor.name}'s Schedule` : 'Schedule Details'}
              </CardTitle>
              <CardDescription>
                {selectedDoctor 
                  ? `View working hours for ${selectedDoctor.name}. Users can book available slots.`
                  : 'Select a doctor to view their schedule'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDoctor ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">{selectedDoctor.specialty}</h3>
                  </div>
                  
                  {selectedDoctor.schedules.length > 0 ? (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Day</TableHead>
                            <TableHead>Start Time</TableHead>
                            <TableHead>End Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedDoctor.schedules.map((schedule: any) => (
                            <TableRow key={schedule.id}>
                              <TableCell>{schedule.day}</TableCell>
                              <TableCell>{schedule.startTime}</TableCell>
                              <TableCell>{schedule.endTime}</TableCell>
                              <TableCell>
                                <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  schedule.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {schedule.status}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleEditSchedule(schedule)}
                                  >
                                    Edit
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-destructive hover:bg-destructive/10"
                                    onClick={() => handleDeleteSchedule(schedule.id)}
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No schedules set for this doctor</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Select a doctor from the list to view their schedule</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Edit Schedule Dialog */}
        <Dialog open={editScheduleDialog} onOpenChange={setEditScheduleDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Schedule</DialogTitle>
              <DialogDescription>
                Update the working hours for {selectedDoctor?.name}
              </DialogDescription>
            </DialogHeader>
            {scheduleToEdit && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-day">Day</Label>
                  <select
                    id="edit-day"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={scheduleToEdit.day}
                    onChange={(e) => setScheduleToEdit({ ...scheduleToEdit, day: e.target.value })}
                  >
                    {weekdays.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-start-time">Start Time</Label>
                  <Input
                    id="edit-start-time"
                    type="time"
                    value={scheduleToEdit.startTime}
                    onChange={(e) => setScheduleToEdit({ ...scheduleToEdit, startTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-end-time">End Time</Label>
                  <Input
                    id="edit-end-time"
                    type="time"
                    value={scheduleToEdit.endTime}
                    onChange={(e) => setScheduleToEdit({ ...scheduleToEdit, endTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <select
                    id="edit-status"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={scheduleToEdit.status}
                    onChange={(e) => setScheduleToEdit({ ...scheduleToEdit, status: e.target.value })}
                  >
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditScheduleDialog(false)}>
                Cancel
              </Button>
              <Button onClick={saveScheduleChanges}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Shell>
  );
};

export default AdminDoctorSchedules;

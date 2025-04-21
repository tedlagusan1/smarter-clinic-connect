
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

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

export function useAppointmentState() {
  const [upcomingAppointments, setUpcomingAppointments] = useState(upcomingAppointmentsData);
  const [pastAppointments, setPastAppointments] = useState(pastAppointmentsData);

  const [cancelReason, setCancelReason] = useState("");
  const [appointmentToCancel, setAppointmentToCancel] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [rescheduleNote, setRescheduleNote] = useState("");
  const [appointmentToReschedule, setAppointmentToReschedule] = useState<number | null>(null);
  const [rescheduleDialogOpen, setRescheduleDialogOpen] = useState(false);

  // Cancel logic from Appointments.tsx
  const handleCancelAppointment = () => {
    if (!cancelReason) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide a reason for cancellation"
      });
      return;
    }
    const cancelledAppointment = upcomingAppointments.find(appointment => appointment.id === appointmentToCancel);
    if (cancelledAppointment) {
      setPastAppointments([
        { ...cancelledAppointment, status: "Cancelled" },
        ...pastAppointments
      ]);
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

  // Reschedule logic from Appointments.tsx
  const handleRescheduleRequest = () => {
    if (!rescheduleNote) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide a note for reschedule request"
      });
      return;
    }

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

  return {
    upcomingAppointments,
    pastAppointments,
    cancelReason,
    setCancelReason,
    appointmentToCancel,
    setAppointmentToCancel,
    dialogOpen,
    setDialogOpen,
    rescheduleNote,
    setRescheduleNote,
    appointmentToReschedule,
    setAppointmentToReschedule,
    rescheduleDialogOpen,
    setRescheduleDialogOpen,
    handleCancelAppointment,
    handleRescheduleRequest,
    openCancelDialog,
    openRescheduleDialog,
  };
}

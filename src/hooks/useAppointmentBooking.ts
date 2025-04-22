
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AppointmentBookingHookProps {
  specialty: string;
  doctorId: string;
  date: Date | undefined;
  time: string;
  reason: string;
  userId: string | undefined;
  selectedDoctorName: string | undefined;
  selectedDoctorSpecialty: string | undefined;
}

export const useAppointmentBooking = () => {
  const navigate = useNavigate();
  const [isBooking, setIsBooking] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const validateInputs = (
    specialty: string,
    doctorId: string,
    date: Date | undefined,
    time: string,
    reason: string,
    userId: string | undefined
  ) => {
    if (!specialty || !doctorId || !date || !time || !reason) {
      toast.error("Please fill out all fields");
      return false;
    }

    if (!userId) {
      toast.error("You must be logged in to book an appointment");
      navigate("/login");
      return false;
    }

    return true;
  };

  const bookAppointment = async ({
    specialty,
    doctorId,
    date,
    time,
    reason,
    userId,
    selectedDoctorName,
    selectedDoctorSpecialty,
  }: AppointmentBookingHookProps) => {
    setBookingError(null);
    
    if (!validateInputs(specialty, doctorId, date, time, reason, userId)) return;

    setIsBooking(true);

    try {
      console.log("Booking appointment with user ID:", userId);
      console.log("Appointment details:", {
        doctor: selectedDoctorName,
        specialty,
        date: date ? format(date, "yyyy-MM-dd") : "",
        time,
        reason
      });
      
      // Create a UUID for numeric IDs to ensure compatibility with Supabase
      // This is a workaround for testing with mock user IDs
      const formattedUserId = userId && /^\d+$/.test(userId) 
        ? `00000000-0000-0000-0000-${userId.padStart(12, '0')}` 
        : userId;
      
      const { data, error } = await supabase.from("appointments").insert({
        user_id: formattedUserId,
        doctor_name: selectedDoctorName || "",
        specialty,
        date: format(date!, "yyyy-MM-dd"),
        time,
        location: selectedDoctorSpecialty ? `${selectedDoctorSpecialty} Office` : "Clinic",
        status: "Confirmed",
      }).select();

      if (error) {
        console.error("Booking error:", error);
        setBookingError("Failed to book appointment. Please try again.");
        toast.error("Failed to book appointment. Please try again.");
        return false;
      }

      console.log("Appointment booked successfully:", data);
      toast.success("Appointment booked successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
      return true;
    } catch (err) {
      console.error("Unexpected booking error:", err);
      setBookingError("Unexpected error booking appointment");
      toast.error("Unexpected error booking appointment");
      return false;
    } finally {
      setIsBooking(false);
    }
  };

  return {
    isBooking,
    bookingError,
    bookAppointment,
  };
};

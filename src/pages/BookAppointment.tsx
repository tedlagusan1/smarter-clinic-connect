
import React, { useState, useEffect } from "react";
import { Shell, DashboardHeader, DashboardSidebar } from "@/components/layout/Shell";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { doctors, timeSlots } from "@/components/appointments/doctors";
import { DoctorSelection } from "@/components/appointments/DoctorSelection";
import { AppointmentDatePicker } from "@/components/appointments/AppointmentDatePicker";
import { TimeSlotSelection } from "@/components/appointments/TimeSlotSelection";
import { AppointmentConfirmation } from "@/components/appointments/AppointmentConfirmation";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [specialty, setSpecialty] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [step, setStep] = useState(1);
  const [isBooking, setIsBooking] = useState(false);
  const [bookedAppointments, setBookedAppointments] = useState<any[]>([]);
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAppointments() {
      if (!doctorId || !date) return;
      const formattedDate = format(date, "yyyy-MM-dd");
      const { data } = await supabase
        .from("appointments")
        .select("doctor_name, date, time")
        .eq("doctor_name", selectedDoctor?.name || "")
        .eq("date", formattedDate);
      setBookedAppointments(data || []);
    }
    fetchAppointments();
  }, [doctorId, date]);

  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];
  const filteredDoctors = specialty
    ? doctors.filter(doctor => doctor.specialty === specialty)
    : [];
  const selectedDoctor = doctors.find(doctor => doctor.id === parseInt(doctorId));

  const getDayOfWeek = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const isDateAvailable = (date: Date) => {
    if (!selectedDoctor) return false;
    const dayOfWeek = getDayOfWeek(date);
    return selectedDoctor.availableDays.includes(dayOfWeek);
  };

  const isTimeSlotBooked = (time: string) => {
    if (!date || !doctorId) return false;
    const formattedDate = format(date, "yyyy-MM-dd");
    return bookedAppointments.some(
      appointment => 
        appointment.doctor_name === selectedDoctor?.name && 
        appointment.date === formattedDate && 
        appointment.time === time
    );
  };

  const getAvailableTimeSlots = () => {
    return timeSlots.filter(slot => !isTimeSlotBooked(slot));
  };

  const validateInputs = () => {
    if (!specialty || !doctorId || !date || !time || !reason) {
      toast.error("Please fill out all fields");
      return false;
    }

    if (isTimeSlotBooked(time)) {
      toast.error("This time slot is no longer available. Please choose another time.");
      return false;
    }

    if (!user) {
      toast.error("You must be logged in to book an appointment");
      navigate("/login");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    setBookingError(null);
    
    if (!validateInputs()) return;

    setIsBooking(true);

    try {
      // Ensure user.id is treated as a string
      const userId = user?.id?.toString();
      console.log("Booking appointment with user ID:", userId);
      console.log("Appointment details:", {
        doctor: selectedDoctor?.name,
        specialty,
        date: date ? format(date, "yyyy-MM-dd") : "",
        time,
        reason
      });
      
      const { data, error } = await supabase.from("appointments").insert({
        user_id: userId,
        doctor_name: selectedDoctor?.name || "",
        specialty,
        date: format(date!, "yyyy-MM-dd"),
        time,
        location: selectedDoctor ? `${selectedDoctor.specialty} Office` : "Clinic",
        status: "Confirmed",
      }).select();

      if (error) {
        console.error("Booking error:", error);
        setBookingError("Failed to book appointment. Please try again.");
        toast.error("Failed to book appointment. Please try again.");
        return;
      }

      console.log("Appointment booked successfully:", data);
      toast.success("Appointment booked successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Unexpected booking error:", err);
      setBookingError("Unexpected error booking appointment");
      toast.error("Unexpected error booking appointment");
    } finally {
      setIsBooking(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!specialty || !doctorId)) {
      toast.error("Please select a specialty and doctor");
      return;
    }
    if (step === 2 && (!date || !time)) {
      toast.error("Please select a date and time");
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Shell
      header={<DashboardHeader />}
      sidebar={<DashboardSidebar />}
      className="p-0"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-4">
                {[1, 2, 3].map((stepNumber) => (
                  <React.Fragment key={stepNumber}>
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        step >= stepNumber ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div
                        className={`w-16 h-1 ${
                          step > stepNumber ? 'bg-primary' : 'bg-muted'
                        }`}
                      ></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className={step >= 1 ? 'text-primary font-medium' : 'text-muted-foreground'}>
                Select Doctor
              </span>
              <span className={step >= 2 ? 'text-primary font-medium' : 'text-muted-foreground'}>
                Choose Date & Time
              </span>
              <span className={step >= 3 ? 'text-primary font-medium' : 'text-muted-foreground'}>
                Confirm Details
              </span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                {step === 1 && "Select a Doctor"}
                {step === 2 && "Choose Date & Time"}
                {step === 3 && "Confirm Appointment Details"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Select a medical specialty and choose a doctor"}
                {step === 2 && "Select an available date and time for your appointment"}
                {step === 3 && "Review and confirm your appointment details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <DoctorSelection
                  specialty={specialty}
                  doctorId={doctorId}
                  specialties={specialties}
                  filteredDoctors={filteredDoctors}
                  selectedDoctor={selectedDoctor}
                  onSpecialtyChange={setSpecialty}
                  onDoctorChange={setDoctorId}
                />
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <AppointmentDatePicker
                    date={date}
                    onDateSelect={setDate}
                    isDateAvailable={isDateAvailable}
                  />
                  {date && (
                    <TimeSlotSelection
                      time={time}
                      onTimeSelect={setTime}
                      availableTimeSlots={getAvailableTimeSlots()}
                    />
                  )}
                </div>
              )}

              {step === 3 && (
                <AppointmentConfirmation
                  selectedDoctor={selectedDoctor}
                  date={date}
                  time={time}
                  reason={reason}
                  onReasonChange={setReason}
                />
              )}
              
              {bookingError && step === 3 && (
                <div className="mt-4 flex items-center text-sm text-destructive">
                  <span className="mr-2">⚠️</span>
                  {bookingError}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
              {step > 1 ? (
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <Button onClick={nextStep}>
                  Continue
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={isBooking}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isBooking ? "Booking..." : "Confirm Booking"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </Shell>
  );
};

export default BookAppointment;

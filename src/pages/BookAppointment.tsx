
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
import { useAuth } from "@/contexts/AuthContext";
import { doctors, timeSlots } from "@/components/appointments/doctors";
import { DoctorSelection } from "@/components/appointments/DoctorSelection";
import { AppointmentDatePicker } from "@/components/appointments/AppointmentDatePicker";
import { TimeSlotSelection } from "@/components/appointments/TimeSlotSelection";
import { AppointmentConfirmation } from "@/components/appointments/AppointmentConfirmation";
import { StepIndicator } from "@/components/appointments/StepIndicator";
import { useAppointmentBooking } from "@/hooks/useAppointmentBooking";
import { supabase } from "@/integrations/supabase/client";

const STEPS = [
  { title: "Select Doctor", description: "Select a medical specialty and choose a doctor" },
  { title: "Choose Date & Time", description: "Select an available date and time for your appointment" },
  { title: "Confirm Details", description: "Review and confirm your appointment details" },
];

const BookAppointment = () => {
  const { user } = useAuth();
  const [specialty, setSpecialty] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [step, setStep] = useState(1);
  const [bookedAppointments, setBookedAppointments] = useState<any[]>([]);

  const { isBooking, bookingError, bookAppointment } = useAppointmentBooking();

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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    await bookAppointment({
      specialty,
      doctorId,
      date,
      time,
      reason,
      userId: user?.id?.toString(),
      selectedDoctorName: selectedDoctor?.name,
      selectedDoctorSpecialty: selectedDoctor?.specialty,
    });
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

          <StepIndicator currentStep={step} steps={STEPS} />

          <Card>
            <CardHeader>
              <CardTitle>
                {STEPS[step - 1].title}
              </CardTitle>
              <CardDescription>
                {STEPS[step - 1].description}
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

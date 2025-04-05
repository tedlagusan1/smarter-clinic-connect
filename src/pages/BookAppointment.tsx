
import React, { useState, useEffect } from "react";
import { Shell, DashboardHeader, DashboardSidebar } from "@/components/layout/Shell";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Mock data for doctors
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Practitioner",
    availableDays: ["Monday", "Tuesday", "Wednesday", "Friday"],
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Cardiologist",
    availableDays: ["Monday", "Thursday"],
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    availableDays: ["Tuesday", "Wednesday", "Thursday"],
  },
  {
    id: 4,
    name: "Dr. David Kim",
    specialty: "Dermatologist",
    availableDays: ["Monday", "Friday"],
  },
  {
    id: 5,
    name: "Dr. Lisa Patel",
    specialty: "Neurologist",
    availableDays: ["Wednesday", "Thursday", "Friday"],
  },
];

// Mock data for time slots
const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

// Type for booked appointments
interface BookedAppointment {
  doctorId: number;
  date: string;
  time: string;
}

const BookAppointment = () => {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [step, setStep] = useState(1);
  const [bookedAppointments, setBookedAppointments] = useState<BookedAppointment[]>([]);
  
  // Load booked appointments from localStorage on component mount
  useEffect(() => {
    const storedAppointments = localStorage.getItem("bookedAppointments");
    if (storedAppointments) {
      setBookedAppointments(JSON.parse(storedAppointments));
    }
  }, []);
  
  // List of available specialties from our doctor data
  const specialties = [...new Set(doctors.map(doctor => doctor.specialty))];
  
  // Filter doctors by selected specialty
  const filteredDoctors = specialty
    ? doctors.filter(doctor => doctor.specialty === specialty)
    : [];
  
  // Get the selected doctor
  const selectedDoctor = doctors.find(doctor => doctor.id === parseInt(doctorId));
  
  // Format the date to get the day of week
  const getDayOfWeek = (date: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };
  
  // Check if the selected date is available for the selected doctor
  const isDateAvailable = (date: Date) => {
    if (!selectedDoctor) return false;
    const dayOfWeek = getDayOfWeek(date);
    return selectedDoctor.availableDays.includes(dayOfWeek);
  };
  
  // Check if a time slot is already booked for selected doctor and date
  const isTimeSlotBooked = (time: string) => {
    if (!date || !doctorId) return false;
    
    const formattedDate = format(date, "yyyy-MM-dd");
    return bookedAppointments.some(
      appointment => 
        appointment.doctorId === parseInt(doctorId) && 
        appointment.date === formattedDate && 
        appointment.time === time
    );
  };
  
  // Get available time slots for selected doctor and date
  const getAvailableTimeSlots = () => {
    return timeSlots.filter(slot => !isTimeSlotBooked(slot));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!specialty || !doctorId || !date || !time || !reason) {
      toast.error("Please fill out all fields");
      return;
    }
    
    const formattedDate = format(date, "yyyy-MM-dd");
    
    // Check if appointment is already booked
    if (isTimeSlotBooked(time)) {
      toast.error("This time slot is no longer available. Please choose another time.");
      return;
    }
    
    // Add the new appointment to booked appointments
    const newBookedAppointments = [
      ...bookedAppointments,
      {
        doctorId: parseInt(doctorId),
        date: formattedDate,
        time
      }
    ];
    
    // Save to localStorage
    localStorage.setItem("bookedAppointments", JSON.stringify(newBookedAppointments));
    setBookedAppointments(newBookedAppointments);
    
    // Here we would normally submit the appointment data to a server
    toast.success("Appointment booked successfully!");
    console.log({
      specialty,
      doctorId,
      doctorName: selectedDoctor?.name,
      date: formattedDate,
      time,
      reason
    });
    
    // Navigate to dashboard after booking
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
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
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  1
                </div>
                <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  2
                </div>
                <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                  3
                </div>
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
          
          <Card className="glass-card">
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
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Medical Specialty</Label>
                      <Select
                        value={specialty}
                        onValueChange={setSpecialty}
                      >
                        <SelectTrigger id="specialty">
                          <SelectValue placeholder="Select a specialty" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialties.map((spec) => (
                            <SelectItem key={spec} value={spec}>
                              {spec}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {specialty && (
                      <div className="space-y-2">
                        <Label htmlFor="doctor">Select Doctor</Label>
                        <Select
                          value={doctorId}
                          onValueChange={setDoctorId}
                        >
                          <SelectTrigger id="doctor">
                            <SelectValue placeholder="Select a doctor" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredDoctors.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.id.toString()}>
                                {doctor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        {doctorId && (
                          <div className="mt-4 p-4 bg-accent rounded-md">
                            <h3 className="font-medium mb-2">{selectedDoctor?.name}</h3>
                            <p className="text-sm mb-2">{selectedDoctor?.specialty}</p>
                            <div className="text-xs text-muted-foreground">
                              <p>Available on:</p>
                              <p className="font-medium">{selectedDoctor?.availableDays.join(", ")}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
                
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(newDate) => {
                              setDate(newDate);
                              setTime(""); // Clear time when date changes
                            }}
                            disabled={(date) => {
                              const day = date.getDay();
                              // Disable weekends and dates in the past
                              const isWeekend = day === 0 || day === 6;
                              const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
                              // Also disable dates not available for the selected doctor
                              const isAvailable = isDateAvailable(date);
                              return isPast || isWeekend || !isAvailable;
                            }}
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    {date && (
                      <div className="space-y-2">
                        <Label htmlFor="time">Select Time</Label>
                        <Select
                          value={time}
                          onValueChange={setTime}
                        >
                          <SelectTrigger id="time">
                            <SelectValue placeholder="Select a time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableTimeSlots().length > 0 ? (
                              getAvailableTimeSlots().map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                  {slot}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="" disabled>
                                No available time slots for this date
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        
                        {getAvailableTimeSlots().length === 0 && (
                          <p className="text-sm text-yellow-600 mt-2">
                            All time slots for this date are booked. Please select another date.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
                
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Input
                        id="reason"
                        placeholder="Briefly describe your symptoms or reason for visit"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                    </div>
                    
                    <div className="mt-6 p-4 bg-accent rounded-md space-y-3">
                      <h3 className="font-medium text-lg">Appointment Summary</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <p className="text-muted-foreground">Doctor:</p>
                        <p className="font-medium">{selectedDoctor?.name}</p>
                        
                        <p className="text-muted-foreground">Specialty:</p>
                        <p>{selectedDoctor?.specialty}</p>
                        
                        <p className="text-muted-foreground">Date:</p>
                        <p>{date ? format(date, "PPPP") : ""}</p>
                        
                        <p className="text-muted-foreground">Time:</p>
                        <p>{time}</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
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
                <Button onClick={handleSubmit}>
                  Confirm Booking
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

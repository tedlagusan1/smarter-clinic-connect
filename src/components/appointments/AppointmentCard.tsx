
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Appointment {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
  location: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  isPast?: boolean;
  onReschedule?: (id: number) => void;
  onCancel?: (id: number) => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  isPast = false,
  onReschedule,
  onCancel,
}) => {
  const statusColor =
    appointment.status === "Confirmed"
      ? "bg-green-500"
      : appointment.status === "Pending"
      ? "bg-yellow-500"
      : appointment.status === "Completed"
      ? "bg-green-500"
      : appointment.status === "Cancelled"
      ? "bg-red-500"
      : "bg-gray-500";

  const statusPill =
    appointment.status === "Confirmed"
      ? "bg-green-100 text-green-800"
      : appointment.status === "Pending"
      ? "bg-yellow-100 text-yellow-800"
      : appointment.status === "Completed"
      ? "bg-green-100 text-green-800"
      : appointment.status === "Cancelled"
      ? "bg-red-100 text-red-800"
      : "bg-gray-100 text-gray-800";

  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow`}>
      <div className={`h-2 ${statusColor}`}></div>
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
              ${statusPill}
            `}>
              {appointment.status}
            </span>
            {!isPast && (
              <div className="flex gap-2 mt-2">
                {onReschedule && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onReschedule(appointment.id)}
                  >
                    Reschedule
                  </Button>
                )}
                {onCancel && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => onCancel(appointment.id)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            )}
            {isPast && appointment.status === "Completed" && (
              <Button variant="outline" size="sm" className="mt-2">
                View Summary
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;

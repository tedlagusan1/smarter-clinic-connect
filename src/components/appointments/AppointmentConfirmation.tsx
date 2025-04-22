
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  availableDays: string[];
}

interface AppointmentConfirmationProps {
  selectedDoctor: Doctor | undefined;
  date: Date | undefined;
  time: string;
  reason: string;
  onReasonChange: (reason: string) => void;
}

export const AppointmentConfirmation = ({
  selectedDoctor,
  date,
  time,
  reason,
  onReasonChange,
}: AppointmentConfirmationProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="reason">Reason for Visit</Label>
        <Input
          id="reason"
          placeholder="Briefly describe your symptoms or reason for visit"
          value={reason}
          onChange={(e) => onReasonChange(e.target.value)}
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
  );
};

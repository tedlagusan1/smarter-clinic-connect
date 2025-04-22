
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  availableDays: string[];
}

interface DoctorSelectionProps {
  specialty: string;
  doctorId: string;
  specialties: string[];
  filteredDoctors: Doctor[];
  selectedDoctor: Doctor | undefined;
  onSpecialtyChange: (value: string) => void;
  onDoctorChange: (value: string) => void;
}

export const DoctorSelection = ({
  specialty,
  doctorId,
  specialties,
  filteredDoctors,
  selectedDoctor,
  onSpecialtyChange,
  onDoctorChange,
}: DoctorSelectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="specialty">Medical Specialty</Label>
        <Select value={specialty} onValueChange={onSpecialtyChange}>
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
          <Select value={doctorId} onValueChange={onDoctorChange}>
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

          {selectedDoctor && (
            <div className="mt-4 p-4 bg-accent rounded-md">
              <h3 className="font-medium mb-2">{selectedDoctor.name}</h3>
              <p className="text-sm mb-2">{selectedDoctor.specialty}</p>
              <div className="text-xs text-muted-foreground">
                <p>Available on:</p>
                <p className="font-medium">{selectedDoctor.availableDays.join(", ")}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

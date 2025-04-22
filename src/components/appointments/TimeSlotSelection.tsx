
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSlotSelectionProps {
  time: string;
  onTimeSelect: (time: string) => void;
  availableTimeSlots: string[];
}

export const TimeSlotSelection = ({
  time,
  onTimeSelect,
  availableTimeSlots,
}: TimeSlotSelectionProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="time">Select Time</Label>
      <Select value={time} onValueChange={onTimeSelect}>
        <SelectTrigger id="time">
          <SelectValue placeholder="Select a time slot" />
        </SelectTrigger>
        <SelectContent>
          {availableTimeSlots.length > 0 ? (
            availableTimeSlots.map((slot) => (
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
      {availableTimeSlots.length === 0 && (
        <p className="text-sm text-yellow-600 mt-2">
          All time slots for this date are booked. Please select another date.
        </p>
      )}
    </div>
  );
};


import React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface AppointmentDatePickerProps {
  date: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  isDateAvailable: (date: Date) => boolean;
}

export const AppointmentDatePicker = ({
  date,
  onDateSelect,
  isDateAvailable,
}: AppointmentDatePickerProps) => {
  return (
    <div className="space-y-2">
      <Label>Select Date</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
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
            onSelect={onDateSelect}
            disabled={(date) => {
              const day = date.getDay();
              const isWeekend = day === 0 || day === 6;
              const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
              const available = isDateAvailable(date);
              return isPast || isWeekend || !available;
            }}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

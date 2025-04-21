
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RescheduleDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  note: string;
  setNote: (val: string) => void;
  onConfirm: () => void;
}

const RescheduleDialog: React.FC<RescheduleDialogProps> = ({
  open,
  onOpenChange,
  note,
  setNote,
  onConfirm,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Reschedule Appointment</DialogTitle>
        <DialogDescription>
          Please provide a note for your reschedule request. The clinic will contact you to arrange a new time.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="rescheduleNote">Reschedule Note</Label>
          <Input
            id="rescheduleNote"
            placeholder="Let us know your preferred dates/times"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>
          Send Request
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default RescheduleDialog;

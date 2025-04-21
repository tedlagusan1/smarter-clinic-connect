
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

interface CancelDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  reason: string;
  setReason: (val: string) => void;
  onConfirm: () => void;
}

const CancelDialog: React.FC<CancelDialogProps> = ({
  open,
  onOpenChange,
  reason,
  setReason,
  onConfirm,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Cancel Appointment</DialogTitle>
        <DialogDescription>
          Are you sure you want to cancel this appointment? Please provide a reason.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="reason">Reason for Cancellation</Label>
          <Input
            id="reason"
            placeholder="Please provide a reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Back
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          Confirm Cancellation
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default CancelDialog;

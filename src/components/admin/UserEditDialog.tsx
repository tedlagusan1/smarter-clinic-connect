
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { UserDisplay } from "./UserTable";

interface UserEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userToEdit: UserDisplay | null;
  setUserToEdit: (user: UserDisplay | null) => void;
  onSave: () => void;
}

const UserEditDialog = ({
  open,
  onOpenChange,
  userToEdit,
  setUserToEdit,
  onSave,
}: UserEditDialogProps) => {
  if (!userToEdit) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Information</DialogTitle>
          <DialogDescription>
            Update the user's information in the form below
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="edit-name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="edit-name"
              value={userToEdit.name}
              onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="edit-email"
              value={userToEdit.email}
              onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-phone" className="text-sm font-medium">
              Phone
            </label>
            <Input
              id="edit-phone"
              value={userToEdit.phone}
              onChange={(e) => setUserToEdit({ ...userToEdit, phone: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;

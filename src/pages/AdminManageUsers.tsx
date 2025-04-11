
import React, { useState, useEffect } from "react";
import { Shell, DashboardHeader, AdminSidebar } from "@/components/layout/Shell";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

import UserTable, { UserDisplay } from "@/components/admin/UserTable";
import UserEditDialog from "@/components/admin/UserEditDialog";
import UserDeleteDialog from "@/components/admin/UserDeleteDialog";

const AdminManageUsers = () => {
  const { getRegisteredUsers } = useAuth();
  const [users, setUsers] = useState<UserDisplay[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userToEdit, setUserToEdit] = useState<UserDisplay | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | number | null>(null);
  
  useEffect(() => {
    const registeredUsers = getRegisteredUsers();
    if (registeredUsers) {
      const transformedUsers: UserDisplay[] = registeredUsers.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: "+1 (555) 000-0000",
        status: "Active",
        registeredDate: new Date().toISOString().split('T')[0],
        appointmentsCount: 0
      }));
      setUsers(transformedUsers);
    }
  }, [getRegisteredUsers]);
  
  const handleStatusToggle = (userId: string | number) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        const newStatus = user.status === "Active" ? "Inactive" : "Active";
        return { ...user, status: newStatus };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    toast.success("User status updated successfully");
  };
  
  const handleEditUser = (user: UserDisplay) => {
    setUserToEdit({ ...user });
    setEditDialogOpen(true);
  };
  
  const saveUserChanges = () => {
    if (!userToEdit) return;
    
    const updatedUsers = users.map(user => {
      if (user.id === userToEdit.id) {
        return userToEdit;
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setEditDialogOpen(false);
    toast.success("User information updated successfully");
  };
  
  const handleDeleteUser = (userId: string | number) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };
  
  const confirmDeleteUser = () => {
    if (userToDelete === null) return;
    
    const updatedUsers = users.filter(user => user.id !== userToDelete);
    setUsers(updatedUsers);
    setDeleteDialogOpen(false);
    toast.success("User deleted successfully");
  };
  
  return (
    <Shell
      header={<DashboardHeader />}
      sidebar={<AdminSidebar />}
      className="p-0"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Manage Users</h1>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle>Patient Accounts</CardTitle>
            <CardDescription>
              View and manage all registered patient accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserTable 
              users={users}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onStatusToggle={handleStatusToggle}
              onEditUser={handleEditUser}
              onDeleteUser={handleDeleteUser}
            />
          </CardContent>
        </Card>
        
        <UserEditDialog 
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          userToEdit={userToEdit}
          setUserToEdit={setUserToEdit}
          onSave={saveUserChanges}
        />
        
        <UserDeleteDialog 
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          onConfirmDelete={confirmDeleteUser}
        />
      </div>
    </Shell>
  );
};

export default AdminManageUsers;

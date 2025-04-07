
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Shell, DashboardHeader, DashboardSidebar } from "@/components/layout/Shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, UserRound, Mail, Key, Save, Settings as SettingsIcon } from "lucide-react";

const Profile = () => {
  const { user, isAdmin, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Password validation
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your new password and confirmation match.",
        variant: "destructive",
      });
      return;
    }
    
    // Update profile (in a real app, you would also handle password change)
    updateProfile({
      name: formData.name,
      email: formData.email
    });
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    
    setIsEditing(false);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };
  
  return (
    <Shell header={<DashboardHeader />} sidebar={<DashboardSidebar />}>
      <div className="container max-w-6xl mx-auto py-6 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <div className="flex space-x-3">
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
            <Button variant="outline" onClick={() => navigate("/dashboard/settings")}>
              <SettingsIcon className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader className="flex flex-col items-center justify-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="" alt={user?.name} />
                <AvatarFallback className="text-lg">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{user?.name}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
              <CardDescription className="mt-1 font-semibold">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {isAdmin ? "Admin" : "User"}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <UserRound className="h-5 w-5 text-muted-foreground" />
                  <span>Account ID: {user?.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>{user?.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal information and account settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <>
                    <div className="pt-4 border-t">
                      <h3 className="font-medium mb-4">Change Password</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <div className="flex items-center">
                            <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="currentPassword"
                              name="currentPassword"
                              type="password"
                              placeholder="Your current password"
                              value={formData.currentPassword}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="flex items-center">
                            <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="newPassword"
                              name="newPassword"
                              type="password"
                              placeholder="New password"
                              value={formData.newPassword}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <div className="flex items-center">
                            <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="confirmPassword"
                              name="confirmPassword"
                              type="password"
                              placeholder="Confirm new password"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              
              {isEditing && (
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </CardFooter>
              )}
            </form>
          </Card>
        </div>
      </div>
    </Shell>
  );
};

export default Profile;

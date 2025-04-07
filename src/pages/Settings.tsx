
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Shell, DashboardHeader, DashboardSidebar } from "@/components/layout/Shell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  BellRing, 
  Moon, 
  Sun, 
  Lock, 
  Bell, 
  Languages, 
  Trash2, 
  LogOut,
  Save,
  User
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Settings = () => {
  const { user, logout, updateSettings } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      appointment: true,
      reminders: true,
    },
    appearance: {
      darkMode: false,
      compactView: false,
    },
    privacy: {
      twoFactorAuth: false,
      dataSharing: true,
    },
    language: "English",
    feedbackMessage: "",
  });
  
  // Load user settings when component mounts
  useEffect(() => {
    if (user?.settings) {
      setSettings(prevSettings => ({
        ...prevSettings,
        ...user.settings,
        feedbackMessage: "", // Always reset feedback message
      }));
    }
  }, [user]);
  
  const handleChange = (category: string, setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSettings(prev => ({
      ...prev,
      feedbackMessage: e.target.value
    }));
  };
  
  const handleSaveSettings = () => {
    // Save settings to AuthContext (excluding feedback message)
    const { feedbackMessage, ...settingsToSave } = settings;
    updateSettings(settingsToSave);
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };
  
  const handleDeleteAccount = () => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast({
        title: "Account deletion initiated",
        description: "Your account deletion request has been submitted.",
        variant: "destructive",
      });
      // In a real app, you would call an API to delete the account
      // Then log the user out
      setTimeout(() => {
        logout();
      }, 2000);
    }
  };
  
  return (
    <Shell header={<DashboardHeader />} sidebar={<DashboardSidebar />}>
      <div className="container max-w-6xl mx-auto py-6 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <div className="flex space-x-3">
            <Button onClick={handleSaveSettings}>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
            <Button variant="outline" onClick={() => navigate("/dashboard/profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>
                Manage how you receive notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="font-medium">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch 
                  id="email-notifications"
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) => handleChange('notifications', 'email', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="appointment-notifications" className="font-medium">Appointment Updates</Label>
                  <p className="text-sm text-muted-foreground">Get notified about changes to your appointments</p>
                </div>
                <Switch 
                  id="appointment-notifications"
                  checked={settings.notifications.appointment}
                  onCheckedChange={(checked) => handleChange('notifications', 'appointment', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="reminders" className="font-medium">Reminders</Label>
                  <p className="text-sm text-muted-foreground">Receive appointment reminders</p>
                </div>
                <Switch 
                  id="reminders"
                  checked={settings.notifications.reminders}
                  onCheckedChange={(checked) => handleChange('notifications', 'reminders', checked)}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Appearance Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Sun className="h-5 w-5 text-primary" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>
                Customize how the application looks and behaves
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <Switch 
                  id="dark-mode"
                  checked={settings.appearance.darkMode}
                  onCheckedChange={(checked) => handleChange('appearance', 'darkMode', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compact-view" className="font-medium">Compact View</Label>
                  <p className="text-sm text-muted-foreground">Display more information with less spacing</p>
                </div>
                <Switch 
                  id="compact-view"
                  checked={settings.appearance.compactView}
                  onCheckedChange={(checked) => handleChange('appearance', 'compactView', checked)}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Privacy & Security Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-primary" />
                <CardTitle>Privacy & Security</CardTitle>
              </div>
              <CardDescription>
                Manage your account security and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor" className="font-medium">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch 
                  id="two-factor"
                  checked={settings.privacy.twoFactorAuth}
                  onCheckedChange={(checked) => handleChange('privacy', 'twoFactorAuth', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="data-sharing" className="font-medium">Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">Allow anonymous usage data to improve our services</p>
                </div>
                <Switch 
                  id="data-sharing"
                  checked={settings.privacy.dataSharing}
                  onCheckedChange={(checked) => handleChange('privacy', 'dataSharing', checked)}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Feedback Section */}
          <Card>
            <CardHeader>
              <CardTitle>Send Feedback</CardTitle>
              <CardDescription>
                Help us improve by sharing your thoughts and suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Your feedback helps us improve our service..."
                className="min-h-[120px]"
                value={settings.feedbackMessage}
                onChange={handleTextChange}
              />
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  if (settings.feedbackMessage.trim()) {
                    toast({
                      title: "Feedback submitted",
                      description: "Thank you for your feedback!",
                    });
                    setSettings(prev => ({ ...prev, feedbackMessage: "" }));
                  }
                }}
                disabled={!settings.feedbackMessage.trim()}
              >
                Submit Feedback
              </Button>
            </CardFooter>
          </Card>
          
          {/* Account Actions Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                These actions are permanent and cannot be undone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Sign Out</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign out from your current session
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => logout()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Shell>
  );
};

export default Settings;

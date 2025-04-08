
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shell, DashboardHeader, AdminSidebar } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Bell,
  Eye,
  Settings2,
  Shield,
  Database,
  FileEdit,
  LogOut,
  Save,
  User,
  Lock,
  Cog,
  Users
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Define the admin settings state type
type AdminSettingsState = {
  notifications: {
    systemAlerts: boolean;
    userRegistrations: boolean;
    appointmentAlerts: boolean;
  };
  system: {
    maintenanceMode: boolean;
    debugMode: boolean;
  };
  security: {
    enhancedSecurity: boolean;
    auditLogging: boolean;
  };
  display: {
    showPatientDetails: boolean;
    compactViewAdmin: boolean;
  };
  feedbackMessage: string;
  systemMessage: string;
};

const AdminSettings = () => {
  const { user, logout, updateSettings } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Initialize admin settings state
  const [settings, setSettings] = useState<AdminSettingsState>({
    notifications: {
      systemAlerts: true,
      userRegistrations: true,
      appointmentAlerts: true,
    },
    system: {
      maintenanceMode: false,
      debugMode: false,
    },
    security: {
      enhancedSecurity: true,
      auditLogging: true,
    },
    display: {
      showPatientDetails: true,
      compactViewAdmin: false,
    },
    feedbackMessage: "",
    systemMessage: "",
  });
  
  useEffect(() => {
    if (user?.settings) {
      // Load settings from user context
      const userSettings = user.settings;
      
      // Map user settings to admin settings
      setSettings(prevSettings => ({
        ...prevSettings,
        notifications: {
          ...prevSettings.notifications,
          systemAlerts: userSettings.notifications?.email || true,
          userRegistrations: userSettings.notifications?.appointment || true,
          appointmentAlerts: userSettings.notifications?.reminders || true,
        },
        system: {
          ...prevSettings.system,
        },
        security: {
          ...prevSettings.security,
        },
        display: {
          ...prevSettings.display,
          compactViewAdmin: userSettings.appearance?.compactView || false,
        },
      }));
    }
  }, [user]);
  
  // Handle changes to notification settings
  const handleNotificationChange = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [setting]: value
      }
    }));
  };
  
  // Handle changes to system settings
  const handleSystemChange = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      system: {
        ...prev.system,
        [setting]: value
      }
    }));
    
    if (setting === 'maintenanceMode') {
      toast({
        title: value ? "Maintenance Mode Enabled" : "Maintenance Mode Disabled",
        description: value 
          ? "The system is now in maintenance mode. Only admins can access it." 
          : "Maintenance mode has been disabled. All users can now access the system.",
      });
    }
  };
  
  // Handle changes to security settings
  const handleSecurityChange = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [setting]: value
      }
    }));
  };
  
  // Handle changes to display settings
  const handleDisplayChange = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      display: {
        ...prev.display,
        [setting]: value
      }
    }));
  };
  
  // Handle text area changes
  const handleTextChange = (field: 'feedbackMessage' | 'systemMessage', value: string) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Save all settings
  const handleSaveSettings = () => {
    // Map admin settings back to user settings format for storage
    const userSettingsUpdate = {
      notifications: {
        email: settings.notifications.systemAlerts,
        appointment: settings.notifications.userRegistrations,
        reminders: settings.notifications.appointmentAlerts,
      },
      appearance: {
        darkMode: user?.settings?.appearance?.darkMode || false,
        compactView: settings.display.compactViewAdmin,
      },
      privacy: {
        twoFactorAuth: settings.security.enhancedSecurity,
        dataSharing: user?.settings?.privacy?.dataSharing || false,
      },
      language: user?.settings?.language || "English",
    };
    
    // Update settings through context
    updateSettings(userSettingsUpdate);
    
    // Show success message
    toast({
      title: "Admin Settings Saved",
      description: "Your admin preferences have been updated successfully."
    });
    
    // If system message is set, broadcast it
    if (settings.systemMessage.trim()) {
      toast({
        title: "System Message Updated",
        description: "Your system message has been broadcast to all users.",
      });
      setSettings(prev => ({ ...prev, systemMessage: "" }));
    }
  };
  
  return (
    <Shell header={<DashboardHeader />} sidebar={<AdminSidebar />}>
      <div className="container max-w-6xl mx-auto py-6 px-4 md:px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
          <div className="flex space-x-3">
            <Button onClick={handleSaveSettings}>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
            <Button variant="outline" onClick={() => navigate("/admin/users")}>
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Notifications Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Admin Notifications</CardTitle>
              </div>
              <CardDescription>
                Manage what notifications you receive as an administrator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="system-alerts" className="font-medium">System Alerts</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications about system status and issues</p>
                </div>
                <Switch 
                  id="system-alerts"
                  checked={settings.notifications.systemAlerts}
                  onCheckedChange={(checked) => handleNotificationChange('systemAlerts', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="user-registrations" className="font-medium">New User Registrations</Label>
                  <p className="text-sm text-muted-foreground">Get notified when new users register</p>
                </div>
                <Switch 
                  id="user-registrations"
                  checked={settings.notifications.userRegistrations}
                  onCheckedChange={(checked) => handleNotificationChange('userRegistrations', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="appointment-alerts" className="font-medium">Appointment Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified about new and canceled appointments</p>
                </div>
                <Switch 
                  id="appointment-alerts"
                  checked={settings.notifications.appointmentAlerts}
                  onCheckedChange={(checked) => handleNotificationChange('appointmentAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* System Settings Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Cog className="h-5 w-5 text-primary" />
                <CardTitle>System Settings</CardTitle>
              </div>
              <CardDescription>
                Configure system-wide settings and behaviors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenance-mode" className="font-medium">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Put the system in maintenance mode (only admins can access)</p>
                </div>
                <Switch 
                  id="maintenance-mode"
                  checked={settings.system.maintenanceMode}
                  onCheckedChange={(checked) => handleSystemChange('maintenanceMode', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="debug-mode" className="font-medium">Debug Mode</Label>
                  <p className="text-sm text-muted-foreground">Enable detailed logging and debugging information</p>
                </div>
                <Switch 
                  id="debug-mode"
                  checked={settings.system.debugMode}
                  onCheckedChange={(checked) => handleSystemChange('debugMode', checked)}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Security Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>
                Manage system security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enhanced-security" className="font-medium">Enhanced Security</Label>
                  <p className="text-sm text-muted-foreground">Enable additional security measures for all users</p>
                </div>
                <Switch 
                  id="enhanced-security"
                  checked={settings.security.enhancedSecurity}
                  onCheckedChange={(checked) => handleSecurityChange('enhancedSecurity', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="audit-logging" className="font-medium">Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">Record detailed logs of all system activities</p>
                </div>
                <Switch 
                  id="audit-logging"
                  checked={settings.security.auditLogging}
                  onCheckedChange={(checked) => handleSecurityChange('auditLogging', checked)}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Display Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-primary" />
                <CardTitle>Display Settings</CardTitle>
              </div>
              <CardDescription>
                Configure how information is displayed in the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-patient-details" className="font-medium">Show Patient Details</Label>
                  <p className="text-sm text-muted-foreground">Display detailed patient information in listings</p>
                </div>
                <Switch 
                  id="show-patient-details"
                  checked={settings.display.showPatientDetails}
                  onCheckedChange={(checked) => handleDisplayChange('showPatientDetails', checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="compact-view-admin" className="font-medium">Compact View</Label>
                  <p className="text-sm text-muted-foreground">Use compact view in admin dashboard</p>
                </div>
                <Switch 
                  id="compact-view-admin"
                  checked={settings.display.compactViewAdmin}
                  onCheckedChange={(checked) => handleDisplayChange('compactViewAdmin', checked)}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* System Message Section */}
          <Card>
            <CardHeader>
              <CardTitle>System Message</CardTitle>
              <CardDescription>
                Create a system-wide message that will be displayed to all users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter a system-wide message to broadcast to all users..."
                className="min-h-[120px]"
                value={settings.systemMessage}
                onChange={(e) => handleTextChange('systemMessage', e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                onClick={() => {
                  if (settings.systemMessage.trim()) {
                    toast({
                      title: "System message ready",
                      description: "Message will be broadcast when you save settings",
                    });
                  }
                }}
                disabled={!settings.systemMessage.trim()}
              >
                Preview Message
              </Button>
            </CardFooter>
          </Card>
          
          {/* Feedback Section */}
          <Card>
            <CardHeader>
              <CardTitle>Send Admin Feedback</CardTitle>
              <CardDescription>
                Send feedback to system administrators and developers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Your feedback helps improve the admin system..."
                className="min-h-[120px]"
                value={settings.feedbackMessage}
                onChange={(e) => handleTextChange('feedbackMessage', e.target.value)}
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
          
          {/* Session Management */}
          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
              <CardDescription>
                Manage your current admin session
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Sign Out</h3>
                  <p className="text-sm text-muted-foreground">
                    Sign out from your current admin session
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

export default AdminSettings;

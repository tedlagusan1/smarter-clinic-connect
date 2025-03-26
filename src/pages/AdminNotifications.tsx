
import React, { useState } from "react";
import { Shell, DashboardHeader, AdminSidebar } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

// Mock data for sent notifications
const notificationsData = [
  {
    id: 1,
    title: "Appointment Reminder",
    message: "This is a reminder for your upcoming appointments tomorrow. Please arrive 15 minutes before your scheduled time.",
    recipients: "All patients with appointments tomorrow (15)",
    sentDate: "2023-06-14 10:30 AM",
    sentBy: "Admin"
  },
  {
    id: 2,
    title: "Schedule Change Notice",
    message: "Dr. Michael Chen will not be available on Friday, June 16. All appointments have been rescheduled for Monday, June 19.",
    recipients: "Patients of Dr. Chen with Friday appointments (3)",
    sentDate: "2023-06-13 02:15 PM",
    sentBy: "Admin"
  },
  {
    id: 3,
    title: "Health Tips Newsletter",
    message: "Our monthly health tips newsletter with information about seasonal allergies and preventive care.",
    recipients: "All patients (2,578)",
    sentDate: "2023-06-01 09:00 AM",
    sentBy: "System"
  }
];

// Mock data for notification templates
const templateData = [
  {
    id: 1,
    title: "Appointment Reminder",
    message: "This is a reminder for your upcoming appointment on [DATE] at [TIME] with [DOCTOR]. Please arrive 15 minutes before your scheduled time."
  },
  {
    id: 2,
    title: "Schedule Change",
    message: "We regret to inform you that your appointment on [DATE] at [TIME] with [DOCTOR] needs to be rescheduled due to unforeseen circumstances. Please contact the clinic to arrange a new time."
  },
  {
    id: 3,
    title: "Holiday Hours",
    message: "Please note that our clinic will be operating on modified hours during the upcoming holiday: [HOLIDAY_DETAILS]. For emergencies, please call our 24/7 hotline."
  }
];

// Mock data for recipient groups
const recipientGroups = [
  { id: 1, name: "All Patients", count: 2578 },
  { id: 2, name: "Patients with Upcoming Appointments", count: 143 },
  { id: 3, name: "New Patients (Last 30 Days)", count: 87 },
  { id: 4, name: "Dr. Johnson's Patients", count: 532 },
  { id: 5, name: "Dr. Chen's Patients", count: 418 },
  { id: 6, name: "Dr. Rodriguez's Patients", count: 603 },
  { id: 7, name: "Dr. Kim's Patients", count: 390 }
];

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [templates, setTemplates] = useState(templateData);
  const [showNewNotification, setShowNewNotification] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    recipientGroupId: 0
  });
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  
  const handleSelectTemplate = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setNewNotification({
        ...newNotification,
        title: template.title,
        message: template.message
      });
      setSelectedTemplate(templateId);
    }
  };
  
  const handleSendNotification = () => {
    if (!newNotification.title || !newNotification.message || !newNotification.recipientGroupId) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const recipientGroup = recipientGroups.find(g => g.id === parseInt(newNotification.recipientGroupId.toString()));
    if (!recipientGroup) {
      toast.error("Please select a valid recipient group");
      return;
    }
    
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    
    const newNotificationEntry = {
      id: Math.max(...notifications.map(n => n.id), 0) + 1,
      title: newNotification.title,
      message: newNotification.message,
      recipients: `${recipientGroup.name} (${recipientGroup.count})`,
      sentDate: formattedDate,
      sentBy: "Admin"
    };
    
    setNotifications([newNotificationEntry, ...notifications]);
    setShowNewNotification(false);
    setNewNotification({
      title: "",
      message: "",
      recipientGroupId: 0
    });
    setSelectedTemplate(null);
    
    toast.success("Notification sent successfully");
  };
  
  return (
    <Shell
      header={<DashboardHeader />}
      sidebar={<AdminSidebar />}
      className="p-0"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <Button onClick={() => setShowNewNotification(true)}>
            Send New Notification
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Notification History</CardTitle>
            <CardDescription>
              Recent notifications sent to patients
            </CardDescription>
          </CardHeader>
          <CardContent>
            {notifications.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notifications.map(notification => (
                      <TableRow key={notification.id}>
                        <TableCell className="font-medium">{notification.title}</TableCell>
                        <TableCell className="max-w-md truncate">{notification.message}</TableCell>
                        <TableCell>{notification.recipients}</TableCell>
                        <TableCell>{notification.sentDate}</TableCell>
                        <TableCell>{notification.sentBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No notifications have been sent yet</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Send New Notification Dialog */}
        <Dialog open={showNewNotification} onOpenChange={setShowNewNotification}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Send New Notification</DialogTitle>
              <DialogDescription>
                Create and send a notification to patients
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <h3 className="text-sm font-medium mb-2">Templates</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {templates.map(template => (
                    <div 
                      key={template.id}
                      className={`p-3 rounded-md cursor-pointer border ${
                        selectedTemplate === template.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-border hover:bg-accent'
                      }`}
                      onClick={() => handleSelectTemplate(template.id)}
                    >
                      <h4 className="font-medium text-sm">{template.title}</h4>
                      <p className="text-xs text-muted-foreground truncate">{template.message.substring(0, 60)}...</p>
                    </div>
                  ))}
                </div>
                
                <h3 className="text-sm font-medium mt-6 mb-2">Recipient Groups</h3>
                <div className="space-y-2">
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newNotification.recipientGroupId}
                    onChange={(e) => setNewNotification({ ...newNotification, recipientGroupId: parseInt(e.target.value) })}
                  >
                    <option value={0}>Select recipient group</option>
                    {recipientGroups.map(group => (
                      <option key={group.id} value={group.id}>
                        {group.name} ({group.count})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notification-title">Notification Title</Label>
                  <Input
                    id="notification-title"
                    placeholder="Enter notification title"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notification-message">Message</Label>
                  <textarea
                    id="notification-message"
                    className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter notification message"
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    You can use placeholders like [DATE], [TIME], [DOCTOR], and [HOLIDAY_DETAILS] which will be replaced with actual values when sent.
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={() => setShowNewNotification(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendNotification}>
                Send Notification
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Shell>
  );
};

export default AdminNotifications;


import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export type Notification = {
  id: number;
  title: string;
  message: string;
  recipients: string;
  sentDate: string;
  sentBy: string;
  read?: boolean;
};

type NotificationsContextType = {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "sentDate" | "sentBy">) => void;
  markAsRead: (id: number) => void;
  userNotifications: Notification[];
};

const NotificationsContext = createContext<NotificationsContextType | null>(null);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Load notifications from localStorage on initial render
  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    }
  }, []);
  
  // Save notifications to localStorage when they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);
  
  const addNotification = (notification: Omit<Notification, "id" | "sentDate" | "sentBy">) => {
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    
    const newNotification: Notification = {
      id: Math.max(...notifications.map(n => n.id), 0) + 1,
      title: notification.title,
      message: notification.message,
      recipients: notification.recipients,
      sentDate: formattedDate,
      sentBy: user?.name || "System",
      read: false
    };
    
    setNotifications([newNotification, ...notifications]);
  };
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };
  
  // Filter notifications for the current user
  const userNotifications = notifications.filter(notification => {
    // If user is admin, show admin notifications
    if (user?.role === "admin" && notification.recipients.includes("Admin")) {
      return true;
    }
    
    // If user is regular user, show notifications for all patients or specific groups
    if (user?.role === "user" && 
        (notification.recipients.includes("All Patients") || 
         notification.recipients.includes("Patients"))) {
      return true;
    }
    
    return false;
  });
  
  return (
    <NotificationsContext.Provider 
      value={{ 
        notifications, 
        addNotification, 
        markAsRead,
        userNotifications
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};

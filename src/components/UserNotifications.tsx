
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationsContext";
import { cn } from "@/lib/utils";

export function UserNotifications() {
  const { userNotifications, markAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  
  const unreadCount = userNotifications.filter(n => !n.read).length;
  
  const handleNotificationClick = (id: number) => {
    markAsRead(id);
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-8"
              onClick={() => userNotifications.forEach(n => markAsRead(n.id))}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {userNotifications.length > 0 ? (
            <div className="flex flex-col">
              {userNotifications.map((notification) => (
                <button
                  key={notification.id}
                  className={cn(
                    "flex flex-col gap-1 p-3 text-left border-b transition-colors hover:bg-accent",
                    !notification.read && "bg-accent/40"
                  )}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {notification.sentDate}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {notification.message}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-muted-foreground">No notifications yet</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

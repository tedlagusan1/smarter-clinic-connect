import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { UserNotifications } from "@/components/UserNotifications";
import { useAuth } from "@/contexts/AuthContext";
import { Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
}

export function Shell({
  children,
  className,
  sidebar,
  header,
  ...props
}: ShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen flex-col">
      {header && <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">{header}</header>}
      <div className="flex flex-1">
        {sidebar && (
          <aside className={`lg:block border-r overflow-auto transition-all duration-300 ${sidebarCollapsed ? "w-16" : "w-64"} hidden`}>
            <div className="flex justify-end p-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleSidebar} 
                className="h-8 w-8"
              >
                {sidebarCollapsed ? <Maximize className="h-4 w-4" /> : <Minimize className="h-4 w-4" />}
                <span className="sr-only">
                  {sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                </span>
              </Button>
            </div>
            <div className={sidebarCollapsed ? "px-2" : ""}>
              {sidebar}
            </div>
          </aside>
        )}
        <main className={cn("flex-1 overflow-auto", className)} {...props}>
          {children}
        </main>
      </div>
    </div>
  );
}

export function SiteHeader() {
  return (
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <Link 
        to="/" 
        className="flex items-center space-x-2 font-medium text-lg transition-colors hover:text-primary"
      >
        <span className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-white font-semibold">SC</span>
        <span>SmarterClinic</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-6">
        <Link to="/features" className="text-sm font-medium transition-colors hover:text-primary link-underline">
          Features
        </Link>
        <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary link-underline">
          About
        </Link>
        <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary link-underline">
          Contact
        </Link>
        <Link to="/login" className="text-sm font-medium px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors">
          Sign In
        </Link>
      </nav>
    </div>
  );
}

export function DashboardHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
      <Link 
        to="/dashboard" 
        className="flex items-center space-x-2 font-medium text-lg transition-colors hover:text-primary"
      >
        <span className="h-8 w-8 bg-primary rounded-md flex items-center justify-center text-white font-semibold">SC</span>
        <span>SmarterClinic</span>
      </Link>
      <div className="flex items-center space-x-4">
        <UserNotifications />
        <Link to="/dashboard/profile" className="text-sm font-medium transition-colors hover:text-primary">
          Profile
        </Link>
        <button 
          onClick={handleLogout}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export function DashboardSidebar() {
  return (
    <div className="h-full py-6 px-4">
      <nav className="flex flex-col space-y-1">
        <Link 
          to="/dashboard" 
          className="px-4 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors"
        >
          Dashboard
        </Link>
        <Link 
          to="/dashboard/appointments" 
          className="px-4 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors"
        >
          My Appointments
        </Link>
        <Link 
          to="/dashboard/book" 
          className="px-4 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors"
        >
          Book Appointment
        </Link>
        <Link 
          to="/dashboard/profile" 
          className="px-4 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors"
        >
          Profile
        </Link>
        <div className="pt-4 pb-2">
          <div className="h-px w-full bg-border"></div>
        </div>
        <Link 
          to="/dashboard/settings" 
          className="px-4 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors"
        >
          Settings
        </Link>
      </nav>
    </div>
  );
}

export function AdminSidebar() {
  return (
    <div className="h-full py-6 px-4">
      <nav className="flex flex-col space-y-1">
        <Link 
          to="/admin" 
          className="px-4 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors"
        >
          Dashboard
        </Link>
        <Link 
          to="/admin/users" 
          className="px-4 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors"
        >
          Manage Users
        </Link>
        <Link 
          to="/admin/doctors" 
          className="px-4 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors"
        >
          Doctor Schedules
        </Link>
        <Link 
          to="/admin/appointments" 
          className="px-4 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors"
        >
          Appointments
        </Link>
        <Link 
          to="/admin/notifications" 
          className="px-4 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors"
        >
          Notifications
        </Link>
        <div className="pt-4 pb-2">
          <div className="h-px w-full bg-border"></div>
        </div>
        <Link 
          to="/admin/settings" 
          className="px-4 py-2 rounded-md hover:bg-accent text-sm font-medium transition-colors"
        >
          Settings
        </Link>
      </nav>
    </div>
  );
}

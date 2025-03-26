
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BookAppointment from "./pages/BookAppointment";
import Appointments from "./pages/Appointments";
import AdminDashboard from "./pages/AdminDashboard";
import AdminManageUsers from "./pages/AdminManageUsers";
import AdminDoctorSchedules from "./pages/AdminDoctorSchedules";
import AdminAppointments from "./pages/AdminAppointments";
import AdminNotifications from "./pages/AdminNotifications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Patient Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/book" element={<BookAppointment />} />
            <Route path="/dashboard/appointments" element={<Appointments />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminManageUsers />} />
            <Route path="/admin/doctors" element={<AdminDoctorSchedules />} />
            <Route path="/admin/appointments" element={<AdminAppointments />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;


import React from "react";
import { Shell, DashboardHeader, DashboardSidebar } from "@/components/layout/Shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import NoAppointments from "@/components/appointments/NoAppointments";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import CancelDialog from "@/components/appointments/CancelDialog";
import RescheduleDialog from "@/components/appointments/RescheduleDialog";
import { useAppointmentState } from "@/hooks/useAppointmentState";

const Appointments = () => {
  const {
    upcomingAppointments,
    pastAppointments,
    cancelReason,
    setCancelReason,
    appointmentToCancel,
    dialogOpen,
    setDialogOpen,
    rescheduleNote,
    setRescheduleNote,
    rescheduleDialogOpen,
    setRescheduleDialogOpen,
    handleCancelAppointment,
    handleRescheduleRequest,
    openCancelDialog,
    openRescheduleDialog,
  } = useAppointmentState();

  return (
    <Shell
      header={<DashboardHeader />}
      sidebar={<DashboardSidebar />}
      className="p-0"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Appointments</h1>
          {/* Book New Appointment moved into NoAppointments card if none */}
        </div>
        <Tabs defaultValue="upcoming" className="animate-fade-in">
          <TabsList className="grid w-full md:w-auto grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {upcomingAppointments.length === 0 ? (
              <NoAppointments />
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    isPast={false}
                    onReschedule={openRescheduleDialog}
                    onCancel={openCancelDialog}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="past" className="mt-6">
            {pastAppointments.length === 0 ? (
              <NoAppointments />
            ) : (
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    isPast={true}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        <CancelDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          reason={cancelReason}
          setReason={setCancelReason}
          onConfirm={handleCancelAppointment}
        />
        <RescheduleDialog
          open={rescheduleDialogOpen}
          onOpenChange={setRescheduleDialogOpen}
          note={rescheduleNote}
          setNote={setRescheduleNote}
          onConfirm={handleRescheduleRequest}
        />
        <Toaster />
      </div>
    </Shell>
  );
};

export default Appointments;

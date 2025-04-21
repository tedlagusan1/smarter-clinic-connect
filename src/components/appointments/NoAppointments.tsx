
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NoAppointments: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardContent className="pt-8 pb-8 flex flex-col items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="mb-3 text-slate-400" width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <rect width="24" height="24" rx="6" fill="#f1f5f9" />
          <path stroke="#94a3b8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
          <text x="7" y="18" fontSize="7" fill="#cbd5e1">No Appointments</text>
        </svg>
        <h3 className="text-lg font-semibold mb-1 text-slate-700">No appointments yet</h3>
        <p className="mb-4 text-sm text-muted-foreground text-center max-w-xs">
          Looks like you haven't booked any appointments. When you book your first appointment, it will appear here.
        </p>
        <Button onClick={() => navigate("/dashboard/book")} size="lg">
          Book your first appointment
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoAppointments;

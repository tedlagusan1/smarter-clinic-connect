
import React from "react";
import { Shell, SiteHeader } from "@/components/layout/Shell";

const Features = () => {
  return (
    <Shell header={<SiteHeader />}>
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Features</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg text-primary flex items-center justify-center mb-6">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Smart Appointment Scheduling</h3>
            <p className="text-gray-600">
              Our intelligent scheduling system helps you book appointments with the right specialists 
              while avoiding conflicts and optimizing healthcare provider availability.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg text-primary flex items-center justify-center mb-6">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Automated Reminders</h3>
            <p className="text-gray-600">
              Never miss an appointment with our customizable notification system. Receive SMS, email, 
              or push notifications based on your preferences.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg text-primary flex items-center justify-center mb-6">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Medical History Access</h3>
            <p className="text-gray-600">
              Access your complete medical history at your fingertips. View past appointments, 
              prescriptions, and treatment plans from any device.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg text-primary flex items-center justify-center mb-6">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Secure Messaging</h3>
            <p className="text-gray-600">
              Communicate directly with your healthcare providers through our HIPAA-compliant 
              messaging system. Ask questions and receive guidance between appointments.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg text-primary flex items-center justify-center mb-6">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Provider Search</h3>
            <p className="text-gray-600">
              Find the right healthcare provider based on specialty, location, availability, 
              and patient reviews. Filter results to match your insurance coverage.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg text-primary flex items-center justify-center mb-6">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Privacy Protection</h3>
            <p className="text-gray-600">
              Your data is secured with enterprise-grade encryption and compliance with all healthcare 
              privacy regulations. Control exactly who can access your medical information.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default Features;

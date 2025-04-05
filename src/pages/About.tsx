
import React from "react";
import { Shell, SiteHeader } from "@/components/layout/Shell";

const About = () => {
  return (
    <Shell header={<SiteHeader />}>
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About SmarterClinic</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead">
              SmarterClinic was founded in 2020 with a mission to transform the healthcare appointment 
              experience for both patients and providers.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              At SmarterClinic, we believe that healthcare should be accessible, efficient, and patient-centered.
              Our platform is designed to remove barriers to care by simplifying the appointment booking process,
              enhancing communication between patients and providers, and ensuring that everyone has the information
              they need when they need it.
            </p>
            
            <h2>Our Team</h2>
            <p>
              Our diverse team brings together experts in healthcare, technology, and customer experience.
              Led by healthcare professionals who understand the challenges of the modern medical practice,
              our developers create intuitive solutions that address real-world problems.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 my-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="font-medium text-lg">Dr. Sarah Johnson</h3>
                <p className="text-gray-600">Co-Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="font-medium text-lg">Michael Chen</h3>
                <p className="text-gray-600">Co-Founder & CTO</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"></div>
                <h3 className="font-medium text-lg">Jessica Patel</h3>
                <p className="text-gray-600">Chief Medical Officer</p>
              </div>
            </div>
            
            <h2>Our Impact</h2>
            <p>
              Since our launch, we've helped over 500 healthcare facilities streamline their appointment 
              processes, resulting in:
            </p>
            <ul>
              <li>35% reduction in no-show appointments</li>
              <li>42% decrease in administrative phone calls</li>
              <li>89% patient satisfaction rate</li>
              <li>Over 2 million appointments booked through our platform</li>
            </ul>
            
            <h2>Our Vision</h2>
            <p>
              We envision a future where healthcare access is seamless, where preventive care is prioritized,
              and where every patient receives personalized attention. SmarterClinic continues to innovate
              and expand our services to make this vision a reality.
            </p>
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default About;

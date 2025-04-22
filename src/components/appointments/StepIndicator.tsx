
import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  steps: Array<{
    title: string;
    description: string;
  }>;
}

export const StepIndicator = ({ currentStep, steps }: StepIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {steps.map((_, stepNumber) => (
            <React.Fragment key={stepNumber + 1}>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  currentStep >= stepNumber + 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}
              >
                {stepNumber + 1}
              </div>
              {stepNumber < steps.length - 1 && (
                <div
                  className={`w-16 h-1 ${
                    currentStep > stepNumber + 1 ? 'bg-primary' : 'bg-muted'
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-sm">
        {steps.map((step, index) => (
          <span
            key={index}
            className={currentStep >= index + 1 ? 'text-primary font-medium' : 'text-muted-foreground'}
          >
            {step.title}
          </span>
        ))}
      </div>
    </div>
  );
};

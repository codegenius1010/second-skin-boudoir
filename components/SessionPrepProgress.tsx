'use client'

import React from 'react'

interface SessionPrepProgressProps {
  currentStep: number
  totalSteps: number
}

export default function SessionPrepProgress({ currentStep, totalSteps }: SessionPrepProgressProps) {
  const steps = [
    { number: 1, label: 'Welcome' },
    { number: 2, label: 'Agreement' },
    { number: 3, label: 'Preferences' },
    { number: 4, label: 'Complete' },
  ]

  return (
    <div className="w-full mb-8 md:mb-12">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-1 bg-smoke rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-champagne to-rose transition-all duration-500"
            style={{
              width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex justify-between">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center flex-1">
            {/* Circle */}
            <div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                step.number <= currentStep
                  ? 'bg-gradient-to-br from-champagne to-rose text-espresso shadow-glow'
                  : 'bg-smoke text-ivory border border-champagne/30'
              }`}
            >
              <span className="text-sm md:text-base font-semibold">{step.number}</span>
            </div>

            {/* Label - hidden on mobile, shown on tablet+ */}
            <span
              className={`text-xs md:text-sm text-center leading-tight ${
                step.number <= currentStep ? 'text-champagne font-medium' : 'text-smoke'
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

"use client"

const ProgressBar = ({ currentStep, onStepClick, canProceed }) => {
  const steps = ["Reservation", "Confirmation", "Payment"]

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 scale-95 origin-center">
      <div className="flex items-center justify-between relative">
        {/* Background Lines */}
        <div className="absolute top-4 left-0 right-0 flex justify-between items-center">
          <div className="w-[calc(50%-16px)] h-[5px] bg-[#C4E6EA] absolute left-[40px]" />
          <div className="w-[calc(50%-16px)] h-[5px] bg-[#C4E6EA] absolute right-[40px]" />
        </div>

        {/* Active Lines */}
        <div className="absolute top-4 left-0 right-0 flex justify-between items-center">
          <div
            className="w-[calc(50%-16px)] h-[5px] bg-[#0A1172] transition-all duration-500 ease-in-out absolute left-[40px]"
            style={{
              transform: `scaleX(${currentStep > 1 ? 1 : 0})`,
              transformOrigin: "left",
            }}
          />
          <div
            className="w-[calc(50%-16px)] h-[5px] bg-[#0A1172] transition-all duration-500 ease-in-out absolute right-[40px]"
            style={{
              transform: `scaleX(${currentStep > 2 ? 1 : 0})`,
              transformOrigin: "left",
            }}
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber <= currentStep
          const canClick = stepNumber === 1 || (stepNumber === 2 && canProceed) || stepNumber < currentStep

          return (
            <div key={step} className="flex flex-col items-center relative z-10">
              <button
                onClick={() => canClick && onStepClick(stepNumber)}
                disabled={!canClick}
                className={`w-8 h-8 text-base font-bold rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${
                    isActive
                      ? "bg-[#0A1172] text-white border-[#0A1172]"
                      : "bg-[#C4E6EA] text-white border-[#C4E6EA] cursor-default"
                  }
                  ${canClick && !isActive ? "cursor-pointer hover:bg-[#b3d9de]" : ""}
                `}
              >
                {stepNumber}
              </button>
              <span className={`mt-3 text-sm font-bold ${isActive ? "text-[#0A1172]" : "text-gray-400"}`}>
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ProgressBar

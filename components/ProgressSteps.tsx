import React from "react";

const steps = [
  { label: "Start", step: 1 },
  { label: "Tires", step: 2 },
  { label: "Battery", step: 3 },
  { label: "Exterior", step: 4 },
  { label: "Brakes", step: 5 },
  { label: "Engine", step: 6 },
  { label: "Customer Remarks", step: 7 },
  { label: "Summary", step: 8 },
];

interface ProgressStepsProps {
  stage: number;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ stage }) => {
  const totalSteps = steps.length;
  const width = `${(100 / (totalSteps - 1)) * (stage - 1)}%`;

  const isMobile = 1; // Example threshold for mobile view

  return (
    <div className="relative w-full mx-auto px-2 pb-5 m-5">
      <div className="relative flex justify-between mt-20">
        <div className="absolute bg-gray-200 h-1 w-full top-1/2 transform -translate-y-1/2 left-0" />
        <div
          className="absolute bg-[#FEC40E] h-1 top-1/2 transform -translate-y-1/2 left-0 transition-all ease-linear"
          style={{ width }}
        />
        {steps.map(({ step, label }, index) => (
          <div key={step} className="relative z-10 flex flex-col items-center">
            <div
              className={`w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex justify-center items-center transition-all ease-linear ${
                stage >= step
                  ? "bg-[#FEC40E] border-4 border-[#FEC40E]"
                  : "bg-white border-4 border-gray-200"
              }`}
            >
              {stage > step ? (
                <div className="text-2xl md:text-3xl lg:text-4xl text-black font-bold transform scale-x-[-1] rotate-[42deg]">
                  L
                </div>
              ) : (
                <span className="text-lg md:text-xl lg:text-2xl text-gray-900">
                  {step}
                </span>
              )}
            </div>
            {!isMobile && (
              <div className="absolute top-16 md:top-20 lg:top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-lg md:text-xl lg:text-2xl text-[#FEC40E]">
                  {label}
                </span>
              </div>
            )}
            {isMobile && stage === step && (
              <div className="absolute top-16 md:top-20 lg:top-24 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-lg md:text-xl lg:text-2xl text-[#FEC40E]">
                  {label}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
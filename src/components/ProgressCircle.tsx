

interface ProgressCircleProps {
  progress?: number;
  percentage?: number;
  size?: number;
}

export function ProgressCircle({ progress, percentage, size = 120 }: ProgressCircleProps) {
  // Use either progress or percentage, default to 0 if neither is provided
  const value = progress ?? percentage ?? 0;
  // Ensure the value is a valid number between 0 and 100
  const validPercentage = isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
  
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (validPercentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2EC4B6"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="metric text-3xl text-[#0D1B2A]">{validPercentage}%</span>
      </div>
    </div>
  );
}
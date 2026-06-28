'use client';

interface IndicatorBarProps {
  label: string;
  value: number;
  icon: string;
  colorClass: string;
}

export function IndicatorBar({ label, value, icon, colorClass }: IndicatorBarProps) {
  const isLow = value <= 20;
  const isMedium = value > 20 && value <= 50;

  const barColor = isLow
    ? 'bg-red-500'
    : isMedium
    ? 'bg-yellow-400'
    : colorClass;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1 text-gray-300">
          <span>{icon}</span>
          <span>{label}</span>
        </span>
        <span
          className={`font-bold tabular-nums ${
            isLow ? 'text-red-400' : isMedium ? 'text-yellow-300' : 'text-gray-200'
          }`}
        >
          {Math.round(value)}%
        </span>
      </div>
      <div className="indicator-bar">
        <div
          className={`indicator-fill ${barColor}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

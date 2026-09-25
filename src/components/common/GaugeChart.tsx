import React from 'react';

interface GaugeChartProps {
  score: number;
  label: string;
  risk: 'HIGH' | 'MEDIUM' | 'LOW';
  size?: number;
}

export const GaugeChart: React.FC<GaugeChartProps> = ({ score, label, risk, size = 180 }) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const colors = {
    HIGH: { stroke: '#F05260', bg: 'rgba(240, 82, 96, 0.15)', glow: 'shadow-danger-glow', text: 'text-accentDanger' },
    MEDIUM: { stroke: '#F5B942', bg: 'rgba(245, 185, 66, 0.15)', glow: 'shadow-[0_0_20px_rgba(245,185,66,0.3)]', text: 'text-accentWarning' },
    LOW: { stroke: '#22C88A', bg: 'rgba(34, 200, 138, 0.15)', glow: 'shadow-success-glow', text: 'text-accentSuccess' }
  }[risk];

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={`text-3xl font-extrabold font-mono ${colors.text}`}>
          {score}%
        </span>
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-1">
          {label}
        </span>
      </div>
    </div>
  );
};

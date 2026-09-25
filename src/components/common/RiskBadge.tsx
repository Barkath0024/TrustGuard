import React from 'react';
import { RiskLevel } from '../../types';
import { ShieldAlert, AlertTriangle, ShieldCheck } from 'lucide-react';

interface RiskBadgeProps {
  level: RiskLevel;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  showIcon = true,
  size = 'md',
  animated = false
}) => {
  let bgClasses = '';
  let icon = null;

  switch (level) {
    case 'HIGH':
      bgClasses = 'bg-accentDanger/15 text-accentDanger border-accentDanger/40 shadow-danger-glow';
      icon = <ShieldAlert className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />;
      break;
    case 'MEDIUM':
      bgClasses = 'bg-accentWarning/15 text-accentWarning border-accentWarning/40 shadow-[0_0_15px_rgba(245,185,66,0.2)]';
      icon = <AlertTriangle className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />;
      break;
    case 'LOW':
      bgClasses = 'bg-accentSuccess/15 text-accentSuccess border-accentSuccess/40 shadow-success-glow';
      icon = <ShieldCheck className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />;
      break;
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs font-semibold',
    md: 'px-3 py-1 text-xs font-bold tracking-wide uppercase',
    lg: 'px-4 py-1.5 text-sm font-bold tracking-wider uppercase'
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border backdrop-blur-md ${bgClasses} ${sizeClasses} ${
        animated ? 'animate-pulse' : ''
      }`}
    >
      {showIcon && icon}
      <span>{level} RISK</span>
    </span>
  );
};

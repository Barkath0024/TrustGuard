import React from 'react';

interface JudgeBadgeProps {
  text: string;
  variant?: 'cyan' | 'purple' | 'emerald';
}

export const JudgeBadge: React.FC<JudgeBadgeProps> = ({ text, variant = 'cyan' }) => {
  const styles = {
    cyan: 'bg-[#00A8FF]/10 text-[#38D9FF] border-[#00A8FF]/30 hover:border-[#38D9FF]/60',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/30 hover:border-purple-400/60',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:border-emerald-400/60'
  }[variant];

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md border text-[11px] font-mono font-medium tracking-wide transition-all ${styles}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping opacity-75"></span>
      {text}
    </span>
  );
};

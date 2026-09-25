import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, Sparkles, CheckCircle2, Loader2, Network, Cpu, FileSearch, ShieldAlert } from 'lucide-react';
import { getCaseById } from '../services/storage';

export const AnalysisProcessingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const targetCase = id ? getCaseById(id) : null;

  const steps = [
    { label: "Evidence received & checksum verified", icon: FileSearch },
    { label: "Extracting multimodal features & latent vectors", icon: Cpu },
    { label: "Analysing media integrity (GAN / TTS Forensics)", icon: ShieldAlert },
    { label: "Checking identity consistency vs Trust Passport", icon: Shield },
    { label: "Analysing context & coercive sentiment NLP", icon: Sparkles },
    { label: "Building Trust Graph correlation network", icon: Network },
    { label: "Calculating explainable risk score", icon: ShieldAlert },
    { label: "Generating recommended action policy", icon: CheckCircle2 }
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    const totalDuration = 3600; // 3.6s
    const stepIntervalTime = totalDuration / steps.length;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1.2;
      });
    }, 40);

    const stepInterval = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval);
          return steps.length - 1;
        }
        return prev + 1;
      });
    }, stepIntervalTime);

    const redirectTimer = setTimeout(() => {
      navigate(`/verify/result/${id || 'TG-1024'}`);
    }, totalDuration + 400);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
      clearTimeout(redirectTimer);
    };
  }, [id, navigate]);

  return (
    <div className="min-h-screen bg-[#061522] flex flex-col items-center justify-center p-4 relative font-sans overflow-hidden">
      
      {/* Scanning Laser Beam Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,168,255,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#38D9FF] to-transparent top-0 animate-scan-line opacity-60 shadow-[0_0_15px_#38D9FF]" />

      <div className="max-w-xl w-full rounded-3xl bg-[#0D293F]/90 border border-[#38D9FF]/30 backdrop-blur-2xl shadow-cyber p-8 space-y-8 relative z-10 text-center">
        
        {/* Animated Radar Pulse Logo */}
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#00A8FF]/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border border-[#38D9FF]/40 animate-spin" />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00A8FF] to-[#0A1F32] p-0.5 shadow-cyber-lg flex items-center justify-center">
            <Shield className="w-8 h-8 text-[#38D9FF] animate-pulse" />
          </div>
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#38D9FF] font-semibold">
            Multimodal Analysis Engine Running
          </span>
          <h1 className="text-2xl font-extrabold text-white mt-1">
            Analyzing Case {id || 'TG-1024'}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            {targetCase ? targetCase.caseName : 'Correlating voice, image, context and identity signals'}
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold">
            <span className="text-slate-300 uppercase">Analysis Progress</span>
            <span className="text-[#38D9FF]">{Math.min(100, Math.round(progress))}%</span>
          </div>
          <div className="w-full h-3 rounded-full bg-[#061522] border border-slate-700 overflow-hidden p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00A8FF] via-[#38D9FF] to-emerald-400 transition-all duration-100 ease-out shadow-[0_0_15px_#38D9FF]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* STEP BY STEP ANIMATED CHECKLIST */}
        <div className="space-y-2 text-left bg-[#061522]/80 p-4 rounded-2xl border border-slate-800">
          {steps.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const StepIcon = step.icon;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 p-2 rounded-xl text-xs transition-all ${
                  isDone
                    ? 'text-emerald-400 font-medium'
                    : isCurrent
                    ? 'text-[#38D9FF] font-bold bg-[#00A8FF]/10 border border-[#00A8FF]/30'
                    : 'text-slate-500 opacity-60'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-[#38D9FF] animate-spin shrink-0" />
                ) : (
                  <StepIcon className="w-4 h-4 shrink-0" />
                )}
                <span className="truncate">{step.label}</span>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 font-mono">
          ⚡ Building cross-modal Trust Graph & generating explainable verification recommendation...
        </p>

      </div>
    </div>
  );
};

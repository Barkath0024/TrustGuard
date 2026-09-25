import React from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { HelpCircle, Shield, Network, Eye, UserCheck, Sparkles, CheckCircle2, Info } from 'lucide-react';
import { JudgeBadge } from '../components/common/JudgeBadge';

export const HelpAboutPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2 text-[#38D9FF] font-mono text-xs uppercase font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>Architecture & Documentation</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">About TrustGuard</h1>
          <p className="text-xs text-slate-400">Explainable Multimodal AI Platform for Digital Trust & Impersonation Detection</p>
        </div>

        {/* CORE PRODUCT PRINCIPLE */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0D293F] to-[#0A1F32] border border-amber-500/40 shadow-cyber space-y-3">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
            <Info className="w-5 h-5 text-amber-400" />
            <span>CORE PRODUCT PRINCIPLE</span>
          </div>
          <p className="text-sm font-semibold text-white leading-relaxed">
            AI SCORE IS NOT ABSOLUTE PROOF.
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            The TrustGuard system is engineered to highlight discrepancies across multimodal evidence channels. Low-confidence or high-risk cases should be independently verified by a human operator through out-of-band protocols.
          </p>
        </div>

        {/* HACKATHON DIFFERENTIATION BADGES */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Key Technological Innovations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl bg-[#0D293F]/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Cross-Modal Correlation</span>
                <JudgeBadge text="Innovation" variant="cyan" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Single-modality tools inspect audio or images in isolation. TrustGuard correlates background acoustics against claimed sender location and text urgency.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D293F]/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Interactive Trust Graph</span>
                <JudgeBadge text="Major Innovation" variant="purple" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Maps claims, biometric facial hashes, neural voice TTS signatures, and domain SPF origin into a topological graph showing conflict edges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D293F]/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Consent-Based Trust Passport</span>
                <JudgeBadge text="Identity Reference" variant="emerald" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enables executive team members to register verified reference samples (vocal tract length baselines, 3D facial hashes) for corporate comparison.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0D293F]/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Explainable Forensics</span>
                <JudgeBadge text="Transparent AI" variant="cyan" />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replaces black-box percentages with specific acoustic formant delta numbers, GAN diffusion noise levels, and NLP coercion coefficients.
              </p>
            </div>

          </div>
        </div>

      </div>
    </AppLayout>
  );
};

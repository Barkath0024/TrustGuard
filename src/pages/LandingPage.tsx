import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Shield,
  Sparkles,
  ArrowRight,
  Lock,
  Cpu,
  Eye,
  FileCheck,
  Zap,
  Activity,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Network
} from 'lucide-react';
import { getStoredUser, loadDemoScenario } from '../services/storage';
import { JudgeBadge } from '../components/common/JudgeBadge';
import { InteractiveTrustGraph } from '../components/graph/InteractiveTrustGraph';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleStartVerification = () => {
    if (user && user.email) {
      navigate('/verify/new');
    } else {
      navigate('/login');
    }
  };

  const handleExploreDemo = () => {
    const demoCase = loadDemoScenario();
    navigate(`/verify/result/${demoCase.id}`);
  };

  const sampleNodes = [
    { id: "n1", label: "CLAIM", type: "CLAIM" as const, score: 85, status: "Context Risk" as const, confidence: "High" as const, details: "Urgent $85k Wire Transfer Claim" },
    { id: "n2", label: "IMAGE", type: "IMAGE" as const, score: 42, status: "Media Concern" as const, confidence: "High" as const, details: "Profile Photo - Diffusion Artifacts" },
    { id: "n3", label: "FACE", type: "FACE" as const, score: 38, status: "Media Concern" as const, confidence: "High" as const, details: "Deepfake GAN Facial Seam" },
    { id: "n4", label: "VOICE", type: "VOICE" as const, score: 35, status: "Identity Concern" as const, confidence: "High" as const, details: "Neural TTS Voice Synthesis (ElevenLabs)" },
    { id: "n5", label: "TEXT", type: "TEXT" as const, score: 48, status: "Context Risk" as const, confidence: "Medium" as const, details: "Urgency Coercion Sentiments" },
    { id: "n6", label: "IDENTITY", type: "IDENTITY" as const, score: 28, status: "Identity Concern" as const, confidence: "High" as const, details: "VP Finance Reference Mismatch" }
  ];

  const sampleEdges = [
    { source: "n1", target: "n2", status: "conflict" as const, label: "Manipulated Media" },
    { source: "n2", target: "n3", status: "conflict" as const, label: "GAN Boundary" },
    { source: "n1", target: "n4", status: "conflict" as const, label: "TTS Voice Clone" },
    { source: "n4", target: "n6", status: "conflict" as const, label: "35% Biometric Match" },
    { source: "n1", target: "n5", status: "conflict" as const, label: "Coercion Pattern" }
  ];

  return (
    <div className="min-h-screen bg-[#061522] text-slate-100 flex flex-col font-sans overflow-x-hidden selection:bg-[#00A8FF]/30">
      
      {/* LANDING NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#061522]/90 backdrop-blur-xl border-b border-[#38D9FF]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A8FF] to-[#0A1F32] p-0.5 shadow-cyber">
              <div className="w-full h-full bg-[#061522] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#38D9FF]" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-white via-slate-100 to-[#38D9FF] bg-clip-text text-transparent">
                TRUSTGUARD
              </span>
              <p className="text-[10px] font-mono tracking-widest text-[#00A8FF] uppercase">AI FOR DIGITAL TRUST</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#how-it-works" className="hover:text-[#38D9FF] transition-colors">How it Works</a>
            <a href="#innovations" className="hover:text-[#38D9FF] transition-colors">Innovations</a>
            <a href="#trust-graph" className="hover:text-[#38D9FF] transition-colors">Trust Graph</a>
            <a href="#about" className="hover:text-[#38D9FF] transition-colors">About</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all"
            >
              Sign In
            </Link>
            <button
              onClick={handleStartVerification}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00A8FF] to-[#38D9FF] text-[#061522] font-bold text-xs tracking-wide shadow-cyber hover:shadow-cyber-lg transition-all"
            >
              Start Verification
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#00A8FF]/20 to-purple-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A8FF]/10 border border-[#00A8FF]/30 text-[#38D9FF] text-xs font-mono font-medium shadow-cyber">
            <Sparkles className="w-4 h-4 text-[#38D9FF] animate-pulse" />
            <span>Hackathon Prototype • Explainable Digital Trust SaaS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Verify Before You <span className="bg-gradient-to-r from-[#00A8FF] via-[#38D9FF] to-emerald-400 bg-clip-text text-transparent">Trust.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            An explainable multimodal AI platform for detecting synthetic media, impersonation and digital trust risks across voice, video, image, text and identity signals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleStartVerification}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#00A8FF] to-[#38D9FF] text-[#061522] font-extrabold text-sm tracking-wide shadow-cyber-lg hover:scale-105 transition-all flex items-center gap-2 group"
            >
              <span>Start Verification</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleExploreDemo}
              className="px-8 py-4 rounded-xl bg-[#0D293F] border border-amber-500/50 text-amber-300 font-extrabold text-sm tracking-wide shadow-[0_0_20px_rgba(245,185,66,0.2)] hover:bg-[#113552] transition-all flex items-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>Explore Demo Case</span>
            </button>
          </div>

          {/* Key Differentiation Phrases */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
            <JudgeBadge text="Not just Deepfake Detection" variant="cyan" />
            <JudgeBadge text="Cross-Modal Evidence Correlation" variant="purple" />
            <JudgeBadge text="Trust Graph Engine" variant="emerald" />
            <JudgeBadge text="Explainable Risk Assessment" variant="cyan" />
            <JudgeBadge text="Human-in-the-Loop" variant="purple" />
          </div>

        </div>

        {/* FUTURISTIC DIGITAL TRUST VISUALIZATION */}
        <div className="mt-16 p-6 sm:p-8 rounded-3xl bg-[#0D293F]/60 border border-[#38D9FF]/20 backdrop-blur-2xl shadow-cyber-lg relative overflow-hidden">
          
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-[#38D9FF] font-semibold">Multimodal Pipeline Flow</span>
            <h3 className="text-xl font-bold text-white mt-1">Cross-Modal Synthesis & Correlation Architecture</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center text-center relative z-10">
            
            {/* Step 1: Input Evidence Types */}
            <div className="space-y-3 p-4 rounded-2xl bg-[#061522]/90 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Input Layer</span>
              <div className="space-y-2 text-xs font-semibold">
                <div className="p-2 rounded-lg bg-[#00A8FF]/10 border border-[#00A8FF]/30 text-[#38D9FF]">IMAGE (GAN Check)</div>
                <div className="p-2 rounded-lg bg-[#00A8FF]/10 border border-[#00A8FF]/30 text-[#38D9FF]">VOICE (TTS Biometric)</div>
                <div className="p-2 rounded-lg bg-[#00A8FF]/10 border border-[#00A8FF]/30 text-[#38D9FF]">TEXT (Coercion NLP)</div>
                <div className="p-2 rounded-lg bg-[#00A8FF]/10 border border-[#00A8FF]/30 text-[#38D9FF]">IDENTITY (Passport)</div>
              </div>
            </div>

            <div className="hidden md:flex justify-center text-[#38D9FF] animate-pulse">
              <ArrowRight className="w-6 h-6" />
            </div>

            {/* Step 2: Trust Graph */}
            <div className="p-4 rounded-2xl bg-[#061522]/90 border border-[#38D9FF]/40 shadow-cyber">
              <Network className="w-8 h-8 text-[#38D9FF] mx-auto mb-2 animate-pulse" />
              <h4 className="text-sm font-extrabold text-white">TRUST GRAPH</h4>
              <p className="text-[11px] text-slate-400 mt-1">Cross-Modal Correlation Network</p>
            </div>

            <div className="hidden md:flex justify-center text-[#38D9FF] animate-pulse">
              <ArrowRight className="w-6 h-6" />
            </div>

            {/* Step 3: Risk Assessment */}
            <div className="p-4 rounded-2xl bg-[#061522]/90 border border-rose-500/40 shadow-danger-glow">
              <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto mb-2 animate-bounce" />
              <h4 className="text-sm font-extrabold text-rose-400">RISK ASSESSMENT</h4>
              <p className="text-[11px] text-slate-400 mt-1">Explainable Next Steps</p>
            </div>

          </div>
        </div>

      </section>

      {/* CORE INNOVATIONS & PROBLEM SECTION */}
      <section id="innovations" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#00A8FF] font-semibold">Why Simple Deepfake Detection Fails</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Multimodal Digital Trust Framework</h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Generative AI has democratized high-fidelity voice cloning, GAN facial swaps, and synthetic document manipulation. Single-modal deepfake detectors report high false positive rates. TrustGuard correlates evidence across all channels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-2xl bg-[#0D293F]/50 border border-[#38D9FF]/20 hover:border-[#38D9FF]/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#00A8FF]/15 flex items-center justify-center text-[#38D9FF] mb-5">
              <Network className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Cross-Modal Correlation</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Synthesizes voice, image, context, and identity records into an interconnected Trust Graph to uncover contradictions that single-modality tools miss.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D293F]/50 border border-[#38D9FF]/20 hover:border-[#38D9FF]/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#00A8FF]/15 flex items-center justify-center text-[#38D9FF] mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Explainable AI Evidence</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides granular technical breakdowns (spectral phase shifts, formant vocal tract delta, GAN diffusion noise) instead of obscure black-box percentages.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#0D293F]/50 border border-[#38D9FF]/20 hover:border-[#38D9FF]/50 transition-all hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-[#00A8FF]/15 flex items-center justify-center text-[#38D9FF] mb-5">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Trust Passport Baseline</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consent-based reference identity database allowing executives and high-value targets to register verified vocal, facial, and cryptographic references.
            </p>
          </div>

        </div>
      </section>

      {/* TRUST GRAPH LIVE PREVIEW */}
      <section id="trust-graph" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-semibold">Major Innovation</span>
          <h2 className="text-3xl font-extrabold text-white">Live Interactive Trust Graph</h2>
          <p className="text-xs text-slate-400">Click any node below to test node inspection and evidence telemetry.</p>
        </div>

        <InteractiveTrustGraph nodes={sampleNodes} edges={sampleEdges} height={420} />
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#061522] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#38D9FF]" />
            <span className="font-bold text-white">TRUSTGUARD</span>
            <span>© 2026 Hackathon Prototype Edition</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/about" className="hover:text-white">Documentation</Link>
            <Link to="/login" className="hover:text-white">Login</Link>
            <Link to="/admin" className="hover:text-white">SOC Admin</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};

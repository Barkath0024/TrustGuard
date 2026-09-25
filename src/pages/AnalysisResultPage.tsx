import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import {
  ShieldAlert,
  ShieldCheck,
  Network,
  Eye,
  FileCheck,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  X,
  UserCheck,
  CheckCircle2,
  FolderKanban,
  Download,
  Info
} from 'lucide-react';
import { getCaseById, updateCaseStatus } from '../services/storage';
import { RiskBadge } from '../components/common/RiskBadge';
import { GaugeChart } from '../components/common/GaugeChart';
import { JudgeBadge } from '../components/common/JudgeBadge';
import { EvidenceConcern, VerificationCase } from '../types';
import { useToast } from '../components/common/Toast';

export const AnalysisResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const caseData: VerificationCase | undefined = id ? getCaseById(id) : getCaseById('TG-1024');
  const [selectedConcern, setSelectedConcern] = useState<EvidenceConcern | null>(null);
  const [currentStatus, setCurrentStatus] = useState(caseData?.status || 'FLAGGED');

  if (!caseData) {
    return (
      <AppLayout>
        <div className="text-center py-20 space-y-4">
          <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Case Not Found</h2>
          <Link to="/dashboard" className="text-[#38D9FF] underline text-xs">Return to Dashboard</Link>
        </div>
      </AppLayout>
    );
  }

  const handleActionClick = (newStatus: 'VERIFIED' | 'FLAGGED' | 'IN_REVIEW', actionName: string) => {
    updateCaseStatus(caseData.id, newStatus, `Action taken: ${actionName}`);
    setCurrentStatus(newStatus);
    showToast('success', actionName, `Case ${caseData.id} updated to status: ${newStatus}`);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(caseData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `TrustGuard_Report_${caseData.id}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('success', 'Report Exported', `Generated TrustGuard Report ${caseData.id}.json`);
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* TOP BAR / BREADCRUMB */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#38D9FF] font-semibold">{caseData.id}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-mono">
                {new Date(caseData.createdAt).toLocaleString()}
              </span>
              <span className="text-slate-600">•</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                currentStatus === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                currentStatus === 'FLAGGED' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}>
                STATUS: {currentStatus}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">{caseData.caseName}</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Claimed Identity: <strong className="text-white">{caseData.claimedIdentity}</strong> • Channel: <span className="font-mono text-slate-400">{caseData.source}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-xl bg-[#0D293F] border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:border-[#38D9FF] flex items-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-[#38D9FF]" />
              <span>Export Report</span>
            </button>

            <Link
              to="/trust-graph"
              className="px-3.5 py-2 rounded-xl bg-[#00A8FF]/20 border border-[#00A8FF]/40 text-[#38D9FF] hover:bg-[#00A8FF]/30 text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <Network className="w-4 h-4" />
              <span>Inspect Trust Graph</span>
            </Link>
          </div>
        </div>

        {/* MAIN RISK HEADER CARD */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0D293F] via-[#0A1F32] to-[#0D293F] border border-[#38D9FF]/30 backdrop-blur-2xl shadow-cyber grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative overflow-hidden">
          
          {/* Animated Risk Meter */}
          <div className="flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 pb-6 md:pb-0 md:pr-6">
            <GaugeChart score={caseData.confidenceScore} label="Risk Severity" risk={caseData.risk} size={180} />
            <div className="mt-4 text-center">
              <RiskBadge level={caseData.risk} size="lg" animated={caseData.risk === 'HIGH'} />
            </div>
          </div>

          {/* Breakdown Horizontal Progress Bars */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Overall Trust Assessment Breakdown</h3>
              <JudgeBadge text="Multimodal Signals" variant="cyan" />
            </div>

            <div className="space-y-3 text-xs">
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 font-medium">Media Integrity</span>
                  <span className="font-mono font-bold text-rose-400">{caseData.breakdown.mediaIntegrity}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#061522] overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${caseData.breakdown.mediaIntegrity}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 font-medium">Identity Consistency</span>
                  <span className="font-mono font-bold text-rose-400">{caseData.breakdown.identityConsistency}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#061522] overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${caseData.breakdown.identityConsistency}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 font-medium">Context Consistency</span>
                  <span className="font-mono font-bold text-amber-400">{caseData.breakdown.contextConsistency}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#061522] overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${caseData.breakdown.contextConsistency}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 font-medium">Source Reliability</span>
                  <span className="font-mono font-bold text-amber-400">{caseData.breakdown.sourceReliability}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#061522] overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${caseData.breakdown.sourceReliability}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-slate-300 font-medium">Evidence Completeness</span>
                  <span className="font-mono font-bold text-[#38D9FF]">{caseData.breakdown.evidenceCompleteness}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#061522] overflow-hidden">
                  <div className="h-full bg-[#38D9FF] rounded-full" style={{ width: `${caseData.breakdown.evidenceCompleteness}%` }} />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* WHY THIS RESULT? SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-white uppercase tracking-wider font-mono">Why This Result?</h2>
              <p className="text-xs text-slate-400">Explainable AI Evidence & Cross-Modal Contradictions Detected</p>
            </div>
            <JudgeBadge text="Explainable AI Evidence" variant="purple" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseData.concerns.map(concern => (
              <div
                key={concern.id}
                className="p-5 rounded-2xl bg-[#0D293F]/70 border border-slate-700/80 hover:border-[#38D9FF]/50 backdrop-blur-xl transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-sm text-white">{concern.title}</span>
                    <RiskBadge level={concern.severity} size="sm" />
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{concern.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-400">
                    <span className="text-slate-500">Source:</span> {concern.source}
                  </div>
                  <button
                    onClick={() => setSelectedConcern(concern)}
                    className="px-3 py-1 rounded-lg bg-[#00A8FF]/15 text-[#38D9FF] hover:bg-[#00A8FF]/30 text-xs font-semibold flex items-center gap-1 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Evidence</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACTION RECOMMENDATION SECTION */}
        <div className="p-6 rounded-3xl bg-[#0D293F]/80 border border-amber-500/30 backdrop-blur-xl space-y-6 shadow-cyber">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">Recommended Next Steps</h3>
              <p className="text-xs text-slate-400">Actionable protocols based on digital trust threat assessment</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {caseData.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 text-xs text-slate-200">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>

          {/* Core Product Principle Banner */}
          <div className="p-3.5 rounded-xl bg-[#061522] border border-amber-500/40 flex items-center gap-3 text-xs text-amber-200 font-mono">
            <Info className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-white uppercase">IMPORTANT PRINCIPLE:</span> AI score is not absolute proof. Low-confidence or high-risk cases should be independently verified by a human.
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pt-2 flex flex-wrap items-center justify-end gap-3">
            <button
              onClick={() => handleActionClick('VERIFIED', 'Marked as Verified')}
              className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-success-glow"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark as Verified</span>
            </button>

            <button
              onClick={() => handleActionClick('IN_REVIEW', 'Flagged for Human Review')}
              className="px-4 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Flag for Human Review</span>
            </button>

            <button
              onClick={() => {
                handleActionClick('FLAGGED', 'Created SOC Investigation');
                navigate(`/admin/case/${caseData.id}`);
              }}
              className="px-4 py-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 hover:bg-rose-500/30 text-rose-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-danger-glow"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create Investigation</span>
            </button>
          </div>

        </div>

      </div>

      {/* VIEW EVIDENCE MODAL */}
      {selectedConcern && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="max-w-xl w-full rounded-2xl bg-[#0D293F] border border-[#38D9FF]/40 p-6 space-y-4 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#38D9FF] uppercase font-semibold">Technical Evidence Inspector</span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedConcern.title}</h3>
              </div>
              <button onClick={() => setSelectedConcern(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#061522] border border-slate-800 space-y-1">
                <p className="text-slate-400 font-mono text-[10px]">EVIDENCE SOURCE & CATEGORY</p>
                <p className="text-white font-semibold">{selectedConcern.source} ({selectedConcern.category})</p>
              </div>

              <div className="p-3 rounded-xl bg-[#061522] border border-slate-800 space-y-1">
                <p className="text-slate-400 font-mono text-[10px]">DETAILED EXPLANATION</p>
                <p className="text-slate-200 leading-relaxed">{selectedConcern.description}</p>
              </div>

              {selectedConcern.technicalDetails && (
                <div className="p-3 rounded-xl bg-[#061522] border border-cyan-500/30 font-mono text-[11px] text-[#38D9FF] space-y-1">
                  <p className="text-slate-400 font-mono text-[10px]">FORENSIC TELEMETRY SIGNAL</p>
                  <p>{selectedConcern.technicalDetails}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedConcern(null)}
                className="px-4 py-2 rounded-xl bg-[#00A8FF] text-[#061522] font-bold text-xs hover:bg-[#38D9FF]"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

    </AppLayout>
  );
};

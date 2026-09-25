import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import {
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Clock,
  UserCheck,
  MessageSquare,
  FileCheck,
  Network
} from 'lucide-react';
import { getCaseById, updateCaseStatus, getStoredUser } from '../services/storage';
import { RiskBadge } from '../components/common/RiskBadge';
import { InteractiveTrustGraph } from '../components/graph/InteractiveTrustGraph';
import { CaseStatus } from '../types';
import { useToast } from '../components/common/Toast';

export const AdminCaseReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const adminUser = getStoredUser();

  const caseData = id ? getCaseById(id) : getCaseById('TG-1024');
  const [reviewNote, setReviewNote] = useState('');
  const [currentStatus, setCurrentStatus] = useState<CaseStatus>(caseData?.status || 'IN_REVIEW');

  if (!caseData) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <h2 className="text-xl font-bold text-white">Case Not Found</h2>
        </div>
      </AppLayout>
    );
  }

  const handleAdminAction = (newStatus: CaseStatus, actionLabel: string) => {
    updateCaseStatus(caseData.id, newStatus, reviewNote || `Admin action: ${actionLabel}`, adminUser.name);
    setCurrentStatus(newStatus);
    showToast('success', actionLabel, `Case ${caseData.id} updated to ${newStatus}. Audit log entry recorded.`);
    setReviewNote('');
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-500/30">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-rose-400 font-semibold">
              <span>SOC ANALYST CASE TRIAGE WORKSPACE</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">ASSIGNED: {adminUser.name}</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">
              Reviewing Case {caseData.id}: {caseData.caseName}
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Subject: <strong className="text-white">{caseData.claimedIdentity}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <RiskBadge level={caseData.risk} size="lg" />
            <span className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-mono font-bold text-rose-300 uppercase">
              STATUS: {currentStatus}
            </span>
          </div>
        </div>

        {/* METADATA & AI ASSESSMENT CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0D293F]/70 border border-[#38D9FF]/20 backdrop-blur-xl space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#38D9FF] font-bold">1. Ingested Evidence Payload</h2>
            
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#061522] border border-slate-800">
                <span className="text-slate-400 font-mono text-[10px]">CLAIM STATEMENT</span>
                <p className="text-white font-semibold mt-0.5">"{caseData.claim}"</p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="p-3 rounded-xl bg-[#061522] border border-slate-800">
                  <span className="text-slate-400 text-[10px]">MEDIA INTEGRITY</span>
                  <p className="text-lg font-bold text-rose-400 mt-0.5">{caseData.breakdown.mediaIntegrity}%</p>
                </div>
                <div className="p-3 rounded-xl bg-[#061522] border border-slate-800">
                  <span className="text-slate-400 text-[10px]">IDENTITY CONSISTENCY</span>
                  <p className="text-lg font-bold text-rose-400 mt-0.5">{caseData.breakdown.identityConsistency}%</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold text-slate-300">Attached Artifacts:</h3>
              <div className="space-y-1.5">
                {caseData.evidence.map(e => (
                  <div key={e.id} className="p-2.5 rounded-xl bg-[#061522] border border-slate-800 flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{e.filename} ({e.type})</span>
                    <span className="font-mono text-slate-400 text-[11px]">Integrity: {e.integrityScore}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ADMIN ACTION PANEL */}
          <div className="p-6 rounded-2xl bg-[#0D293F]/80 border border-rose-500/30 backdrop-blur-xl space-y-4 shadow-danger-glow flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>Admin Decision Panel</span>
              </h2>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Add Review Note / Audit Override Reason</label>
                <textarea
                  rows={3}
                  value={reviewNote}
                  onChange={e => setReviewNote(e.target.value)}
                  placeholder="Enter analyst justification notes..."
                  className="w-full px-3 py-2 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleAdminAction('VERIFIED', 'Approve & Mark Verified')}
                  className="w-full py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve / Mark Verified</span>
                </button>

                <button
                  onClick={() => handleAdminAction('IN_REVIEW', 'Request Out-of-Band Human Phone Verification')}
                  className="w-full py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Request Out-of-Band Call</span>
                </button>

                <button
                  onClick={() => handleAdminAction('FLAGGED', 'Flag Case for SOC Escalation')}
                  className="w-full py-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 hover:bg-rose-500/30 text-rose-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Flag for SOC Escalation</span>
                </button>
              </div>
            </div>

            <div className="pt-2 text-[10px] font-mono text-slate-400 border-t border-slate-800">
              ⚡ All actions generate immutable audit log entries in local storage ledger.
            </div>
          </div>

        </div>

        {/* TRUST GRAPH */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#38D9FF] font-bold">Case Trust Graph Topology</h2>
          <InteractiveTrustGraph nodes={caseData.trustGraph.nodes} edges={caseData.trustGraph.edges} height={380} />
        </div>

      </div>
    </AppLayout>
  );
};

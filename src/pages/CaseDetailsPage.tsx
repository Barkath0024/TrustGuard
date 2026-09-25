import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import {
  FolderKanban,
  Clock,
  UserCheck,
  ShieldAlert,
  Network,
  Eye,
  ArrowRight,
  Download,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { getCaseById } from '../services/storage';
import { RiskBadge } from '../components/common/RiskBadge';
import { InteractiveTrustGraph } from '../components/graph/InteractiveTrustGraph';
import { useToast } from '../components/common/Toast';

export const CaseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const caseData = id ? getCaseById(id) : getCaseById('TG-1024');

  if (!caseData) {
    return (
      <AppLayout>
        <div className="text-center py-20 space-y-4">
          <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">Case Not Found</h2>
          <Link to="/history" className="text-[#38D9FF] underline text-xs">Return to History</Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#38D9FF] font-semibold">{caseData.id}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-mono">
                Created {new Date(caseData.createdAt).toLocaleString()}
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">{caseData.caseName}</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Subject: <strong className="text-white">{caseData.claimedIdentity}</strong> • Channel: <span className="font-mono text-slate-400">{caseData.source}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <RiskBadge level={caseData.risk} size="lg" />
            <button
              onClick={() => navigate(`/verify/result/${caseData.id}`)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00A8FF] to-[#38D9FF] text-[#061522] font-bold text-xs uppercase tracking-wider shadow-cyber flex items-center gap-2"
            >
              <span>View Full Assessment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CLAIM & NOTES CARD */}
        <div className="p-6 rounded-2xl bg-[#0D293F]/70 border border-[#38D9FF]/20 backdrop-blur-xl space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#38D9FF] font-bold">Case Statement & Claim</h2>
          <p className="text-sm font-semibold text-white leading-relaxed bg-[#061522] p-4 rounded-xl border border-slate-800">
            "{caseData.claim}"
          </p>

          {caseData.notes && (
            <div className="text-xs text-slate-300 bg-[#061522]/50 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-500 font-mono text-[10px] uppercase block">ANALYST NOTES</span>
              <p className="mt-0.5">{caseData.notes}</p>
            </div>
          )}
        </div>

        {/* AUDIT TIMELINE */}
        <div className="p-6 rounded-2xl bg-[#0D293F]/70 border border-[#38D9FF]/20 backdrop-blur-xl space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#38D9FF] font-bold flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Audit & Verification Lifecycle Timeline</span>
          </h2>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
            {caseData.timeline.map((item, idx) => (
              <div key={idx} className="relative space-y-1">
                <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#00A8FF] ring-4 ring-[#061522]" />
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-white">{item.title}</span>
                  <span className="text-[10px] font-mono text-slate-400">{item.timestamp}</span>
                </div>
                <p className="text-xs text-slate-300">{item.description}</p>
                <p className="text-[10px] text-[#38D9FF] font-mono">Actor: {item.actor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TRUST GRAPH SECTION */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-[#38D9FF] font-bold flex items-center gap-2">
            <Network className="w-4 h-4" />
            <span>Case Trust Graph Topology</span>
          </h2>
          <InteractiveTrustGraph nodes={caseData.trustGraph.nodes} edges={caseData.trustGraph.edges} height={380} />
        </div>

      </div>
    </AppLayout>
  );
};

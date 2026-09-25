import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import {
  ShieldAlert,
  ShieldCheck,
  ShieldPlus,
  TrendingUp,
  FolderKanban,
  ArrowUpRight,
  Filter,
  Search,
  Sparkles,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { getStoredUser, getStoredCases } from '../services/storage';
import { RiskBadge } from '../components/common/RiskBadge';
import { JudgeBadge } from '../components/common/JudgeBadge';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const user = getStoredUser();
  const cases = getStoredCases();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');

  const totalCases = cases.length;
  const highRiskCount = cases.filter(c => c.risk === 'HIGH').length;
  const mediumRiskCount = cases.filter(c => c.risk === 'MEDIUM').length;
  const verifiedCount = cases.filter(c => c.status === 'VERIFIED').length;

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.caseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.claimedIdentity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = filterRisk === 'ALL' || c.risk === filterRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Header Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
          <div>
            <h1 className="text-2xl font-extrabold text-white">Good morning, {user.name}</h1>
            <p className="text-xs text-slate-400 mt-1">
              Multimodal Digital Trust System • {user.organization} Security Ops
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/verify/new"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00A8FF] to-[#38D9FF] text-[#061522] font-bold text-xs uppercase tracking-wider shadow-cyber hover:shadow-cyber-lg transition-all flex items-center gap-2"
            >
              <ShieldPlus className="w-4 h-4" />
              <span>Create New Verification</span>
            </Link>
          </div>
        </div>

        {/* STAT CARDS WITH TREND INDICATORS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-[#0D293F]/70 border border-[#38D9FF]/20 backdrop-blur-xl space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-mono uppercase font-semibold">Total Cases</span>
              <FolderKanban className="w-4 h-4 text-[#38D9FF]" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold font-mono text-white">{totalCases}</span>
              <span className="text-[11px] font-mono font-semibold text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +12% this week
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D293F]/70 border border-rose-500/30 backdrop-blur-xl space-y-2 shadow-danger-glow">
            <div className="flex items-center justify-between text-rose-300">
              <span className="text-xs font-mono uppercase font-semibold">High Risk Cases</span>
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold font-mono text-rose-400">{highRiskCount}</span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">
                Requires SOC Action
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D293F]/70 border border-amber-500/30 backdrop-blur-xl space-y-2">
            <div className="flex items-center justify-between text-amber-300">
              <span className="text-xs font-mono uppercase font-semibold">Medium Risk</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold font-mono text-amber-400">{mediumRiskCount}</span>
              <span className="text-[11px] font-mono text-slate-400">Under Inspection</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D293F]/70 border border-emerald-500/30 backdrop-blur-xl space-y-2 shadow-success-glow">
            <div className="flex items-center justify-between text-emerald-300">
              <span className="text-xs font-mono uppercase font-semibold">Verified Safe</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold font-mono text-emerald-400">{verifiedCount}</span>
              <span className="text-[11px] font-mono font-semibold text-emerald-400">100% Pass Rate</span>
            </div>
          </div>

        </div>

        {/* INNOVATION HIGHLIGHT BANNER */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0D293F] via-[#0A1F32] to-[#0D293F] border border-[#38D9FF]/30 flex flex-col md:flex-row items-center justify-between gap-4 shadow-cyber">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#00A8FF]/20 text-[#38D9FF]">
              <Sparkles className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">TrustGuard Multimodal Intelligence Engine</h3>
                <JudgeBadge text="Explainable Risk" variant="cyan" />
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                AI score is not absolute proof. High-risk cases are automatically dispatched for out-of-band human verification.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/trust-graph')}
            className="px-4 py-2 rounded-xl bg-[#00A8FF]/15 border border-[#00A8FF]/40 text-[#38D9FF] hover:bg-[#00A8FF]/30 text-xs font-semibold shrink-0 transition-all"
          >
            Launch Trust Graph →
          </button>
        </div>

        {/* MAIN SECTION: RECENT VERIFICATION CASES TABLE */}
        <div className="rounded-2xl bg-[#0D293F]/70 border border-[#38D9FF]/20 backdrop-blur-xl p-5 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-white">Recent Verification Cases</h2>
              <p className="text-xs text-slate-400">All submitted digital trust analysis sessions</p>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search case name, identity..."
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#38D9FF]"
                />
              </div>

              <select
                value={filterRisk}
                onChange={e => setFilterRisk(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#38D9FF]"
              >
                <option value="ALL">All Risk Levels</option>
                <option value="HIGH">High Risk</option>
                <option value="MEDIUM">Medium Risk</option>
                <option value="LOW">Low Risk</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#061522] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Case ID</th>
                  <th className="py-3 px-4">Case Name</th>
                  <th className="py-3 px-4">Claimed Identity</th>
                  <th className="py-3 px-4">Risk Level</th>
                  <th className="py-3 px-4">Confidence</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredCases.map(c => (
                  <tr
                    key={c.id}
                    className="hover:bg-[#113552]/60 cursor-pointer transition-colors"
                    onClick={() => navigate(`/case/${c.id}`)}
                  >
                    <td className="py-3.5 px-4 font-mono text-[#38D9FF] font-semibold">{c.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-white max-w-xs truncate">{c.caseName}</td>
                    <td className="py-3.5 px-4 text-slate-300">{c.claimedIdentity}</td>
                    <td className="py-3.5 px-4">
                      <RiskBadge level={c.risk} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-200">{c.confidenceScore}%</td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                        c.status === 'VERIFIED' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                        c.status === 'FLAGGED' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => navigate(`/verify/result/${c.id}`)}
                        className="px-3 py-1 rounded-lg bg-[#00A8FF]/15 text-[#38D9FF] hover:bg-[#00A8FF]/30 font-semibold text-[11px] transition-all flex items-center gap-1 ml-auto"
                      >
                        <span>View Result</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </AppLayout>
  );
};

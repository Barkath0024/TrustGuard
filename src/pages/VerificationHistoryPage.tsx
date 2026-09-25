import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import {
  History,
  Search,
  Filter,
  Download,
  ChevronRight,
  ShieldCheck,
  ShieldAlert,
  FileSpreadsheet
} from 'lucide-react';
import { getStoredCases } from '../services/storage';
import { RiskBadge } from '../components/common/RiskBadge';
import { useToast } from '../components/common/Toast';

export const VerificationHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const cases = getStoredCases();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.caseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.claimedIdentity.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = filterRisk === 'ALL' || c.risk === filterRisk;
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    return matchesSearch && matchesRisk && matchesStatus;
  });

  const handleExportBatchReport = () => {
    const reportData = {
      exportedAt: new Date().toISOString(),
      totalRecords: filteredCases.length,
      cases: filteredCases
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `TrustGuard_History_Export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('success', 'History Export Complete', `Exported ${filteredCases.length} case records to JSON.`);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-[#38D9FF] font-mono text-xs uppercase font-semibold">
              <History className="w-4 h-4" />
              <span>Audit History Ledger</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">Verification History</h1>
            <p className="text-xs text-slate-400">Searchable ledger of all historical digital trust evaluations</p>
          </div>

          <button
            onClick={handleExportBatchReport}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00A8FF] to-[#38D9FF] text-[#061522] font-bold text-xs uppercase tracking-wider shadow-cyber hover:shadow-cyber-lg flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export History Report</span>
          </button>
        </div>

        {/* CONTROLS BAR */}
        <div className="p-4 rounded-2xl bg-[#0D293F]/70 border border-[#38D9FF]/20 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search case ID, name, identity..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#38D9FF]"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono">Risk:</span>
              <select
                value={filterRisk}
                onChange={e => setFilterRisk(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#38D9FF]"
              >
                <option value="ALL">All Risks</option>
                <option value="HIGH">High Risk</option>
                <option value="MEDIUM">Medium Risk</option>
                <option value="LOW">Low Risk</option>
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono">Status:</span>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-[#38D9FF]"
              >
                <option value="ALL">All Statuses</option>
                <option value="VERIFIED">Verified</option>
                <option value="FLAGGED">Flagged</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="rounded-2xl bg-[#0D293F]/70 border border-[#38D9FF]/20 backdrop-blur-xl p-4 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#061522] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Case Title</th>
                <th className="py-3 px-4">Subject Identity</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Confidence</th>
                <th className="py-3 px-4">Evidence Count</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Inspect</th>
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
                  <td className="py-3.5 px-4 font-mono text-slate-400">{c.evidence.length} artifact(s)</td>
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
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/case/${c.id}`);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-auto"
                    >
                      <ChevronRight className="w-4 h-4 text-[#38D9FF]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </AppLayout>
  );
};

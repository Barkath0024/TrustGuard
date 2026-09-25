import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import {
  FolderKanban,
  Image as ImageIcon,
  Video as VideoIcon,
  Mic,
  FileText,
  FileCode,
  Globe,
  Eye,
  Filter,
  Search,
  X,
  Sparkles,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import { getStoredCases } from '../services/storage';
import { EvidenceItem, EvidenceType } from '../types';
import { RiskBadge } from '../components/common/RiskBadge';
import { useToast } from '../components/common/Toast';

export const EvidenceExplorerPage: React.FC = () => {
  const { showToast } = useToast();
  const cases = getStoredCases();
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectItem, setInspectItem] = useState<{ item: EvidenceItem; caseName: string } | null>(null);

  // Flatten all evidence items across cases
  const allEvidence = cases.flatMap(c => c.evidence.map(e => ({ item: e, caseName: c.caseName, caseId: c.id, caseRisk: c.risk })));

  const filteredEvidence = allEvidence.filter(e => {
    const matchesFilter = activeFilter === 'ALL' || e.item.type === activeFilter;
    const matchesSearch = e.item.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.caseName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIcon = (type: EvidenceType) => {
    switch (type) {
      case 'IMAGE': return <ImageIcon className="w-5 h-5 text-[#38D9FF]" />;
      case 'VIDEO': return <VideoIcon className="w-5 h-5 text-purple-400" />;
      case 'AUDIO': return <Mic className="w-5 h-5 text-amber-400" />;
      case 'DOCUMENT': return <FileCode className="w-5 h-5 text-emerald-400" />;
      case 'TEXT': return <FileText className="w-5 h-5 text-cyan-400" />;
      case 'URL': return <Globe className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-[#38D9FF] font-mono text-xs uppercase font-semibold">
              <FolderKanban className="w-4 h-4" />
              <span>Multimodal Forensic Vault</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">Evidence Explorer</h1>
            <p className="text-xs text-slate-400">
              Inspect raw spectral analysis, anomaly detection, and forensic telemetry across all ingested evidence.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search filename or case..."
              className="pl-10 pr-4 py-2 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#38D9FF]"
            />
          </div>
        </div>

        {/* FILTERS TABS */}
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'IMAGE', 'VIDEO', 'AUDIO', 'TEXT', 'DOCUMENT', 'URL'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === tab
                  ? 'bg-gradient-to-r from-[#00A8FF] to-[#38D9FF] text-[#061522] shadow-cyber'
                  : 'bg-[#0D293F]/80 text-slate-300 hover:bg-[#113552] hover:text-white border border-slate-700/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* EVIDENCE CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvidence.map(({ item, caseName, caseId, caseRisk }, index) => (
            <div
              key={`${item.id}_${index}`}
              className="p-5 rounded-2xl bg-[#0D293F]/70 border border-slate-700/80 hover:border-[#38D9FF]/50 backdrop-blur-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-[#061522] border border-slate-800">
                    {getIcon(item.type)}
                  </div>
                  <RiskBadge level={caseRisk} size="sm" />
                </div>

                {item.previewUrl && (
                  <div className="w-full h-36 rounded-xl overflow-hidden border border-slate-800 bg-[#061522]">
                    <img src={item.previewUrl} alt={item.filename} className="w-full h-full object-cover" />
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-mono text-[#38D9FF] font-semibold">{caseId}</span>
                  <h3 className="text-sm font-bold text-white truncate mt-0.5">{item.filename}</h3>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{caseName}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="p-2 rounded-lg bg-[#061522] border border-slate-800">
                    <span className="text-slate-500 block text-[9px]">TYPE</span>
                    <span className="text-slate-200">{item.type}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#061522] border border-slate-800">
                    <span className="text-slate-500 block text-[9px]">INTEGRITY</span>
                    <span className={`font-bold ${item.integrityScore < 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {item.integrityScore}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">{item.fileSize}</span>
                <button
                  onClick={() => setInspectItem({ item, caseName })}
                  className="px-3 py-1 rounded-lg bg-[#00A8FF]/15 text-[#38D9FF] hover:bg-[#00A8FF]/30 font-semibold text-xs flex items-center gap-1 transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Artifact</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* INSPECT MODAL */}
      {inspectItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="max-w-xl w-full rounded-2xl bg-[#0D293F] border border-[#38D9FF]/40 p-6 space-y-4 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#38D9FF] uppercase font-semibold">Forensic Telemetry Inspector</span>
                <h3 className="text-base font-bold text-white mt-0.5">{inspectItem.item.filename}</h3>
              </div>
              <button onClick={() => setInspectItem(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#061522] border border-slate-800 space-y-1">
                <p className="text-slate-400 font-mono text-[10px]">CASE CONTEXT</p>
                <p className="text-white font-semibold">{inspectItem.caseName}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 font-mono">
                <div className="p-3 rounded-xl bg-[#061522] border border-slate-800">
                  <p className="text-slate-400 text-[10px]">MEDIA INTEGRITY SCORE</p>
                  <p className="text-lg font-bold text-[#38D9FF] mt-0.5">{inspectItem.item.integrityScore}%</p>
                </div>
                <div className="p-3 rounded-xl bg-[#061522] border border-slate-800">
                  <p className="text-slate-400 text-[10px]">ANALYSIS STATUS</p>
                  <p className="text-sm font-bold text-emerald-400 mt-1">{inspectItem.item.status}</p>
                </div>
              </div>

              {inspectItem.item.anomaliesDetected.length > 0 && (
                <div className="p-3 rounded-xl bg-[#061522] border border-rose-500/30 text-rose-300 space-y-1">
                  <p className="text-rose-400 font-mono text-[10px] font-bold uppercase">Detected Forensic Anomalies</p>
                  <ul className="list-disc list-inside space-y-1 text-[11px]">
                    {inspectItem.item.anomaliesDetected.map((anom, i) => (
                      <li key={i}>{anom}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectItem(null)}
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

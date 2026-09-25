import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { InteractiveTrustGraph } from '../components/graph/InteractiveTrustGraph';
import { getStoredCases } from '../services/storage';
import { JudgeBadge } from '../components/common/JudgeBadge';
import { Network, Sparkles, Shield, RefreshCw } from 'lucide-react';
import { useToast } from '../components/common/Toast';

export const TrustGraphPage: React.FC = () => {
  const { showToast } = useToast();
  const cases = getStoredCases();
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || 'TG-1024');

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const handleRefreshGraph = () => {
    showToast('info', 'Trust Graph Re-compiled', 'Recalculated multimodal edge weights and node distances.');
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#38D9FF] uppercase font-semibold">Cross-Modal Synthesis Core</span>
              <JudgeBadge text="Trust Graph" variant="purple" />
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">Interactive Trust Graph Explorer</h1>
            <p className="text-xs text-slate-400">
              Visualizes cross-modal correlation, biometric mismatch vectors, and evidence conflict topology.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedCaseId}
              onChange={e => setSelectedCaseId(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-[#0D293F] border border-[#38D9FF]/30 text-xs font-semibold text-white focus:outline-none focus:border-[#38D9FF]"
            >
              {cases.map(c => (
                <option key={c.id} value={c.id}>
                  {c.id}: {c.caseName} ({c.risk} RISK)
                </option>
              ))}
            </select>

            <button
              onClick={handleRefreshGraph}
              className="p-2 rounded-xl bg-[#0D293F] border border-slate-700 text-slate-300 hover:text-white hover:border-[#38D9FF] transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-[#38D9FF]" />
            </button>
          </div>
        </div>

        {/* Graph Display */}
        <InteractiveTrustGraph
          nodes={selectedCase.trustGraph.nodes}
          edges={selectedCase.trustGraph.edges}
          height={480}
        />

        {/* Graph Insights Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#0D293F]/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#38D9FF]">Core Topology</span>
            <p className="text-xs font-bold text-white">Bipartite Discrepancy Matrix</p>
            <p className="text-xs text-slate-300">
              Red dashed lines highlight cross-modal conflicts where evidence channels contradict identity references.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D293F]/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono uppercase text-emerald-400">Verified Support</span>
            <p className="text-xs font-bold text-white">Cryptographic Passport Pass</p>
            <p className="text-xs text-slate-300">
              Solid green lines indicate confirmed matches against trusted organizational identity references.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D293F]/60 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono uppercase text-amber-400">Node Inspection</span>
            <p className="text-xs font-bold text-white">Explainable Telemetry</p>
            <p className="text-xs text-slate-300">
              Clicking any node renders acoustic formant delta, latent vector loss, and NLP threat coefficients.
            </p>
          </div>
        </div>

      </div>
    </AppLayout>
  );
};

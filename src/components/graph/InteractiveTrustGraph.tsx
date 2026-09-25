import React, { useState } from 'react';
import { TrustGraphNode, TrustGraphEdge } from '../../types';
import { ShieldAlert, ShieldCheck, HelpCircle, Layers, X, Sparkles, AlertCircle, Info } from 'lucide-react';

interface InteractiveTrustGraphProps {
  nodes: TrustGraphNode[];
  edges: TrustGraphEdge[];
  height?: number;
}

export const InteractiveTrustGraph: React.FC<InteractiveTrustGraphProps> = ({
  nodes,
  edges,
  height = 420
}) => {
  const [selectedNode, setSelectedNode] = useState<TrustGraphNode | null>(nodes[0] || null);

  // Position nodes in a clean circular / bipartite layout if x and y are not set
  const width = 800;
  const centerY = height / 2;
  const centerX = width / 2;

  const positions: Record<string, { x: number; y: number }> = {
    CLAIM: { x: centerX, y: centerY - 120 },
    IMAGE: { x: centerX - 240, y: centerY - 40 },
    FACE: { x: centerX - 260, y: centerY + 80 },
    VOICE: { x: centerX - 120, y: centerY + 130 },
    TEXT: { x: centerX + 120, y: centerY + 130 },
    IDENTITY: { x: centerX + 260, y: centerY + 80 },
    CONTEXT: { x: centerX + 240, y: centerY - 40 },
    SOURCE: { x: centerX, y: centerY + 30 }
  };

  const getNodePos = (node: TrustGraphNode, index: number) => {
    if (positions[node.type]) return positions[node.type];
    // Fallback circular layout calculation
    const angle = (index / nodes.length) * 2 * Math.PI - Math.PI / 2;
    return {
      x: centerX + 220 * Math.cos(angle),
      y: centerY + 140 * Math.sin(angle)
    };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Identity Concern':
      case 'Media Concern':
        return { bg: '#F05260', stroke: '#F05260', glow: 'rgba(240, 82, 96, 0.5)', text: 'text-rose-400' };
      case 'Context Risk':
        return { bg: '#F5B942', stroke: '#F5B942', glow: 'rgba(245, 185, 66, 0.5)', text: 'text-amber-400' };
      case 'Verified':
        return { bg: '#22C88A', stroke: '#22C88A', glow: 'rgba(34, 200, 138, 0.5)', text: 'text-emerald-400' };
      default:
        return { bg: '#00A8FF', stroke: '#38D9FF', glow: 'rgba(0, 168, 255, 0.4)', text: 'text-[#38D9FF]' };
    }
  };

  return (
    <div className="relative w-full bg-[#061522] rounded-2xl border border-[#38D9FF]/20 shadow-cyber overflow-hidden">
      
      {/* Graph Header Controls */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800/80 bg-[#0D293F]/50 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#00A8FF]/15 border border-[#00A8FF]/30">
            <Sparkles className="w-4 h-4 text-[#38D9FF]" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Interactive Trust Graph</h3>
            <p className="text-[10px] text-slate-400">Cross-Modal Evidence Correlation Network</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2.5 h-0.5 bg-rose-500 rounded"></span>
            <span className="text-[11px] font-mono">Conflict / Discrepancy</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2.5 h-0.5 bg-emerald-500 rounded"></span>
            <span className="text-[11px] font-mono">Verified Match</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        
        {/* SVG Graph Visualization */}
        <div className="lg:col-span-2 relative p-4 flex items-center justify-center min-h-[380px]">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[460px] overflow-visible">
            <defs>
              <filter id="glow-danger" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Render Edge Lines */}
            {edges.map((edge, idx) => {
              const srcNode = nodes.find(n => n.id === edge.source);
              const tgtNode = nodes.find(n => n.id === edge.target);
              if (!srcNode || !tgtNode) return null;

              const srcIdx = nodes.indexOf(srcNode);
              const tgtIdx = nodes.indexOf(tgtNode);
              const srcPos = getNodePos(srcNode, srcIdx);
              const tgtPos = getNodePos(tgtNode, tgtIdx);

              const isConflict = edge.status === 'conflict';
              const lineColor = isConflict ? '#F05260' : '#22C88A';
              const isSelectedEdge = selectedNode?.id === edge.source || selectedNode?.id === edge.target;

              return (
                <g key={`edge-${idx}`}>
                  <line
                    x1={srcPos.x}
                    y1={srcPos.y}
                    x2={tgtPos.x}
                    y2={tgtPos.y}
                    stroke={lineColor}
                    strokeWidth={isSelectedEdge ? 2.5 : 1.5}
                    strokeDasharray={isConflict ? "5,5" : "none"}
                    opacity={isSelectedEdge ? 0.9 : 0.4}
                    className={isConflict ? "animate-pulse" : ""}
                  />
                  {/* Animated pulse dot along line */}
                  <circle r="3" fill={lineColor} className="animate-ping opacity-60">
                    <animateMotion
                      path={`M ${srcPos.x} ${srcPos.y} L ${tgtPos.x} ${tgtPos.y}`}
                      dur={isConflict ? "2s" : "3.5s"}
                      repeatCount="indefinite"
                    />
                  </circle>

                  {/* Midpoint Label */}
                  <rect
                    x={(srcPos.x + tgtPos.x) / 2 - 40}
                    y={(srcPos.y + tgtPos.y) / 2 - 10}
                    width="80"
                    height="18"
                    rx="4"
                    fill="#061522"
                    stroke={lineColor}
                    strokeWidth="0.8"
                    opacity="0.85"
                  />
                  <text
                    x={(srcPos.x + tgtPos.x) / 2}
                    y={(srcPos.y + tgtPos.y) / 2 + 2}
                    fill={lineColor}
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Render Nodes */}
            {nodes.map((node, index) => {
              const pos = getNodePos(node, index);
              const style = getStatusColor(node.status);
              const isSelected = selectedNode?.id === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className="cursor-pointer transition-transform hover:scale-110"
                  onClick={() => setSelectedNode(node)}
                >
                  {/* Glowing Outer Ring */}
                  <circle
                    r={isSelected ? "32" : "26"}
                    fill="none"
                    stroke={style.stroke}
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    opacity={isSelected ? "1" : "0.7"}
                    filter={isSelected ? "url(#glow-cyan)" : undefined}
                    className="transition-all duration-300"
                  />

                  {/* Inner Node Circle */}
                  <circle
                    r={isSelected ? "24" : "20"}
                    fill="#0D293F"
                    stroke={style.stroke}
                    strokeWidth="1.5"
                  />

                  {/* Node Label Text */}
                  <text
                    y="-1"
                    fill="#FFFFFF"
                    fontSize={isSelected ? "11" : "10"}
                    fontWeight="700"
                    fontFamily="sans-serif"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {node.label}
                  </text>

                  {/* Score badge under node */}
                  <rect
                    x="-18"
                    y="14"
                    width="36"
                    height="14"
                    rx="3"
                    fill={style.bg}
                  />
                  <text
                    x="0"
                    y="21"
                    fill="#061522"
                    fontSize="9"
                    fontWeight="800"
                    fontFamily="monospace"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    {node.score}%
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Node Information Panel */}
        <div className="p-5 border-t lg:border-t-0 lg:border-l border-slate-800 bg-[#0D293F]/70 backdrop-blur-xl flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#38D9FF] font-semibold">
                    Node Category: {selectedNode.type}
                  </span>
                  <h4 className="text-base font-bold text-white mt-0.5">{selectedNode.label}</h4>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                  getStatusColor(selectedNode.status).text
                } bg-slate-900/60 border border-current/30`}>
                  {selectedNode.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 rounded-lg bg-[#061522]/80 border border-slate-800">
                  <p className="text-[10px] text-slate-400 font-mono uppercase">Integrity Score</p>
                  <p className="text-lg font-mono font-bold text-[#38D9FF] mt-0.5">{selectedNode.score}%</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#061522]/80 border border-slate-800">
                  <p className="text-[10px] text-slate-400 font-mono uppercase">Confidence</p>
                  <p className="text-sm font-semibold text-white mt-1">{selectedNode.confidence}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#061522]/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <Info className="w-3.5 h-3.5 text-[#38D9FF]" />
                  <span>Node Explanation</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {selectedNode.details}
                </p>
              </div>

              <div className="text-[11px] text-slate-400 p-2.5 rounded-lg bg-[#00A8FF]/5 border border-[#00A8FF]/20 font-mono">
                💡 Click any node on the graph canvas to inspect its cross-modal verification telemetry.
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full text-slate-400 py-8">
              <Layers className="w-8 h-8 text-slate-600 mb-2" />
              <p className="text-xs">Select a graph node to inspect detailed evidence metrics.</p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800/80 text-[10px] text-slate-400 font-mono flex items-center justify-between">
            <span>TRUST GRAPH ENGINE v2.0</span>
            <span className="text-emerald-400 font-bold">● ACTIVE CORRELATION</span>
          </div>
        </div>

      </div>
    </div>
  );
};

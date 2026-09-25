import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import {
  ShieldAlert,
  ShieldCheck,
  FolderKanban,
  Sparkles,
  TrendingUp,
  Activity,
  UserCheck,
  ChevronRight
} from 'lucide-react';
import { getStoredCases, getStoredUser } from '../services/storage';
import { RiskBadge } from '../components/common/RiskBadge';
import { JudgeBadge } from '../components/common/JudgeBadge';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const cases = getStoredCases();
  const user = getStoredUser();

  const totalCases = cases.length;
  const highRisk = cases.filter(c => c.risk === 'HIGH').length;
  const mediumRisk = cases.filter(c => c.risk === 'MEDIUM').length;
  const lowRisk = cases.filter(c => c.risk === 'LOW').length;
  const pendingCount = cases.filter(c => c.status === 'PENDING' || c.status === 'IN_REVIEW').length;
  const verifiedCount = cases.filter(c => c.status === 'VERIFIED').length;

  // Recharts Data
  const riskPieData = [
    { name: 'High Risk', value: highRisk, color: '#F05260' },
    { name: 'Medium Risk', value: mediumRisk, color: '#F5B942' },
    { name: 'Low Risk', value: lowRisk, color: '#22C88A' }
  ];

  const timeSeriesData = [
    { day: 'Mon', cases: 4, highRisk: 1 },
    { day: 'Tue', cases: 7, highRisk: 2 },
    { day: 'Wed', cases: 12, highRisk: 3 },
    { day: 'Thu', cases: 9, highRisk: 2 },
    { day: 'Fri', cases: 15, highRisk: 4 },
    { day: 'Sat', cases: 6, highRisk: 1 },
    { day: 'Sun', cases: totalCases, highRisk: highRisk }
  ];

  const evidenceTypeData = [
    { type: 'Audio / TTS', count: 18 },
    { type: 'Image / GAN', count: 24 },
    { type: 'Video Deepfake', count: 11 },
    { type: 'Text / Coercion', count: 14 },
    { type: 'Doc / Signature', count: 8 }
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-rose-500/30">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-rose-400 font-semibold">SOC Incident Monitoring Console</span>
              <JudgeBadge text="Human-in-the-Loop Admin" variant="purple" />
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">Admin Security Overview</h1>
            <p className="text-xs text-slate-400">Real-time incident triage, evidence correlation metrics and audit logs.</p>
          </div>

          <Link
            to="/admin/case/TG-1024"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-danger-glow flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Review Workspace</span>
          </Link>
        </div>

        {/* METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-[#0D293F]/70 border border-[#38D9FF]/20 backdrop-blur-xl space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase font-semibold">Total Ingested Cases</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold font-mono text-white">{totalCases}</span>
              <span className="text-[11px] font-mono text-emerald-400">+18% vs last week</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D293F]/70 border border-rose-500/40 backdrop-blur-xl space-y-2 shadow-danger-glow">
            <span className="text-xs font-mono text-rose-300 uppercase font-semibold">High Risk Threats</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold font-mono text-rose-400">{highRisk}</span>
              <span className="text-[11px] font-mono text-rose-300 font-bold">Action Needed</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D293F]/70 border border-amber-500/30 backdrop-blur-xl space-y-2">
            <span className="text-xs font-mono text-amber-300 uppercase font-semibold">Pending SOC Review</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold font-mono text-amber-400">{pendingCount}</span>
              <span className="text-[11px] font-mono text-amber-300">In Queue</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#0D293F]/70 border border-emerald-500/30 backdrop-blur-xl space-y-2 shadow-success-glow">
            <span className="text-xs font-mono text-emerald-300 uppercase font-semibold">Verified Safe</span>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold font-mono text-emerald-400">{verifiedCount}</span>
              <span className="text-[11px] font-mono text-emerald-400">Pass Rate 100%</span>
            </div>
          </div>

        </div>

        {/* CHARTS GRID USING RECHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Chart 1: Risk Distribution Pie Chart */}
          <div className="p-5 rounded-2xl bg-[#0D293F]/70 border border-slate-800 backdrop-blur-xl space-y-3">
            <h3 className="text-xs font-mono uppercase font-bold text-white">Risk Distribution Ratio</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#061522', borderColor: '#38D9FF', borderRadius: '12px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 text-xs font-mono">
              <span className="text-rose-400 font-bold">● High ({highRisk})</span>
              <span className="text-amber-400 font-bold">● Medium ({mediumRisk})</span>
              <span className="text-emerald-400 font-bold">● Low ({lowRisk})</span>
            </div>
          </div>

          {/* Chart 2: Cases Over Time Area Chart */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0D293F]/70 border border-slate-800 backdrop-blur-xl space-y-3">
            <h3 className="text-xs font-mono uppercase font-bold text-white">Cases & Threat Volume Over Time</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timeSeriesData}>
                  <defs>
                    <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00A8FF" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00A8FF" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#F05260" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#F05260" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#061522', borderColor: '#38D9FF', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="cases" stroke="#00A8FF" fillOpacity={1} fill="url(#colorCases)" />
                  <Area type="monotone" dataKey="highRisk" stroke="#F05260" fillOpacity={1} fill="url(#colorHigh)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Chart 3: Evidence Type Bar Chart */}
        <div className="p-5 rounded-2xl bg-[#0D293F]/70 border border-slate-800 backdrop-blur-xl space-y-3">
          <h3 className="text-xs font-mono uppercase font-bold text-white">Ingested Evidence Modality Breakdown</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evidenceTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="type" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#061522', borderColor: '#38D9FF', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#38D9FF" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PENDING CASE REVIEW QUEUE TABLE */}
        <div className="p-5 rounded-2xl bg-[#0D293F]/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase font-bold text-white">SOC Analyst Incident Review Queue</h3>
            <span className="text-xs text-rose-400 font-mono font-bold">{cases.length} Total Cases In Database</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#061522] text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Case ID</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Claimed Identity</th>
                  <th className="py-3 px-4">Risk</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Review Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {cases.map(c => (
                  <tr key={c.id} className="hover:bg-[#113552]/60 cursor-pointer">
                    <td className="py-3.5 px-4 font-mono text-[#38D9FF] font-semibold">{c.id}</td>
                    <td className="py-3.5 px-4 font-semibold text-white">{c.caseName}</td>
                    <td className="py-3.5 px-4 text-slate-300">{c.claimedIdentity}</td>
                    <td className="py-3.5 px-4">
                      <RiskBadge level={c.risk} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-200">{c.status}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => navigate(`/admin/case/${c.id}`)}
                        className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-semibold"
                      >
                        Review Case →
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

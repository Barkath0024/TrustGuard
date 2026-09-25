import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShieldPlus,
  FolderKanban,
  Network,
  History,
  IdCard,
  Bell,
  Settings,
  HelpCircle,
  ShieldAlert,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { getStoredUser } from '../../services/storage';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = true, onClose }) => {
  const user = getStoredUser();
  const location = useLocation();

  const mainNav = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'New Verification', path: '/verify/new', icon: ShieldPlus, highlight: true },
    { name: 'Evidence Explorer', path: '/evidence', icon: FolderKanban },
    { name: 'Trust Graph', path: '/trust-graph', icon: Network, badge: 'V2.0' },
    { name: 'Verification History', path: '/history', icon: History },
    { name: 'Trust Passport', path: '/passport', icon: IdCard },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Help & About', path: '/about', icon: HelpCircle },
  ];

  const adminNav = [
    { name: 'Admin Overview', path: '/admin', icon: ShieldAlert },
    { name: 'Case Review Workspace', path: '/admin/case/TG-1024', icon: Sparkles }
  ];

  return (
    <aside
      className={`fixed lg:sticky top-16 left-0 z-30 w-64 h-[calc(100vh-4rem)] bg-[#061522]/95 border-r border-[#38D9FF]/15 backdrop-blur-xl flex flex-col justify-between p-4 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div className="space-y-6 overflow-y-auto pr-1">
        
        {/* User Role Info Banner */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-[#0D293F] to-[#0A1F32] border border-[#38D9FF]/20 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-[#38D9FF] font-mono uppercase tracking-wider font-semibold">Active Session</p>
            <p className="text-xs font-bold text-white truncate max-w-[130px]">{user.name}</p>
          </div>
          <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
            user.role === 'admin' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}>
            {user.role}
          </span>
        </div>

        {/* Navigation Group */}
        <div>
          <p className="px-3 text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold mb-2">
            Verification Core
          </p>
          <nav className="space-y-1">
            {mainNav.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00A8FF]/20 to-[#0A1F32] text-[#38D9FF] border border-[#00A8FF]/40 shadow-[0_0_15px_rgba(0,168,255,0.2)]'
                      : item.highlight
                      ? 'bg-[#00A8FF]/10 text-white border border-[#00A8FF]/30 hover:bg-[#00A8FF]/20'
                      : 'text-slate-300 hover:bg-[#0D293F]/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#38D9FF]' : item.highlight ? 'text-[#00A8FF]' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#38D9FF]/20 text-[#38D9FF] rounded">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Admin Navigation Section */}
        <div>
          <p className="px-3 text-[10px] font-mono tracking-widest text-rose-400 uppercase font-semibold mb-2 flex items-center justify-between">
            <span>SOC Incident Admin</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
          </p>
          <nav className="space-y-1">
            {adminNav.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-danger-glow'
                      : 'text-rose-200/80 hover:bg-rose-500/10 hover:text-rose-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-rose-400" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </NavLink>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Footer Banner */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
        <div className="p-2.5 rounded-lg bg-[#0D293F]/40 border border-slate-800">
          <p className="font-semibold text-slate-200">Multimodal AI Core v4.2</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Explainable Digital Trust Engine</p>
        </div>
      </div>
    </aside>
  );
};

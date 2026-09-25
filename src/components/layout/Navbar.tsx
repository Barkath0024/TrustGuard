import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Bell, Play, User as UserIcon, LogOut, CheckCheck, ExternalLink, Sparkles, ChevronDown, Menu, X } from 'lucide-react';
import { getStoredUser, setStoredUser, logoutUser, DEFAULT_USER, DEFAULT_ADMIN, getStoredNotifications, markAllNotificationsRead, loadDemoScenario } from '../../services/storage';
import { JudgeBadge } from '../common/JudgeBadge';
import { useToast } from '../common/Toast';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [currentUser, setCurrentUser] = useState(getStoredUser());
  const [notifications, setNotifications] = useState(getStoredNotifications());
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleDemoModeClick = () => {
    const demoCase = loadDemoScenario();
    showToast('info', 'Demo Mode Activated', 'Loaded scenario: Manager Impersonation — Urgent Wire Transfer');
    navigate(`/verify/result/${demoCase.id}`);
  };

  const handleSwitchUserRole = (targetRole: 'user' | 'admin') => {
    const newUser = targetRole === 'admin' ? DEFAULT_ADMIN : DEFAULT_USER;
    setStoredUser(newUser);
    setCurrentUser(newUser);
    setShowUserMenu(false);
    showToast('success', `Switched to ${targetRole === 'admin' ? 'Admin SOC Analyst' : 'Standard User'} Mode`);
    if (targetRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    logoutUser();
    showToast('info', 'Logged out');
    navigate('/login');
  };

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    setNotifications(getStoredNotifications());
    showToast('success', 'All notifications marked as read');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#061522]/90 backdrop-blur-xl border-b border-[#38D9FF]/15 shadow-cyber">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#00A8FF] to-[#0A1F32] p-0.5 shadow-[0_0_15px_rgba(0,168,255,0.4)] group-hover:shadow-[0_0_25px_rgba(56,217,255,0.7)] transition-all">
              <div className="w-full h-full bg-[#061522] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#38D9FF] group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-white via-slate-100 to-[#38D9FF] bg-clip-text text-transparent">
                  TRUSTGUARD
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-[#00A8FF] uppercase font-semibold">
                AI FOR DIGITAL TRUST
              </span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-2 ml-4">
            <JudgeBadge text="Cross-Modal Correlation" variant="cyan" />
            <JudgeBadge text="Trust Graph Engine" variant="purple" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* DEMO MODE BUTTON */}
          <button
            onClick={handleDemoModeClick}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500/20 via-amber-500/30 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 border border-amber-500/50 text-amber-300 font-medium text-xs shadow-[0_0_15px_rgba(245,185,66,0.2)] hover:shadow-[0_0_20px_rgba(245,185,66,0.4)] transition-all animate-pulse"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Demo Mode</span>
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-amber-500/30 rounded text-amber-200 uppercase">Live</span>
          </button>

          {/* New Verification Quick Button */}
          <Link
            to="/verify/new"
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#00A8FF] hover:bg-[#38D9FF] text-[#061522] font-semibold text-xs transition-all shadow-[0_0_15px_rgba(0,168,255,0.4)] hover:shadow-[0_0_20px_rgba(56,217,255,0.7)]"
          >
            <span>+ New Verification</span>
          </Link>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-lg bg-[#0D293F]/60 border border-slate-700/60 hover:border-[#38D9FF]/50 text-slate-300 hover:text-white transition-all"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accentDanger text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[#0D293F] border border-[#38D9FF]/20 shadow-2xl backdrop-blur-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-[#38D9FF]" />
                    <span className="font-semibold text-xs text-white uppercase tracking-wider">Notifications</span>
                  </div>
                  <button
                    onClick={handleMarkAllRead}
                    className="text-[11px] text-[#38D9FF] hover:underline flex items-center gap-1"
                  >
                    <CheckCheck className="w-3 h-3" /> Mark all read
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60 my-2">
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        if (n.caseId) navigate(`/case/${n.caseId}`);
                        setShowNotifMenu(false);
                      }}
                      className={`p-2.5 rounded-lg cursor-pointer hover:bg-[#113552] transition-colors ${
                        !n.read ? 'bg-[#00A8FF]/5' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-medium text-xs text-white">{n.title}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{n.date}</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>

                <Link
                  to="/notifications"
                  onClick={() => setShowNotifMenu(false)}
                  className="block text-center text-xs text-[#38D9FF] hover:underline pt-2 border-t border-slate-700/50"
                >
                  View all notifications →
                </Link>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1.5 rounded-lg bg-[#0D293F]/60 border border-slate-700/60 hover:border-[#38D9FF]/50 transition-all"
            >
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-[#00A8FF]/40"
              />
              <span className="hidden md:inline font-medium text-xs text-slate-200">{currentUser.name}</span>
              <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded uppercase ${
                currentUser.role === 'admin' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-[#00A8FF]/20 text-[#38D9FF] border border-[#00A8FF]/40'
              }`}>
                {currentUser.role}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0D293F] border border-[#38D9FF]/20 shadow-2xl backdrop-blur-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-700/50">
                  <p className="font-semibold text-xs text-white">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => handleSwitchUserRole(currentUser.role === 'admin' ? 'user' : 'admin')}
                    className="w-full text-left px-3 py-2 text-xs text-amber-300 hover:bg-slate-800/70 rounded-lg flex items-center justify-between"
                  >
                    <span>Switch to {currentUser.role === 'admin' ? 'Standard User' : 'Admin SOC'}</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    to="/passport"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/70 rounded-lg"
                  >
                    Trust Passport
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="block px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/70 rounded-lg"
                  >
                    Settings
                  </Link>
                </div>

                <div className="pt-1 border-t border-slate-700/50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

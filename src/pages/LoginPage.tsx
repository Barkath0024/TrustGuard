import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Sparkles, Lock, Mail, ArrowRight, X, KeyRound, UserCheck, ShieldAlert } from 'lucide-react';
import { setStoredUser, DEFAULT_USER, DEFAULT_ADMIN } from '../services/storage';
import { useToast } from '../components/common/Toast';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState('demo@trustguard.ai');
  const [password, setPassword] = useState('password123');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('error', 'Validation Error', 'Please enter both email and password.');
      return;
    }

    if (email.includes('admin')) {
      setStoredUser(DEFAULT_ADMIN);
      showToast('success', 'Logged in as Admin SOC Lead', 'Welcome back, Alex Vance.');
      navigate('/admin');
    } else {
      setStoredUser(DEFAULT_USER);
      showToast('success', 'Logged in successfully', 'Welcome back, Sarah Jenkins.');
      navigate('/dashboard');
    }
  };

  const handleQuickDemoUser = () => {
    setStoredUser(DEFAULT_USER);
    showToast('success', 'Logged in as Standard User', 'Demo mode initialized for Sarah Jenkins.');
    navigate('/dashboard');
  };

  const handleQuickDemoAdmin = () => {
    setStoredUser(DEFAULT_ADMIN);
    showToast('success', 'Logged in as Admin SOC Analyst', 'Demo mode initialized for Alex Vance.');
    navigate('/admin');
  };

  const handleSendResetLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      showToast('error', 'Please enter your email');
      return;
    }
    setShowForgotModal(false);
    showToast('success', 'Password Reset Simulated', `Password reset link simulated successfully for ${forgotEmail}.`);
    setForgotEmail('');
  };

  return (
    <div className="min-h-screen bg-[#061522] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#00A8FF]/15 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-md w-full rounded-3xl bg-[#0D293F]/80 border border-[#38D9FF]/20 backdrop-blur-2xl shadow-cyber p-8 space-y-6 relative z-10">
        
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A8FF] to-[#0A1F32] p-0.5 shadow-cyber">
              <div className="w-full h-full bg-[#061522] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#38D9FF]" />
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-wider text-white">TRUSTGUARD</span>
          </Link>
          <p className="text-xs text-slate-400">Sign in to your digital trust verification console</p>
        </div>

        {/* Quick Demo Login Triggers */}
        <div className="p-3 rounded-2xl bg-[#061522]/90 border border-slate-800 space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold text-center">
            ⚡ Quick Hackathon Instant Access
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickDemoUser}
              className="px-3 py-2 rounded-xl bg-[#00A8FF]/10 border border-[#00A8FF]/30 hover:bg-[#00A8FF]/20 text-[#38D9FF] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Demo User</span>
            </button>
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#061522] border border-slate-700/80 focus:border-[#38D9FF] focus:outline-none text-xs text-white placeholder-slate-500 transition-colors"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] text-[#38D9FF] hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#061522] border border-slate-700/80 focus:border-[#38D9FF] focus:outline-none text-xs text-white transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00A8FF] to-[#38D9FF] text-[#061522] font-bold text-xs uppercase tracking-wider shadow-cyber hover:shadow-cyber-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Login to Console</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer link */}
        <div className="text-center pt-2 text-xs text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#38D9FF] font-semibold hover:underline">
            Register for TrustGuard
          </Link>
        </div>

      </div>

      {/* FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="max-w-sm w-full rounded-2xl bg-[#0D293F] border border-[#38D9FF]/30 p-6 space-y-4 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <KeyRound className="w-4 h-4 text-[#38D9FF]" />
                <span>Reset Password</span>
              </div>
              <button onClick={() => setShowForgotModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Enter your registered corporate email address to receive a simulated reset token.
            </p>

            <form onSubmit={handleSendResetLink} className="space-y-3">
              <input
                type="email"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                placeholder="name@company.com"
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white focus:border-[#38D9FF] focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#00A8FF] text-[#061522] font-bold text-xs hover:bg-[#38D9FF] transition-colors"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, User, Mail, Lock, Building, ArrowRight } from 'lucide-react';
import { setStoredUser } from '../services/storage';
import { useToast } from '../components/common/Toast';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrganization] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      showToast('error', 'Validation Error', 'Please fill in all required fields.');
      return;
    }

    const newUser = {
      id: `u_${Date.now()}`,
      name,
      email,
      role,
      organization: organization || 'Apex Global',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'
    };

    setStoredUser(newUser);
    showToast('success', 'Account Registered Successfully!', `Welcome to TrustGuard, ${name}.`);
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#061522] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#00A8FF]/15 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-md w-full rounded-3xl bg-[#0D293F]/80 border border-[#38D9FF]/20 backdrop-blur-2xl shadow-cyber p-8 space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A8FF] to-[#0A1F32] p-0.5 shadow-cyber">
              <div className="w-full h-full bg-[#061522] rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#38D9FF]" />
              </div>
            </div>
            <span className="font-extrabold text-xl tracking-wider text-white">TRUSTGUARD</span>
          </Link>
          <p className="text-xs text-slate-400">Register new corporate verification account</p>
        </div>

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#061522] border border-slate-700/80 focus:border-[#38D9FF] focus:outline-none text-xs text-white"
                placeholder="Sarah Jenkins"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#061522] border border-slate-700/80 focus:border-[#38D9FF] focus:outline-none text-xs text-white"
                placeholder="s.jenkins@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Organization</label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={organization}
                onChange={e => setOrganization(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#061522] border border-slate-700/80 focus:border-[#38D9FF] focus:outline-none text-xs text-white"
                placeholder="Apex Global Financials"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#061522] border border-slate-700/80 focus:border-[#38D9FF] focus:outline-none text-xs text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Account Scope</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`py-2 rounded-xl text-xs font-semibold border ${
                  role === 'user' ? 'bg-[#00A8FF]/20 text-[#38D9FF] border-[#00A8FF]' : 'bg-[#061522] text-slate-400 border-slate-800'
                }`}
              >
                Standard User
              </button>
              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`py-2 rounded-xl text-xs font-semibold border ${
                  role === 'admin' ? 'bg-rose-500/20 text-rose-300 border-rose-500' : 'bg-[#061522] text-slate-400 border-slate-800'
                }`}
              >
                SOC Admin
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00A8FF] to-[#38D9FF] text-[#061522] font-bold text-xs uppercase tracking-wider shadow-cyber hover:shadow-cyber-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-[#38D9FF] font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

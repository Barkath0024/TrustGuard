import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import {
  IdCard,
  ShieldCheck,
  Plus,
  Mail,
  Phone,
  Building,
  Mic,
  Camera,
  CheckCircle2,
  X,
  Sparkles,
  Lock,
  Info
} from 'lucide-react';
import { getStoredPassport, savePassport } from '../services/storage';
import { TrustPassport, TrustPassportItem } from '../types';
import { useToast } from '../components/common/Toast';

export const TrustPassportPage: React.FC = () => {
  const { showToast } = useToast();
  const [passport, setPassport] = useState<TrustPassport>(getStoredPassport());
  const [showAddModal, setShowAddModal] = useState(false);

  const [newType, setNewType] = useState<TrustPassportItem['type']>('Email');
  const [newIdentifier, setNewIdentifier] = useState('');

  const handleAddMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdentifier) return;

    const newMethod: TrustPassportItem = {
      id: `m_${Date.now()}`,
      type: newType,
      identifier: newIdentifier,
      verifiedAt: new Date().toISOString().split('T')[0],
      status: 'VERIFIED',
      confidence: 99
    };

    const updated: TrustPassport = {
      ...passport,
      verifiedCount: passport.verifiedCount + 1,
      updatedAt: new Date().toISOString(),
      methods: [...passport.methods, newMethod]
    };

    savePassport(updated);
    setPassport(updated);
    setShowAddModal(false);
    setNewIdentifier('');
    showToast('success', 'Verification Method Registered', `${newType} (${newIdentifier}) baseline added to reference profile.`);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-[#38D9FF] font-mono text-xs uppercase font-semibold">
              <IdCard className="w-4 h-4" />
              <span>Consent-Based Reference Profile</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">Trust Passport</h1>
            <p className="text-xs text-slate-400">
              Trusted reference profile for biometric baselines, corporate IDs, and verified voice signatures.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00A8FF] to-[#38D9FF] text-[#061522] font-bold text-xs uppercase tracking-wider shadow-cyber flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Verification Method</span>
          </button>
        </div>

        {/* PASSPORT PROFILE CARD */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0D293F] via-[#0A1F32] to-[#0D293F] border border-[#38D9FF]/30 backdrop-blur-2xl shadow-cyber flex flex-col sm:flex-row items-center gap-6">
          <img
            src={passport.avatarUrl}
            alt={passport.userName}
            className="w-24 h-24 rounded-2xl object-cover border-2 border-[#00A8FF]/60 shadow-cyber"
          />

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-extrabold text-white">{passport.userName}</h2>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>{passport.status} REFERENCE</span>
              </span>
            </div>

            <p className="text-xs font-semibold text-slate-300">
              {passport.role} • <span className="text-[#38D9FF]">{passport.organization}</span>
            </p>
            <p className="text-xs text-slate-400 font-mono">
              Corporate Reference: <span className="text-slate-200">{passport.userEmail}</span>
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>Verified Channels: <strong className="text-white">{passport.methods.length}</strong></span>
              <span>Updated: <strong className="text-slate-300">{new Date(passport.updatedAt).toLocaleDateString()}</strong></span>
            </div>
          </div>
        </div>

        {/* TRUSTED METHODS GRID */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#38D9FF] font-bold">
            Registered Verification Methods & Biometric Baselines
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {passport.methods.map(method => (
              <div
                key={method.id}
                className="p-4 rounded-2xl bg-[#0D293F]/70 border border-slate-700/80 hover:border-[#38D9FF]/40 backdrop-blur-xl transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-[#061522] text-[#38D9FF]">
                      {method.type === 'Email' && <Mail className="w-4 h-4" />}
                      {method.type === 'Phone' && <Phone className="w-4 h-4" />}
                      {method.type === 'Org ID' && <Building className="w-4 h-4" />}
                      {method.type === 'Face Reference' && <Camera className="w-4 h-4" />}
                      {method.type === 'Voice Reference' && <Mic className="w-4 h-4" />}
                    </div>
                    <span className="font-bold text-xs text-white">{method.type}</span>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {method.confidence}% MATCH RATING
                  </span>
                </div>

                <p className="text-xs font-mono text-slate-300 bg-[#061522] p-2.5 rounded-xl border border-slate-800">
                  {method.identifier}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                  <span>Registered: {method.verifiedAt}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Active Baseline
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-[#061522] border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
          <Info className="w-5 h-5 text-[#38D9FF] shrink-0" />
          <p>
            The Trust Passport operates as an organizational consent-based reference profile to evaluate incoming multimodal requests. It does not perform immutable public ledger tracking.
          </p>
        </div>

      </div>

      {/* ADD METHOD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="max-w-md w-full rounded-2xl bg-[#0D293F] border border-[#38D9FF]/40 p-6 space-y-4 relative shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Sparkles className="w-4 h-4 text-[#38D9FF]" />
                <span>Add Reference Method</span>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMethod} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Method Type</label>
                <select
                  value={newType}
                  onChange={e => setNewType(e.target.value as TrustPassportItem['type'])}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#38D9FF]"
                >
                  <option value="Email">Corporate Email</option>
                  <option value="Phone">Verified Phone Number</option>
                  <option value="Org ID">Organization Executive Badge</option>
                  <option value="Face Reference">Face Biometric Hash</option>
                  <option value="Voice Reference">Voice Spectral Reference</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Identifier / Biometric Hash</label>
                <input
                  type="text"
                  value={newIdentifier}
                  onChange={e => setNewIdentifier(e.target.value)}
                  placeholder="e.g. +1 (555) 839-2910 or Spectral Hash #9302"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#38D9FF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00A8FF] to-[#38D9FF] text-[#061522] font-bold text-xs uppercase tracking-wider"
              >
                Register Method
              </button>
            </form>
          </div>
        </div>
      )}

    </AppLayout>
  );
};

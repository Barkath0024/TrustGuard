import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { Settings, Save, Shield, Bell, Moon, Sun, Sliders, User, Lock } from 'lucide-react';
import { getStoredSettings, saveSettings, getStoredUser, setStoredUser } from '../services/storage';
import { AppSettings, User as UserType } from '../types';
import { useToast } from '../components/common/Toast';

export const SettingsPage: React.FC = () => {
  const { showToast } = useToast();
  const [settings, setSettingsState] = useState<AppSettings>(getStoredSettings());
  const [user, setUserState] = useState<UserType>(getStoredUser());
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'appearance'>('profile');

  const handleSaveSettings = () => {
    saveSettings(settings);
    setStoredUser(user);
    showToast('success', 'Settings Saved', 'Your preferences have been persisted to local storage.');
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-[#38D9FF] font-mono text-xs uppercase font-semibold">
              <Settings className="w-4 h-4" />
              <span>Platform Configuration</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">Profile & System Settings</h1>
            <p className="text-xs text-slate-400">Manage user profile, threat engine sensitivity, and notifications.</p>
          </div>

          <button
            onClick={handleSaveSettings}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00A8FF] to-[#38D9FF] text-[#061522] font-bold text-xs uppercase tracking-wider shadow-cyber flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
          {[
            { id: 'profile', label: 'User Profile', icon: User },
            { id: 'security', label: 'Detection Sensitivity', icon: Sliders },
            { id: 'notifications', label: 'Alert Preferences', icon: Bell },
            { id: 'appearance', label: 'Appearance & UI', icon: Moon }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#00A8FF]/20 text-[#38D9FF] border border-[#00A8FF]/40 shadow-cyber'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: PROFILE */}
        {activeTab === 'profile' && (
          <div className="p-6 rounded-2xl bg-[#0D293F]/70 border border-[#38D9FF]/20 backdrop-blur-xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">User Profile Information</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={e => setUserState({ ...user, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#38D9FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Corporate Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={e => setUserState({ ...user, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#38D9FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Organization</label>
                <input
                  type="text"
                  value={user.organization}
                  onChange={e => setUserState({ ...user, organization: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#061522] border border-slate-700 text-xs text-white focus:outline-none focus:border-[#38D9FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Active Role</label>
                <input
                  type="text"
                  value={user.role.toUpperCase()}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#061522]/50 border border-slate-800 text-xs text-slate-400 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DETECTION SENSITIVITY */}
        {activeTab === 'security' && (
          <div className="p-6 rounded-2xl bg-[#0D293F]/70 border border-[#38D9FF]/20 backdrop-blur-xl space-y-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Detection & Threat Engine Tuning</h2>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">AI Model Sensitivity Level</label>
              <div className="grid grid-cols-3 gap-3">
                {['low', 'medium', 'high'].map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSettingsState({ ...settings, sensitivity: lvl as any })}
                    className={`py-3 rounded-xl text-xs font-bold uppercase border transition-all ${
                      settings.sensitivity === lvl
                        ? 'bg-[#00A8FF]/20 text-[#38D9FF] border-[#00A8FF] shadow-cyber'
                        : 'bg-[#061522] text-slate-400 border-slate-800'
                    }`}
                  >
                    {lvl} Sensitivity
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400">
                High sensitivity flags minor spectral phase anomalies and subtle audio artifacts.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">AI Simulation Delay (ms)</span>
                <span className="font-mono text-[#38D9FF]">{settings.apiSimulationDelay}ms</span>
              </div>
              <input
                type="range"
                min="1000"
                max="6000"
                step="500"
                value={settings.apiSimulationDelay}
                onChange={e => setSettingsState({ ...settings, apiSimulationDelay: parseInt(e.target.value) })}
                className="w-full accent-[#38D9FF]"
              />
            </div>
          </div>
        )}

        {/* TAB 3: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="p-6 rounded-2xl bg-[#0D293F]/70 border border-[#38D9FF]/20 backdrop-blur-xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Notification Dispatch Rules</h2>

            <div className="space-y-4 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl bg-[#061522] border border-slate-800 cursor-pointer">
                <div>
                  <p className="font-semibold text-white">Email Incident Alerts</p>
                  <p className="text-[11px] text-slate-400">Dispatch immediate notifications for HIGH RISK cases.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailAlerts}
                  onChange={e => setSettingsState({ ...settings, emailAlerts: e.target.checked })}
                  className="w-4 h-4 accent-[#00A8FF]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#061522] border border-slate-800 cursor-pointer">
                <div>
                  <p className="font-semibold text-white">Automated Background Scanning</p>
                  <p className="text-[11px] text-slate-400">Continuously poll incoming API webhook evidence artifacts.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoScan}
                  onChange={e => setSettingsState({ ...settings, autoScan: e.target.checked })}
                  className="w-4 h-4 accent-[#00A8FF]"
                />
              </label>
            </div>
          </div>
        )}

        {/* TAB 4: APPEARANCE */}
        {activeTab === 'appearance' && (
          <div className="p-6 rounded-2xl bg-[#0D293F]/70 border border-[#38D9FF]/20 backdrop-blur-xl space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">UI & Visual Palette</h2>

            <div className="space-y-4 text-xs">
              <label className="flex items-center justify-between p-3 rounded-xl bg-[#061522] border border-slate-800 cursor-pointer">
                <div>
                  <p className="font-semibold text-white">Show Technical Innovation Badges</p>
                  <p className="text-[11px] text-slate-400 font-mono">Display 'Cross-Modal Correlation' markers on header.</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.showTechnicalBadges}
                  onChange={e => setSettingsState({ ...settings, showTechnicalBadges: e.target.checked })}
                  className="w-4 h-4 accent-[#00A8FF]"
                />
              </label>
            </div>
          </div>
        )}

      </div>
    </AppLayout>
  );
};

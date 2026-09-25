import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Bell, CheckCheck, ShieldAlert, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { getStoredNotifications, markAllNotificationsRead, markNotificationRead } from '../services/storage';
import { NotificationItem } from '../types';
import { useToast } from '../components/common/Toast';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [notifs, setNotifs] = useState<NotificationItem[]>(getStoredNotifications());

  const handleMarkAll = () => {
    markAllNotificationsRead();
    setNotifs(getStoredNotifications());
    showToast('success', 'All notifications marked as read.');
  };

  const handleNotifClick = (item: NotificationItem) => {
    markNotificationRead(item.id);
    setNotifs(getStoredNotifications());
    if (item.caseId) {
      navigate(`/case/${item.caseId}`);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-[#38D9FF] font-mono text-xs uppercase font-semibold">
              <Bell className="w-4 h-4" />
              <span>Real-Time Incident Stream</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">Notifications & Alerts</h1>
            <p className="text-xs text-slate-400">System security dispatches, high-risk detection alerts and review updates.</p>
          </div>

          <button
            onClick={handleMarkAll}
            className="px-4 py-2 rounded-xl bg-[#0D293F] border border-[#38D9FF]/30 text-[#38D9FF] hover:bg-[#113552] text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All Read</span>
          </button>
        </div>

        {/* NOTIFICATIONS LIST */}
        <div className="space-y-3">
          {notifs.map(n => (
            <div
              key={n.id}
              onClick={() => handleNotifClick(n)}
              className={`p-4 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all flex items-start gap-4 ${
                !n.read
                  ? 'bg-[#0D293F]/90 border-[#00A8FF]/40 shadow-cyber'
                  : 'bg-[#0D293F]/40 border-slate-800 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-[#061522] shrink-0 mt-0.5">
                {n.type === 'alert' && <ShieldAlert className="w-5 h-5 text-rose-400" />}
                {n.type === 'info' && <Info className="w-5 h-5 text-[#38D9FF]" />}
                {n.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">{n.title}</h3>
                  <span className="text-[10px] font-mono text-slate-400">{n.date}</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{n.message}</p>
                {n.caseId && (
                  <span className="inline-block mt-2 text-[11px] font-mono font-semibold text-[#38D9FF] hover:underline">
                    Inspect Case {n.caseId} →
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </AppLayout>
  );
};

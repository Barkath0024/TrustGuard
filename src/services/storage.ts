import { VerificationCase, User, TrustPassport, NotificationItem, AppSettings, CaseStatus } from '../types';
import { INITIAL_CASES, generateSimulationResults } from './aiEngine';

const STORAGE_KEYS = {
  USER: 'trustguard_user',
  CASES: 'trustguard_cases',
  PASSPORT: 'trustguard_passport',
  NOTIFICATIONS: 'trustguard_notifications',
  SETTINGS: 'trustguard_settings',
  AUDIT_LOGS: 'trustguard_audit_logs'
};

export const DEFAULT_USER: User = {
  id: 'u_101',
  name: 'Sarah Jenkins',
  email: 'demo@trustguard.ai',
  role: 'user',
  organization: 'Apex Global Financials',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80'
};

export const DEFAULT_ADMIN: User = {
  id: 'u_999',
  name: 'Alex Vance (Chief Risk Officer)',
  email: 'admin@trustguard.ai',
  role: 'admin',
  organization: 'TrustGuard Cyber SOC',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'
};

export const DEFAULT_PASSPORT: TrustPassport = {
  userId: 'u_101',
  userName: 'Marcus Vance',
  userEmail: 'marcus.vance@apexfinancials.com',
  organization: 'Apex Global Financials',
  role: 'VP of Finance',
  avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  status: 'VERIFIED',
  verifiedCount: 4,
  updatedAt: '2026-09-20T10:00:00Z',
  methods: [
    { id: 'm1', type: 'Email', identifier: 'marcus.vance@apexfinancials.com', verifiedAt: '2026-09-15', status: 'VERIFIED', confidence: 99 },
    { id: 'm2', type: 'Phone', identifier: '+1 (555) 019-2834', verifiedAt: '2026-09-15', status: 'VERIFIED', confidence: 98 },
    { id: 'm3', type: 'Org ID', identifier: 'APEX-EXEC-84920', verifiedAt: '2026-09-16', status: 'VERIFIED', confidence: 100 },
    { id: 'm4', type: 'Face Reference', identifier: '3D High-Res Biometric Hash #9482', verifiedAt: '2026-09-18', status: 'VERIFIED', confidence: 96 },
    { id: 'm5', type: 'Voice Reference', identifier: 'Spectral Acoustic Matrix (120s baseline)', verifiedAt: '2026-09-19', status: 'VERIFIED', confidence: 95 }
  ]
};

export const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'High Risk Alert: Impersonation Detected',
    message: 'Case TG-1024 (Manager Impersonation) scored 92% High Risk. Voice mismatch detected.',
    date: '10 mins ago',
    read: false,
    type: 'alert',
    caseId: 'TG-1024'
  },
  {
    id: 'n2',
    title: 'Human Review Requested',
    message: 'SOC Lead requested additional voice spectrography for case TG-1025.',
    date: '1 hour ago',
    read: false,
    type: 'info',
    caseId: 'TG-1025'
  },
  {
    id: 'n3',
    title: 'Trust Passport Updated',
    message: 'Voice reference sample hash refreshed for Marcus Vance.',
    date: '1 day ago',
    read: true,
    type: 'success'
  }
];

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  autoScan: true,
  emailAlerts: true,
  sensitivity: 'high',
  apiSimulationDelay: 3500,
  showTechnicalBadges: true
};

// USER STORAGE
export function getStoredUser(): User {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  setStoredUser(DEFAULT_USER);
  return DEFAULT_USER;
}

export function setStoredUser(user: User): void {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function logoutUser(): void {
  localStorage.removeItem(STORAGE_KEYS.USER);
}

// CASES STORAGE
export function getStoredCases(): VerificationCase[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CASES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  saveCases(INITIAL_CASES);
  return INITIAL_CASES;
}

export function saveCases(cases: VerificationCase[]): void {
  localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
}

export function getCaseById(id: string): VerificationCase | undefined {
  const cases = getStoredCases();
  return cases.find(c => c.id === id);
}

export function saveNewCase(newCase: VerificationCase): void {
  const cases = getStoredCases();
  const updated = [newCase, ...cases];
  saveCases(updated);

  // Trigger notification if high risk
  if (newCase.risk === 'HIGH') {
    addNotification({
      id: `notif_${Date.now()}`,
      title: `High Risk Alert: ${newCase.caseName}`,
      message: `Case ${newCase.id} was flagged as HIGH RISK (${newCase.confidenceScore}% confidence).`,
      date: 'Just now',
      read: false,
      type: 'alert',
      caseId: newCase.id
    });
  }
}

export function updateCaseStatus(caseId: string, status: CaseStatus, reviewNote?: string, adminName?: string): VerificationCase | null {
  const cases = getStoredCases();
  const index = cases.findIndex(c => c.id === caseId);
  if (index === -1) return null;

  const target = { ...cases[index] };
  target.status = status;
  target.updatedAt = new Date().toISOString();
  if (reviewNote) target.reviewNotes = reviewNote;
  if (adminName) target.assignedAdmin = adminName;

  target.timeline.push({
    timestamp: new Date().toLocaleTimeString(),
    title: `Status Updated to ${status}`,
    description: reviewNote ? `Note: "${reviewNote}"` : `Case status marked as ${status}.`,
    actor: adminName || 'Current User',
    type: adminName ? 'admin' : 'user'
  });

  cases[index] = target;
  saveCases(cases);
  return target;
}

// PASSPORT STORAGE
export function getStoredPassport(): TrustPassport {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PASSPORT);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  savePassport(DEFAULT_PASSPORT);
  return DEFAULT_PASSPORT;
}

export function savePassport(passport: TrustPassport): void {
  localStorage.setItem(STORAGE_KEYS.PASSPORT, JSON.stringify(passport));
}

// NOTIFICATIONS STORAGE
export function getStoredNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  saveNotifications(DEFAULT_NOTIFICATIONS);
  return DEFAULT_NOTIFICATIONS;
}

export function saveNotifications(notifs: NotificationItem[]): void {
  localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifs));
}

export function markNotificationRead(id: string): void {
  const notifs = getStoredNotifications();
  const updated = notifs.map(n => n.id === id ? { ...n, read: true } : n);
  saveNotifications(updated);
}

export function markAllNotificationsRead(): void {
  const notifs = getStoredNotifications();
  const updated = notifs.map(n => ({ ...n, read: true }));
  saveNotifications(updated);
}

export function addNotification(notif: NotificationItem): void {
  const notifs = getStoredNotifications();
  saveNotifications([notif, ...notifs]);
}

// SETTINGS STORAGE
export function getStoredSettings(): AppSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  saveSettings(DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

// DEMO MODE SETUP
export function loadDemoScenario(): VerificationCase {
  const cases = getStoredCases();
  const existingDemo = cases.find(c => c.id === 'TG-1024');
  if (existingDemo) return existingDemo;
  saveCases([INITIAL_CASES[0], ...cases]);
  return INITIAL_CASES[0];
}

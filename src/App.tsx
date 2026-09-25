import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/common/Toast';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { NewVerificationPage } from './pages/NewVerificationPage';
import { AnalysisProcessingPage } from './pages/AnalysisProcessingPage';
import { AnalysisResultPage } from './pages/AnalysisResultPage';
import { EvidenceExplorerPage } from './pages/EvidenceExplorerPage';
import { TrustGraphPage } from './pages/TrustGraphPage';
import { VerificationHistoryPage } from './pages/VerificationHistoryPage';
import { CaseDetailsPage } from './pages/CaseDetailsPage';
import { TrustPassportPage } from './pages/TrustPassportPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AdminCaseReviewPage } from './pages/AdminCaseReviewPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { HelpAboutPage } from './pages/HelpAboutPage';

export function App() {
  return (
    <ToastProvider>
      <Router>
        <Routes>
          {/* Public Landing & Auth Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* User Console Core Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/verify/new" element={<NewVerificationPage />} />
          <Route path="/verify/processing/:id" element={<AnalysisProcessingPage />} />
          <Route path="/verify/result/:id" element={<AnalysisResultPage />} />
          <Route path="/evidence" element={<EvidenceExplorerPage />} />
          <Route path="/trust-graph" element={<TrustGraphPage />} />
          <Route path="/history" element={<VerificationHistoryPage />} />
          <Route path="/case/:id" element={<CaseDetailsPage />} />
          <Route path="/passport" element={<TrustPassportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/about" element={<HelpAboutPage />} />

          {/* Admin SOC Incident Routes */}
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/case/:id" element={<AdminCaseReviewPage />} />

          {/* Catch-all Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;

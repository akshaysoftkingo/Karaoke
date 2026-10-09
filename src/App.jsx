import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { SongsPage } from './pages/SongsPage';
import { PerformancesPage } from './pages/PerformancesPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ContentPage } from './pages/ContentPage';
import { ReportsAnalyticsPage } from './pages/ReportsAnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { SyncCatalogueModal } from './components/modals/SyncCatalogueModal';
import { ProviderSettingsModal } from './components/modals/ProviderSettingsModal';
import { UserDetailsModal } from './components/users/UserDetailsModal';
import { CreateChallengeModal } from './components/modals/CreateChallengeModal';
import { CreateNotificationModal } from './components/modals/CreateNotificationModal';
import { ExportModal } from './components/modals/ExportModal';
import { ConfirmDeleteModal } from './components/common/ConfirmDeleteModal';
import { Menu, X } from 'lucide-react';

const MainLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-slate-800">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-10 w-64 bg-white flex flex-col h-full shadow-2xl">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar for hamburger button */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center">
            <img
              src="/softkingo-logo.png"
              alt="Softkingo"
              className="h-6 w-auto max-w-[130px] object-contain"
            />
          </div>
          <div className="w-5" />
        </div>

        {/* Global Header */}
        <Header />

        {/* Routed Page Content */}
        <main className="flex-1 px-4 sm:px-6 py-6 w-full">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/songs" element={<SongsPage />} />
            <Route path="/performances" element={<PerformancesPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/reports" element={<ReportsAnalyticsPage />} />
            <Route path="/analytics" element={<ReportsAnalyticsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>

      {/* Global Modals */}
      <SyncCatalogueModal />
      <ProviderSettingsModal />
      <UserDetailsModal />
      <CreateChallengeModal />
      <CreateNotificationModal />
      <ExportModal />
      <ConfirmDeleteModal />
    </div>
  );
};

const AuthenticatedApp = () => {
  const { isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <MainLayout />;
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={<AuthenticatedApp />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

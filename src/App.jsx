import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { SongsPage } from './pages/SongsPage';
import { PerformancesPage } from './pages/PerformancesPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ChallengesPage } from './pages/ChallengesPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { SyncCatalogueModal } from './components/modals/SyncCatalogueModal';
import { ProviderSettingsModal } from './components/modals/ProviderSettingsModal';
import { UserDetailsModal } from './components/users/UserDetailsModal';
import { CreateChallengeModal } from './components/modals/CreateChallengeModal';
import { CreateNotificationModal } from './components/modals/CreateNotificationModal';
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
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#ff2b75] flex items-center justify-center text-white font-extrabold text-sm">
              V
            </div>
            <span className="font-extrabold text-slate-900 text-sm">VOX</span>
            <span className="font-extrabold text-[#ff2b75] text-sm">KARAOKE</span>
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
            <Route
              path="/achievements"
              element={
                <PlaceholderPage
                  title="Achievements"
                  category="ENGAGEMENT"
                  description="Badges, high note milestones, and rewards system for singers."
                />
              }
            />
            <Route
              path="/content"
              element={
                <PlaceholderPage
                  title="Content Management"
                  category="ENGAGEMENT"
                  description="Playlists, featured collections, banner promotions, and curated vocal playlists."
                />
              }
            />
            <Route
              path="/reports"
              element={
                <PlaceholderPage
                  title="Reports"
                  category="MANAGEMENT"
                  description="Automated royalty distribution, copyright reports, and daily platform health logs."
                />
              }
            />
            <Route
              path="/notifications"
              element={
                <PlaceholderPage
                  title="Notifications"
                  category="MANAGEMENT"
                  description="Push notifications, campaign broadcasts, and system event alerts."
                />
              }
            />
            <Route
              path="/analytics"
              element={
                <PlaceholderPage
                  title="Analytics"
                  category="MANAGEMENT"
                  description="Deep vocal telemetry, user retention curves, and streaming provider load analysis."
                />
              }
            />
            <Route
              path="/settings"
              element={
                <PlaceholderPage
                  title="Settings"
                  category="SYSTEM"
                  description="Platform configuration, streaming API credentials, and administrative roles."
                />
              }
            />
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
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </AppProvider>
  );
}

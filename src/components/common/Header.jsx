import React from 'react';
import { Search, Bell, LayoutDashboard, LogOut, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const {
    globalSearch,
    setGlobalSearch,
    notificationsOpen,
    setNotificationsOpen,
    alerts,
    markAllAlertsAsRead,
    toggleAlertRead,
    unreadAlertsCount,
    logout,
  } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="h-16 px-4 sm:px-6 bg-white border-b border-slate-200/80 flex items-center justify-between sticky top-0 z-20">
      {/* Search Input */}
      <div className="relative w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
          placeholder="Search platform..."
          className="w-full bg-[#f8fafc] hover:bg-slate-100/60 focus:bg-white text-sm text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:border-[#ff2b75] focus:outline-none transition-all"
        />
      </div>

      {/* Right User & Admin Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Admin Dashboard Quick Indicator */}
        <button
          onClick={() => navigate('/dashboard')}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-pink-50/70 hover:bg-pink-100/70 border border-pink-100 text-xs font-bold text-[#ff2b75] transition cursor-pointer"
          title="Switch to Admin Dashboard"
        >
          <LayoutDashboard className="w-3.5 h-3.5 text-[#ff2b75]" />
          <span>Admin Dashboard</span>
        </button>

        {/* Notifications Button */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-[19px] h-[19px]" />
            {unreadAlertsCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#ff2b75] ring-2 ring-white absolute top-1.5 right-1.5"></span>
            )}
          </button>

          {/* Quick Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Notifications</span>
                <button
                  type="button"
                  onClick={markAllAlertsAsRead}
                  className="text-[11px] text-[#ff2b75] font-semibold hover:text-[#e61d65] cursor-pointer"
                >
                  Mark all read
                </button>
              </div>
              <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                {alerts.slice(0, 5).map((alert) => (
                  <button
                    type="button"
                    key={alert.id}
                    onClick={() => toggleAlertRead(alert.id)}
                    className="w-full p-3 text-left hover:bg-slate-50 cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-slate-800 truncate">{alert.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5 truncate">{alert.description}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{alert.timestamp}</span>
                      </div>
                      {!alert.read && <Check className="w-3.5 h-3.5 text-[#ff2b75] shrink-0" />}
                    </div>
                  </button>
                ))}
                {alerts.length === 0 && (
                  <p className="p-4 text-xs text-slate-400 text-center">No notifications</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen(false);
                  navigate('/notifications');
                }}
                className="w-full mt-2 pt-2 border-t border-slate-100 text-[11px] font-semibold text-[#ff2b75] hover:text-[#e61d65]"
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        {/* Admin Profile Pill matching Screenshot */}
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center gap-2.5 p-1 sm:pr-2.5 rounded-full hover:bg-slate-50 transition cursor-pointer text-left"
          title="Admin Profile & Settings"
        >
          <div className="w-8 h-8 rounded-full bg-[#ff2b75] flex items-center justify-center text-white font-black text-xs shadow-2xs">
            AS
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="text-xs font-bold text-slate-900">Admin User</div>
            <div className="text-[10px] font-medium text-slate-400">Super Admin</div>
          </div>
        </button>
        <button
          onClick={handleLogout}
          className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          title="Log out"
          aria-label="Log out"
        >
          <LogOut className="w-[18px] h-[18px]" />
        </button>
      </div>
    </header>
  );
};

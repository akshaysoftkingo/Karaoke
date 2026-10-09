import React from 'react';
import { Search, Bell, User, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export const Header = () => {
  const { globalSearch, setGlobalSearch, notificationsOpen, setNotificationsOpen } = useApp();
  const navigate = useNavigate();

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
            <span className="w-2 h-2 rounded-full bg-[#ff2b75] ring-2 ring-white absolute top-1.5 right-1.5"></span>
          </button>

          {/* Quick Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-30 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Notifications</span>
                <span className="text-[11px] text-[#ff2b75] font-semibold cursor-pointer">Mark all read</span>
              </div>
              <div className="divide-y divide-slate-50 max-h-64 overflow-y-auto">
                <div className="p-3 hover:bg-slate-50 cursor-pointer">
                  <p className="text-xs font-semibold text-slate-800">New high score recorded</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Aanya scored 98% in Tum Kya Mile</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">5m ago</span>
                </div>
                <div className="p-3 hover:bg-slate-50 cursor-pointer">
                  <p className="text-xs font-semibold text-slate-800">Catalogue sync completed</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">14 new Spotify tracks synchronized</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">1h ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Badge */}
        <div className="flex items-center gap-2.5">
          <button
            className="w-9 h-9 rounded-full bg-[#ff2b75] flex items-center justify-center text-white hover:opacity-95 shadow-sm transition relative group cursor-pointer"
            title="Admin Profile"
          >
            <User className="w-[18px] h-[18px]" strokeWidth={2.2} />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <ShieldCheck className="w-2 h-2 text-white" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

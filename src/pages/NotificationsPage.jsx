import React, { useState } from 'react';
import { Check, Plus, Bell, Radio } from 'lucide-react';
import { AlertsList } from '../components/notifications/AlertsList';
import { NotificationsTable } from '../components/notifications/NotificationsTable';
import { useApp } from '../context/AppContext';

export const NotificationsPage = () => {
  const { setActiveModal, markAllAlertsAsRead } = useApp();
  const [viewMode, setViewMode] = useState('alerts'); // 'alerts' or 'broadcasts'

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header matching Screenshot 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Alerts
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Stay up to date with important activity across VOX.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Mark all as read */}
          <button
            onClick={markAllAlertsAsRead}
            className="text-xs font-bold text-[#ff2b75] hover:text-[#e61d65] flex items-center gap-1.5 transition cursor-pointer px-2 py-1"
          >
            <Check className="w-4 h-4 stroke-3" />
            <span>Mark all as read</span>
          </button>

          {/* Create Notification Button */}
          <button
            onClick={() => setActiveModal('create-notification')}
            className="bg-[#ff2b75] hover:bg-[#e61d65] active:scale-98 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm shadow-pink-500/20 flex items-center gap-2 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-3" />
            <span>Create Notification</span>
          </button>
        </div>
      </div>

      {/* Sub-view switcher: System Alerts vs Broadcast Campaigns */}
      <div className="flex items-center gap-4 border-b border-slate-200/80 px-1">
        <button
          onClick={() => setViewMode('alerts')}
          className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
            viewMode === 'alerts'
              ? 'text-[#ff2b75]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>System Alerts</span>
          {viewMode === 'alerts' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff2b75] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setViewMode('broadcasts')}
          className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
            viewMode === 'broadcasts'
              ? 'text-[#ff2b75]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Radio className="w-3.5 h-3.5" />
          <span>Broadcast Campaigns</span>
          {viewMode === 'broadcasts' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff2b75] rounded-full" />
          )}
        </button>
      </div>

      {/* Main View */}
      {viewMode === 'alerts' ? <AlertsList /> : <NotificationsTable />}
    </div>
  );
};

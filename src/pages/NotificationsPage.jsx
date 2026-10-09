import React from 'react';
import { Plus } from 'lucide-react';
import { notificationMetrics } from '../data/mockNotifications';
import { MetricCard } from '../components/common/MetricCard';
import { NotificationsTable } from '../components/notifications/NotificationsTable';
import { useApp } from '../context/AppContext';

export const NotificationsPage = () => {
  const { setActiveModal } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage platform announcements and updates sent to users.
          </p>
        </div>

        <button
          onClick={() => setActiveModal('create-notification')}
          className="bg-[#ff2b75] hover:bg-[#e61d65] active:scale-98 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm shadow-pink-500/20 flex items-center gap-2 transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create Notification</span>
        </button>
      </div>

      {/* Top 3 Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notificationMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
            iconBox={true}
            badgeColor={metric.badgeColor}
            helper={metric.helper}
          />
        ))}
      </div>

      {/* Main Notifications Table Card */}
      <NotificationsTable />
    </div>
  );
};

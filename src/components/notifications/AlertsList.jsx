import React, { useState } from 'react';
import {
  Music2,
  Zap,
  RotateCw,
  Trophy,
  Send,
  AlertTriangle,
  BellRing,
} from 'lucide-react';
import { RowActions } from '../common/RowActions';
import { useApp } from '../../context/AppContext';

export const AlertsList = () => {
  const { alerts, markAllAlertsAsRead, toggleAlertRead, deleteAlert, confirmDelete } = useApp();
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'unread', 'read'

  const unreadCount = alerts.filter((a) => !a.read).length;
  const readCount = alerts.filter((a) => a.read).length;

  const filteredAlerts = alerts.filter((a) => {
    if (activeTab === 'unread') return !a.read;
    if (activeTab === 'read') return a.read;
    return true;
  });

  const renderAlertIcon = (icon, color) => {
    const boxStyles = {
      pink: 'bg-pink-50 text-[#ff2b75]',
      purple: 'bg-purple-50 text-purple-600',
      blue: 'bg-sky-50 text-sky-600',
      amber: 'bg-amber-50 text-amber-600',
      emerald: 'bg-emerald-50 text-emerald-600',
      rose: 'bg-rose-50 text-rose-600',
    };

    const style = boxStyles[color] || 'bg-slate-50 text-slate-600';

    switch (icon) {
      case 'music':
        return (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style}`}>
            <Music2 className="w-5 h-5" />
          </div>
        );
      case 'zap':
        return (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style}`}>
            <Zap className="w-5 h-5" />
          </div>
        );
      case 'sync':
        return (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style}`}>
            <RotateCw className="w-5 h-5" />
          </div>
        );
      case 'trophy':
        return (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style}`}>
            <Trophy className="w-5 h-5" />
          </div>
        );
      case 'send':
        return (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style}`}>
            <Send className="w-5 h-5" />
          </div>
        );
      case 'alert':
        return (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style}`}>
            <AlertTriangle className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${style}`}>
            <BellRing className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Filter Pills matching screenshot */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'all'
              ? 'bg-[#ff2b75] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>All</span>
          <span className={`text-[11px] font-semibold ${activeTab === 'all' ? 'text-pink-100' : 'text-slate-400'}`}>
            ({alerts.length})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('unread')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'unread'
              ? 'bg-[#ff2b75] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>Unread</span>
          <span className={`text-[11px] font-semibold ${activeTab === 'unread' ? 'text-pink-100' : 'text-slate-400'}`}>
            ({unreadCount})
          </span>
        </button>

        <button
          onClick={() => setActiveTab('read')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'read'
              ? 'bg-[#ff2b75] text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>Read</span>
          <span className={`text-[11px] font-semibold ${activeTab === 'read' ? 'text-pink-100' : 'text-slate-400'}`}>
            ({readCount})
          </span>
        </button>
      </div>

      {/* Alerts Container Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filteredAlerts.length === 0 ? (
            <div className="p-12 text-center text-slate-400 text-xs">
              No alerts found in this view.
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors hover:bg-slate-50/70 group ${
                  !alert.read ? 'bg-pink-50/15' : ''
                }`}
              >
                <div className="flex items-start gap-4 min-w-0">
                  {/* Icon */}
                  {renderAlertIcon(alert.icon, alert.color)}

                  {/* Content */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">
                        {alert.title}
                      </h4>
                      {/* Unread Pink Dot */}
                      {!alert.read && (
                        <span className="w-2 h-2 rounded-full bg-[#ff2b75] shrink-0" />
                      )}
                    </div>

                    <p className="text-xs text-slate-600 mt-0.5">
                      {alert.description}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1.5">
                      <span>{alert.timestamp}</span>
                      <span>·</span>
                      <span
                        className={
                          alert.isAlertCategory
                            ? 'text-rose-500 font-semibold'
                            : 'text-slate-500 font-medium'
                        }
                      >
                        {alert.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="shrink-0">
                  <RowActions
                    onToggle={() => toggleAlertRead(alert.id)}
                    toggleOn={alert.read}
                    toggleTitle={alert.read ? 'Mark as unread' : 'Mark as read'}
                    onDelete={() =>
                      confirmDelete(`Delete this alert? This action cannot be undone.`, () =>
                        deleteAlert(alert.id)
                      )
                    }
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredAlerts.length} alerts</span>
          <span>Alert history kept for 30 days</span>
        </div>
      </div>
    </div>
  );
};

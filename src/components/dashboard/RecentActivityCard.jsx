import React from 'react';
import { Bell, UserPlus, Music, Award } from 'lucide-react';
import { recentActivity } from '../../data/mockDashboard';

export const RecentActivityCard = () => {
  const getActivityIcon = (iconName) => {
    switch (iconName) {
      case 'user-plus':
        return <UserPlus className="w-3.5 h-3.5 text-[#ff2b75]" />;
      case 'music':
        return <Music className="w-3.5 h-3.5 text-[#ff2b75]" />;
      case 'award':
        return <Award className="w-3.5 h-3.5 text-[#ff2b75]" />;
      default:
        return <Bell className="w-3.5 h-3.5 text-[#ff2b75]" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200/70 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Recent Activity
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Live platform event stream
            </p>
          </div>
          <Bell className="w-4 h-4 text-slate-400" />
        </div>

        {/* Activity Stream */}
        <div className="mt-3 space-y-3.5">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center shrink-0 mt-0.5">
                {getActivityIcon(activity.icon)}
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-800 leading-snug">
                  {activity.title}
                </p>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {activity.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full mt-4 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200/70 transition-all text-center">
        View All Logs
      </button>
    </div>
  );
};

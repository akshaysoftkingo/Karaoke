import React from 'react';
import { Star, Clock, Zap, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { performanceSummaryData } from '../../data/mockDashboard';

export const PerformanceSummary = () => {
  const navigate = useNavigate();
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'star':
        return <Star className="w-4 h-4 fill-[#ff2b75]" />;
      case 'clock':
        return <Clock className="w-4 h-4" />;
      case 'zap':
        return <Zap className="w-4 h-4 fill-[#ff2b75]" />;
      case 'trophy':
        return <Trophy className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white border border-slate-200/70 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Performance Summary
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Real-time aggregate platform telemetry
            </p>
          </div>
        </div>

        {/* Telemetry Metric Cards */}
        <div className="mt-4 space-y-3">
          {performanceSummaryData.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-xl bg-[#f8fafc]/80 border border-slate-100 hover:border-slate-200 transition"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}
                >
                  {getIcon(item.icon)}
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-600 block">
                    {item.title}
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-sm font-extrabold text-slate-900">
                      {item.value}
                    </span>
                    {item.subvalue && (
                      <span className="text-[10px] text-slate-400 font-normal">
                        {item.subvalue}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 text-rose-500 border border-rose-100">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => navigate('/performances')}
        className="w-full mt-4 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200/70 transition-all text-center cursor-pointer"
      >
        View Detailed Metrics
      </button>
    </div>
  );
};

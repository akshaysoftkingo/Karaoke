import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export const UserActivityChart = ({
  activity,
  peakText,
  weekendLift,
  periodLabel = 'Last 30 Days',
}) => {
  const [hoveredBar, setHoveredBar] = useState(null);

  if (!activity) return null;

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between min-h-[560px] hover:border-slate-300 transition-all">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              User Activity
            </h3>

            <p className="text-[11px] text-slate-500 mt-0.5">
              {periodLabel} active singers and participants
            </p>
          </div>

          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-pink-50 text-[#ff2b75] border border-pink-100">
            {periodLabel}
          </span>
        </div>
      </div>

      {/* 7-Bar Weekly Chart */}
      <div className="mt-auto pt-6">
       <div className="h-64 flex items-end justify-between gap-3 sm:gap-4 px-2 select-none relative">
          {/* Background Gridlines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
            <div className="w-full border-b border-slate-100" />
            <div className="w-full border-b border-slate-100" />
            <div className="w-full border-b border-slate-100" />
            <div className="w-full border-b border-slate-200" />
          </div>

          {activity.map((item) => {
            const isHovered = hoveredBar?.day === item.day;

            const barBg = item.isWeekend
              ? item.color || 'bg-[#ff2b75]'
              : 'bg-[#fce7f3] hover:bg-[#fbcfe8]';

            return (
              <div
                key={item.day}
                className="flex-1 flex flex-col items-center h-full relative z-10 group"
                onMouseEnter={() => setHoveredBar(item)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                {/* Tooltip */}
                {isHovered && (
                  <div className="absolute -top-10 bg-slate-900 text-white text-[11px] font-bold px-2 py-1 rounded-lg shadow-md whitespace-nowrap animate-in fade-in duration-100">
                    {item.day}: {item.active.toLocaleString()} singers
                  </div>
                )}

                {/* Bar Area */}
                <div className="flex-1 w-full min-h-0 flex items-end justify-center">
                  <div
                    style={{
                      height: `${Math.min(item.heightPercent * 1.2, 100)}%`,
                    }}
                    className={`w-full max-w-[34px] rounded-t-lg transition-all duration-300 cursor-pointer ${barBg} ${
                      isHovered ? 'opacity-90 scale-y-102' : ''
                    }`}
                  />
                </div>

                {/* Day Label */}
                <span
                  className={`text-[11px] mt-2 shrink-0 transition-colors ${
                    item.isWeekend
                      ? 'font-bold text-[#ff2b75]'
                      : 'font-medium text-slate-500'
                  }`}
                >
                  {item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-600 font-medium">
          Peak activity:{' '}
          <span className="font-bold text-slate-800">
            {peakText || 'Saturday 9:00 PM'}
          </span>
        </span>

        <div className="flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 text-[11px]">
          <Sparkles className="w-3 h-3 text-emerald-500" />

          <span>{weekendLift || '+18% weekends'}</span>
        </div>
      </div>
    </div>
  );
};
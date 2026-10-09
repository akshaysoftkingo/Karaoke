import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { leaderboardMetrics } from '../data/mockLeaderboard';
import { MetricCard } from '../components/common/MetricCard';
import { LeaderboardTable } from '../components/leaderboard/LeaderboardTable';

export const LeaderboardPage = () => {
  const [periodFilter, setPeriodFilter] = useState('This Month');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Leaderboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            View top karaoke performers ranked by points and performance
            scores.
          </p>
        </div>

        {/* Leaderboard Period Filter */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-semibold text-slate-500">
            Leaderboard Period:
          </span>
          <div className="relative">
            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="appearance-none text-xs font-bold text-slate-800 bg-white border border-slate-200 rounded-xl pl-3.5 pr-8 py-2.5 focus:border-[#ff2b75] focus:outline-none cursor-pointer"
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Top 2 Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {leaderboardMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
            iconBox={true}
          />
        ))}
      </div>

      {/* Main Leaderboard Table Card */}
      <LeaderboardTable periodFilter={periodFilter} />
    </div>
  );
};

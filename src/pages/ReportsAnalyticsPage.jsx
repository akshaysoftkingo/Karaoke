import React, { useState } from 'react';
import { Calendar, Download, Users, Mic2, Music2, Trophy, ChevronDown } from 'lucide-react';
import { PerformanceTrendsChart } from '../components/reports/PerformanceTrendsChart';
import { UserActivityChart } from '../components/reports/UserActivityChart';
import { AvailableReportsTable } from '../components/reports/AvailableReportsTable';
import { timeRangeReportData } from '../data/mockReports';
import { mockUsersList } from '../data/mockUsers';
import { downloadUsersExcel } from '../utils/exportExcel';

export const ReportsAnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [isExporting, setIsExporting] = useState(false);

  const currentData =
    timeRangeReportData[timeRange] || timeRangeReportData['Last 30 Days'];

  const getMetricIcon = (iconName) => {
    switch (iconName) {
      case 'users':
        return Users;
      case 'mic':
        return Mic2;
      case 'music':
        return Music2;
      case 'trophy':
        return Trophy;
      default:
        return Users;
    }
  };

  const handleGlobalExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      downloadUsersExcel(mockUsersList);
      setIsExporting(false);
    }, 600);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Reports & Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track platform performance, understand user activity, and export reports.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {/* Time Range Selector Dropdown */}
          <div className="relative">
            <div className="flex items-center gap-2 pl-3.5 pr-2 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs hover:border-slate-300 transition">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-transparent focus:outline-none cursor-pointer pr-4 appearance-none text-xs font-semibold text-slate-800"
              >
                <option value="Last 7 Days">Last 7 Days</option>
                <option value="Last 30 Days">Last 30 Days</option>
                <option value="Last 90 Days">Last 90 Days</option>
                <option value="This Year">This Year</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 pointer-events-none -ml-3" />
            </div>
          </div>

          {/* Export Report Main Button */}
          <button
            onClick={handleGlobalExport}
            disabled={isExporting}
            className="bg-[#ff2b75] hover:bg-[#e61d65] active:scale-98 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm shadow-pink-500/20 flex items-center gap-2 transition cursor-pointer disabled:opacity-75"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Export Report'}</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metrics Cards Grid - dynamically updates with timeRange */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentData.metrics.map((card) => {
          const IconComp = getMetricIcon(card.icon);
          return (
            <div
              key={card.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-xs hover:border-slate-300 transition-all"
            >
              <div>
                <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
                  {card.label}
                </span>
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1 transition-all">
                  {card.value}
                </div>
                {card.helperBadge && (
                  <span className="inline-block mt-1 text-[10px] font-bold text-[#ff2b75] bg-pink-50 px-2 py-0.5 rounded-full border border-pink-100">
                    {card.helperBadge}
                  </span>
                )}
              </div>

              <div className="w-10 h-10 rounded-xl bg-pink-50/80 border border-pink-100/60 flex items-center justify-center shrink-0">
                <IconComp className="w-5 h-5 text-[#ff2b75]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Analytics Charts Grid - dynamically updates with timeRange */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceTrendsChart trends={currentData.trends} />
        <UserActivityChart
          activity={currentData.activity}
          peakText={currentData.peakText}
          weekendLift={currentData.weekendLift}
        />
      </div>

      {/* Available Reports Table Section */}
      <AvailableReportsTable />
    </div>
  );
};

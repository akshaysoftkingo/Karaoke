import React, { useState } from 'react';
import { Download, LayoutDashboard, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { dashboardMetrics, recentPerformancesData } from '../data/mockDashboard';
import { MetricCard } from '../components/common/MetricCard';
import { OverviewChart } from '../components/dashboard/OverviewChart';
import { RecentPerformancesTable } from '../components/dashboard/RecentPerformancesTable';
import { PerformanceSummary } from '../components/dashboard/PerformanceSummary';
import { LeaderboardCard } from '../components/dashboard/LeaderboardCard';
import { RecentActivityCard } from '../components/dashboard/RecentActivityCard';
import { downloadExcelReport } from '../utils/exportExcel';

export const DashboardPage = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleExportExcel = () => {
    downloadExcelReport(recentPerformancesData);
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header with Admin Dashboard Icon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-[#ff2b75] shadow-xs">
              <LayoutDashboard className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Good morning, Admin
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Direct Excel Download Button (No Modal, No JSON) */}
        <button
          onClick={handleExportExcel}
          className="bg-[#ff2b75] hover:bg-[#e61d65] active:scale-98 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm shadow-pink-500/20 flex items-center gap-2 transition self-start sm:self-auto cursor-pointer"
          title="Download Excel Spreadsheet Report"
        >
          {downloaded ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>Report Downloaded!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </>
          )}
        </button>
      </div>

      {/* Top 4 Metrics Row with Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
            iconBox={true}
          />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2) */}
        <div className="lg:col-span-2 space-y-6">
          <OverviewChart />
          <RecentPerformancesTable />
        </div>

        {/* Right Column (Span 1) */}
        <div className="space-y-6">
          <PerformanceSummary />
          <LeaderboardCard />
          <RecentActivityCard />
        </div>
      </div>
    </div>
  );
};

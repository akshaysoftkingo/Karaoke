import React, { useState } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';
import { performanceMetrics, mockPerformancesList } from '../data/mockPerformances';
import { MetricCard } from '../components/common/MetricCard';
import { PerformancesTable } from '../components/performances/PerformancesTable';
import { downloadPerformancesExcel } from '../utils/exportExcel';

export const PerformancesPage = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleExportPerformances = () => {
    downloadPerformancesExcel(mockPerformancesList);
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Performances
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor karaoke sessions, review performance activity, and manage
            reported recordings.
          </p>
        </div>

        <button
          onClick={handleExportPerformances}
          className="bg-[#ff2b75] hover:bg-[#e61d65] text-white text-xs font-semibold py-2.5 px-4 rounded-xl shadow-sm shadow-pink-500/20 flex items-center gap-2 transition self-start sm:self-auto cursor-pointer"
          title="Download Excel Performances Report"
        >
          {downloaded ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>Performances Exported!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Export Performances</span>
            </>
          )}
        </button>
      </div>

      {/* Top 3 Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {performanceMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
            iconBox={true}
          />
        ))}
      </div>

      {/* Main Performances Table Card */}
      <PerformancesTable />
    </div>
  );
};

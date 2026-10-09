import React, { useState } from 'react';
import { SlidersHorizontal, RefreshCw, Download, CheckCircle2 } from 'lucide-react';
import { songMetrics, mockSongsList } from '../data/mockSongs';
import { MetricCard } from '../components/common/MetricCard';
import { SongsTable } from '../components/songs/SongsTable';
import { downloadSongsExcel } from '../utils/exportExcel';
import { useApp } from '../context/AppContext';

export const SongsPage = () => {
  const { setActiveModal } = useApp();
  const [downloaded, setDownloaded] = useState(false);

  const handleExportSongs = () => {
    downloadSongsExcel(mockSongsList);
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
            Songs
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your connected music catalogue and karaoke availability.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Direct Export Songs button */}
          <button
            onClick={handleExportSongs}
            className="bg-[#ff2b75] hover:bg-[#e61d65] active:scale-98 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm shadow-pink-500/20 flex items-center gap-2 transition cursor-pointer"
            title="Download Excel Songs Catalogue"
          >
            {downloaded ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Songs Exported!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export Songs</span>
              </>
            )}
          </button>

          <button
            onClick={() => setActiveModal('provider-settings')}
            className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold py-2.5 px-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2 transition cursor-pointer"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span>Provider Settings</span>
          </button>

          <button
            onClick={() => setActiveModal('sync-catalogue')}
            className="bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold py-2.5 px-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-2 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Sync Catalogue</span>
          </button>
        </div>
      </div>

      {/* Top 3 Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {songMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
            iconBox={false}
          />
        ))}
      </div>

      {/* Main Songs Table Card */}
      <SongsTable />
    </div>
  );
};

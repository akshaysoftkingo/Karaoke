import React, { useState } from 'react';
import {
  Clock,
  Download,
  Users,
  Activity,
  Music2,
  Trophy,
  CheckCircle2,
} from 'lucide-react';
import { availableReportsList } from '../../data/mockReports';
import { mockUsersList } from '../../data/mockUsers';
import { mockSongsList } from '../../data/mockSongs';
import { mockPerformancesList } from '../../data/mockPerformances';
import {
  downloadUsersExcel,
  downloadSongsExcel,
  downloadPerformancesExcel,
} from '../../utils/exportExcel';

export const AvailableReportsTable = () => {
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadedId, setDownloadedId] = useState(null);

  const renderReportIcon = (iconName) => {
    switch (iconName) {
      case 'users':
        return <Users className="w-4 h-4 text-[#ff2b75]" />;
      case 'activity':
        return <Activity className="w-4 h-4 text-[#ff2b75]" />;
      case 'music':
        return <Music2 className="w-4 h-4 text-[#ff2b75]" />;
      case 'trophy':
        return <Trophy className="w-4 h-4 text-[#ff2b75]" />;
      default:
        return <Users className="w-4 h-4 text-[#ff2b75]" />;
    }
  };

  const handleExport = (report) => {
    setDownloadingId(report.id);

    setTimeout(() => {
      if (report.category === 'Users') {
        downloadUsersExcel(mockUsersList);
      } else if (report.category === 'Performances') {
        downloadPerformancesExcel(mockPerformancesList);
      } else if (report.category === 'Songs') {
        downloadSongsExcel(mockSongsList);
      } else {
        downloadPerformancesExcel(mockPerformancesList);
      }

      setDownloadingId(null);
      setDownloadedId(report.id);

      setTimeout(() => {
        setDownloadedId(null);
      }, 2000);
    }, 600);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
      {/* Section Header */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Available Reports
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Pre-compiled system summaries and exportable datasets.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>Auto-generated daily at 00:00 UTC</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/40">
              <th className="py-3.5 px-6">Report Name</th>
              <th className="py-3.5 px-6">Category</th>
              <th className="py-3.5 px-6">Last Updated</th>
              <th className="py-3.5 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {availableReportsList.map((rep) => {
              const isDownloading = downloadingId === rep.id;
              const isDownloaded = downloadedId === rep.id;

              return (
                <tr
                  key={rep.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Report Name & Description */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-pink-50/80 border border-pink-100 flex items-center justify-center shrink-0">
                        {renderReportIcon(rep.icon)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">
                          {rep.name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {rep.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-50 text-[#ff2b75] border border-pink-200/60">
                      {rep.category}
                    </span>
                  </td>

                  {/* Last Updated */}
                  <td className="py-4 px-6 font-medium text-slate-600">
                    {rep.lastUpdated}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleExport(rep)}
                      disabled={isDownloading}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#ff2b75] hover:bg-pink-50 border border-pink-100 transition cursor-pointer disabled:opacity-50"
                    >
                      {isDownloaded ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Exported</span>
                        </>
                      ) : isDownloading ? (
                        <span>Exporting...</span>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" />
                          <span>Export</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-700">4</span> of{' '}
          <span className="font-semibold text-slate-700">4</span> generated report
          datasets
        </div>

        <div className="flex items-center gap-1.5 font-medium">
          <button
            disabled
            className="px-2.5 py-1 text-slate-400 cursor-not-allowed"
          >
            Prev
          </button>
          <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-[#ff2b75] text-white font-bold shadow-sm shadow-pink-500/20">
            1
          </span>
          <button
            disabled
            className="px-2.5 py-1 text-slate-400 cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

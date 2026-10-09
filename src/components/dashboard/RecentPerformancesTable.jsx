import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { recentPerformancesData } from '../../data/mockDashboard';
import { StatusBadge } from '../common/StatusBadge';
import { Pagination } from '../common/Pagination';

export const RecentPerformancesTable = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalItems = recentPerformancesData.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  const currentPerformances = recentPerformancesData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Recent Performances
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Latest user karaoke recordings and vocal scores
          </p>
        </div>
        <button
          onClick={() => navigate('/performances')}
          className="text-xs font-bold text-[#ff2b75] hover:text-[#e61d65] flex items-center gap-1 transition cursor-pointer"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-[11px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">
              <th className="py-3 px-3 pl-0">USER</th>
              <th className="py-3 px-3">SONG / ARTIST</th>
              <th className="py-3 px-3 text-center">SCORE</th>
              <th className="py-3 px-3">XP</th>
              <th className="py-3 px-3">DATE</th>
              <th className="py-3 px-3 text-right pr-0">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70">
            {currentPerformances.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-[#f8fafc]/70 transition-colors"
              >
                {/* User */}
                <td className="py-3 px-3 pl-0">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${item.avatarColor}`}
                    >
                      {item.avatarInitials}
                    </div>
                    <span className="font-bold text-slate-800 text-xs">
                      {item.user}
                    </span>
                  </div>
                </td>

                {/* Song / Artist */}
                <td className="py-3 px-3">
                  <div>
                    <span className="font-bold text-slate-900 block">
                      {item.song}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {item.artist}
                    </span>
                  </div>
                </td>

                {/* Score */}
                <td className="py-3 px-3 text-center">
                  <StatusBadge status={item.score} type="score" />
                </td>

                {/* XP */}
                <td className="py-3 px-3">
                  <span className="font-bold text-emerald-600 text-xs">
                    {item.xp}
                  </span>
                </td>

                {/* Date */}
                <td className="py-3 px-3 text-slate-500 font-medium">
                  {item.date}
                </td>

                {/* Status */}
                <td className="py-3 px-3 text-right pr-0">
                  <StatusBadge status={item.status} type="performance-status" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Enhanced Pagination with 10 page limit */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        itemLabel="performances"
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

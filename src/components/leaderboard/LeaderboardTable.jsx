import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { mockLeaderboardList } from '../../data/mockLeaderboard';
import { StatusBadge } from '../common/StatusBadge';
import { Pagination } from '../common/Pagination';

export const LeaderboardTable = ({ periodFilter = 'This Month' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('All Tiers');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter & Sort Ranked Users
  const filteredUsers = useMemo(() => {
    let result = mockLeaderboardList.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchTier =
        tierFilter === 'All Tiers' || item.tier === tierFilter;

      return matchSearch && matchTier;
    });

    // Leaderboard period narrows the ranked pool
    if (periodFilter === 'This Week') {
      result = result.slice(0, 25);
    } else if (periodFilter === 'This Month') {
      result = result.slice(0, 50);
    } else if (periodFilter === 'This Year') {
      result = result.slice(0, 75);
    }

    return result;
  }, [searchTerm, tierFilter, periodFilter]);

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderRankChange = (change) => {
    if (change === 'up') {
      return (
        <span className="inline-flex items-center text-emerald-500">
          <ArrowUp className="w-3 h-3" strokeWidth={3} />
        </span>
      );
    }
    if (change === 'down') {
      return (
        <span className="inline-flex items-center text-rose-500">
          <ArrowDown className="w-3 h-3" strokeWidth={3} />
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-slate-300">
        <Minus className="w-3 h-3" strokeWidth={3} />
      </span>
    );
  };

  return (
    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by user or email..."
            className="w-full text-xs text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#ff2b75] focus:outline-none transition-all"
          />
        </div>

        {/* Tier Filter */}
        <div className="relative">
          <select
            value={tierFilter}
            onChange={(e) => {
              setTierFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="appearance-none text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl pl-3.5 pr-8 py-2.5 focus:border-[#ff2b75] focus:outline-none cursor-pointer"
          >
            <option>All Tiers</option>
            <option>Gold</option>
            <option>Silver</option>
            <option>Bronze</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs table-fixed">
          <thead>
            <tr className="text-[11px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">
              <th className="py-3 px-3 pl-0 w-[16.67%]">RANK</th>
              <th className="py-3 px-3 w-[16.67%]">USER</th>
              <th className="py-3 px-3 w-[16.67%]">TIER</th>
              <th className="py-3 px-3 w-[16.67%]">PERFORMANCES</th>
              <th className="py-3 px-3 w-[16.67%]">AVERAGE SCORE</th>
              <th className="py-3 px-3 text-right pr-0 w-[16.67%]">TOTAL POINTS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70">
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  No ranked users found matching your filter.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((item) => (
                <tr
                  key={item.rank}
                  className="hover:bg-[#f8fafc]/70 transition-colors"
                >
                  {/* Rank */}
                  <td className="py-3 px-3 pl-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-slate-900 text-xs w-4">
                        {item.rank}
                      </span>
                      {renderRankChange(item.change)}
                    </div>
                  </td>

                  {/* User */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-extrabold shrink-0 ${item.avatarBg}`}
                      >
                        {item.initials}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {item.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Tier */}
                  <td className="py-3 px-3">
                    <StatusBadge status={item.tier} type="tier" />
                  </td>

                  {/* Performances */}
                  <td className="py-3 px-3 font-medium text-slate-600">
                    {item.performances}
                  </td>

                  {/* Average Score */}
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-500">
                      <span className="font-extrabold text-slate-900 text-xs">
                        {item.avgScore}
                      </span>
                      <span className="text-[10px] text-slate-400">/100</span>
                    </div>
                  </td>

                  {/* Total Points */}
                  <td className="py-3 px-3 text-right pr-0 font-extrabold text-slate-900 text-xs">
                    {item.points.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredUsers.length}
        pageSize={pageSize}
        itemLabel="users"
        onPageChange={(p) => setCurrentPage(p)}
      />
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Music2 } from 'lucide-react';
import { mockPerformancesList } from '../../data/mockPerformances';
import { StatusBadge } from '../common/StatusBadge';
import { ActionMenu } from '../common/ActionMenu';
import { Pagination } from '../common/Pagination';
import { useApp } from '../../context/AppContext';

export const PerformancesTable = () => {
  const { confirmDelete } = useApp();
  const [performances, setPerformances] = useState(mockPerformancesList);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPerformance, setSelectedPerformance] = useState(null);
  const [performanceDraft, setPerformanceDraft] = useState(null);
  const pageSize = 10;

  // Filter & Sort Performances
  const filteredPerformances = useMemo(() => {
    let result = performances.filter((item) => {
      const matchSearch =
        item.song.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.perfCode.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === 'All Statuses' ||
        item.status.toLowerCase() === statusFilter.toLowerCase();

      const matchDate =
        dateFilter === 'All Dates' || item.date === dateFilter;

      return matchSearch && matchStatus && matchDate;
    });

    if (sortOrder === 'Highest Score') {
      result = [...result].sort((a, b) => b.score - a.score);
    } else if (sortOrder === 'Lowest Score') {
      result = [...result].sort((a, b) => a.score - b.score);
    } else if (sortOrder === 'Oldest First') {
      result = [...result].reverse();
    }

    return result;
  }, [performances, searchTerm, statusFilter, dateFilter, sortOrder]);

  const handlePerformanceAction = (action, performance) => {
    if (action === 'delete' || action === 'del') {
      confirmDelete(`Delete the performance for "${performance.song}"? This action cannot be undone.`, () =>
        setPerformances((prev) => prev.filter((item) => item.id !== performance.id))
      );
    } else if (action === 'edit') {
      setSelectedPerformance(performance);
      setPerformanceDraft({ ...performance });
    }
  };

  const totalPages = Math.ceil(filteredPerformances.length / pageSize) || 1;
  const paginatedPerformances = filteredPerformances.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
            placeholder="Search by song, user or performance ID..."
            className="w-full text-xs text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#ff2b75] focus:outline-none transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Status */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl pl-3.5 pr-8 py-2.5 focus:border-[#ff2b75] focus:outline-none cursor-pointer"
            >
              <option>All Statuses</option>
              <option>Completed</option>
              <option>Under Review</option>
              <option>Reported</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Dates */}
          <div className="relative">
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl pl-3.5 pr-8 py-2.5 focus:border-[#ff2b75] focus:outline-none cursor-pointer"
            >
              <option>All Dates</option>
              <option>Oct 09, 2026</option>
              <option>Oct 08, 2026</option>
              <option>Oct 07, 2026</option>
              <option>Oct 06, 2026</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort Order */}
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl pl-3.5 pr-8 py-2.5 focus:border-[#ff2b75] focus:outline-none cursor-pointer"
            >
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Highest Score</option>
              <option>Lowest Score</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Performances Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-[11px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">
              <th className="py-3 px-3 pl-0">PERFORMANCE</th>
              <th className="py-3 px-3">USER</th>
              <th className="py-3 px-3">DURATION</th>
              <th className="py-3 px-3">DATE</th>
              <th className="py-3 px-3">SCORE</th>
              <th className="py-3 px-3">STATUS</th>
              <th className="py-3 px-3 text-right pr-0">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70">
            {paginatedPerformances.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No performances found matching your filter.
                </td>
              </tr>
            ) : (
              paginatedPerformances.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#f8fafc]/70 transition-colors"
                >
                  {/* Song & Cover */}
                  <td className="py-3 px-3 pl-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-xs relative bg-slate-100">
                        <img
                          src={item.coverImg}
                          alt={item.song}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-tr ${item.coverGradient} flex items-center justify-center -z-10`}
                        >
                          <Music2 className="w-4 h-4 text-white/70" />
                        </div>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">
                          {item.song}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {item.perfCode}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* User */}
                  <td className="py-3 px-3">
                    <div>
                      <span className="font-bold text-slate-900 block text-xs">
                        {item.user}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {item.email}
                      </span>
                    </div>
                  </td>

                  {/* Duration */}
                  <td className="py-3 px-3 font-medium text-slate-600">
                    {item.duration}
                  </td>

                  {/* Date */}
                  <td className="py-3 px-3 text-slate-600 font-medium">
                    {item.date}
                  </td>

                  {/* Score */}
                  <td className="py-3 px-3">
                    <div className="font-medium text-slate-500">
                      <span className="font-extrabold text-slate-900 text-xs">
                        {item.score}
                      </span>
                      <span className="text-[10px] text-slate-400">/100</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-3">
                    <StatusBadge status={item.status} type="session-status" />
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right pr-0">
                    <ActionMenu
                      onSelect={(action) => handlePerformanceAction(action, item)}
                      items={[
                        { id: 'edit', label: 'Edit Performance' },
                        { id: 'del', label: 'Delete Session', danger: true },
                      ]}
                    />
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
        totalItems={filteredPerformances.length}
        pageSize={pageSize}
        itemLabel="performances"
        onPageChange={(p) => setCurrentPage(p)}
      />

      {selectedPerformance && performanceDraft && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Edit Performance</h3>
                <p className="text-[11px] text-slate-400 mt-1">Update the performance record.</p>
              </div>
              <button type="button" onClick={() => { setSelectedPerformance(null); setPerformanceDraft(null); }} className="text-xs font-semibold text-slate-400 hover:text-slate-700">Close</button>
            </div>
            <div className="p-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div><h3 className="text-sm font-bold text-slate-900">{selectedPerformance.song}</h3><p className="text-xs text-slate-500 mt-1">{selectedPerformance.user}</p></div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5 text-xs">
              <label className="text-slate-400">Score<input type="number" min="0" max="100" value={performanceDraft.score} onChange={(e) => setPerformanceDraft((prev) => ({ ...prev, score: Number(e.target.value) }))} className="mt-1 w-full border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700" /></label>
              <label className="text-slate-400">Status<select value={performanceDraft.status} onChange={(e) => setPerformanceDraft((prev) => ({ ...prev, status: e.target.value }))} className="mt-1 w-full border border-slate-200 rounded-lg px-2 py-1.5 text-slate-700"><option>Completed</option><option>Under Review</option><option>Reported</option></select></label>
              <div><span className="text-slate-400 block">Duration</span><span className="font-semibold text-slate-700">{performanceDraft.duration}</span></div>
              <div><span className="text-slate-400 block">Date</span><span className="font-semibold text-slate-700">{performanceDraft.date}</span></div>
            </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
              <button type="button" onClick={() => { setSelectedPerformance(null); setPerformanceDraft(null); }} className="px-4 py-2 text-xs font-semibold text-slate-600">Cancel</button>
              <button type="button" onClick={() => { setPerformances((prev) => prev.map((item) => item.id === performanceDraft.id ? performanceDraft : item)); setSelectedPerformance(null); setPerformanceDraft(null); }} className="px-4 py-2 rounded-xl bg-[#ff2b75] text-white text-xs font-bold">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

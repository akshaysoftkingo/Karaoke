import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronDown,
  Music2,
  Mic,
  Target,
  Flame,
  Users,
} from 'lucide-react';
import { mockChallengesList } from '../../data/mockChallenges';
import { StatusBadge } from '../common/StatusBadge';
import { ActionMenu } from '../common/ActionMenu';
import { Pagination } from '../common/Pagination';

const challengeIcons = [
  { Icon: Music2, box: 'bg-pink-50 text-[#ff2b75]' },
  { Icon: Flame, box: 'bg-orange-50 text-orange-500' },
  { Icon: Music2, box: 'bg-purple-50 text-purple-600' },
  { Icon: Target, box: 'bg-emerald-50 text-emerald-600' },
  { Icon: Mic, box: 'bg-sky-50 text-sky-600' },
  { Icon: Music2, box: 'bg-indigo-50 text-indigo-600' },
];

export const ChallengesTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filter Challenges
  const filteredChallenges = useMemo(() => {
    const result = mockChallengesList.filter((item) => {
      const matchSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === 'All Statuses' ||
        item.status.toLowerCase() === statusFilter.toLowerCase();

      const matchType =
        typeFilter === 'All Types' || item.type === typeFilter;

      return matchSearch && matchStatus && matchType;
    });

    return result;
  }, [searchTerm, statusFilter, typeFilter]);

  const totalPages = Math.ceil(filteredChallenges.length / pageSize) || 1;
  const paginatedChallenges = filteredChallenges.slice(
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
            placeholder="Search challenges..."
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
              <option>Active</option>
              <option>Completed</option>
              <option>Scheduled</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Type */}
          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl pl-3.5 pr-8 py-2.5 focus:border-[#ff2b75] focus:outline-none cursor-pointer"
            >
              <option>All Types</option>
              <option>Song Completion</option>
              <option>Consistency</option>
              <option>Score Target</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Challenges Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-[11px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">
              <th className="py-3 px-3 pl-0">CHALLENGE</th>
              <th className="py-3 px-3">TYPE</th>
              <th className="py-3 px-3">PARTICIPANTS</th>
              <th className="py-3 px-3">START DATE</th>
              <th className="py-3 px-3">END DATE</th>
              <th className="py-3 px-3">STATUS</th>
              <th className="py-3 px-3 text-right pr-0">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70">
            {paginatedChallenges.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No challenges found matching your filter.
                </td>
              </tr>
            ) : (
              paginatedChallenges.map((item, index) => {
                const { Icon, box } =
                  challengeIcons[
                    ((currentPage - 1) * pageSize + index) %
                      challengeIcons.length
                  ];

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-[#f8fafc]/70 transition-colors"
                  >
                    {/* Challenge */}
                    <td className="py-3 px-3 pl-0">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${box}`}
                        >
                          <Icon className="w-4 h-4" strokeWidth={1.9} />
                        </div>
                        <span className="font-bold text-slate-900 text-xs">
                          {item.name}
                        </span>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-3 px-3 font-medium text-slate-600">
                      {item.type}
                    </td>

                    {/* Participants */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 font-medium text-slate-600">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        {item.participants.toLocaleString()}
                      </div>
                    </td>

                    {/* Start Date */}
                    <td className="py-3 px-3 text-slate-600 font-medium">
                      {item.startDate}
                    </td>

                    {/* End Date */}
                    <td className="py-3 px-3 text-slate-600 font-medium">
                      {item.endDate}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <StatusBadge
                        status={item.status}
                        type="challenge-status"
                      />
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right pr-0">
                      <ActionMenu
                        items={[
                          { id: 'view', label: 'View Details' },
                          { id: 'participants', label: 'View Participants' },
                          { id: 'edit', label: 'Edit Challenge' },
                          { id: 'del', label: 'Delete', danger: true },
                        ]}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredChallenges.length}
        pageSize={pageSize}
        itemLabel="challenges"
        onPageChange={(p) => setCurrentPage(p)}
      />
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { mockUsersList } from '../../data/mockUsers';
import { StatusBadge } from '../common/StatusBadge';
import { RowActions } from '../common/RowActions';
import { Pagination } from '../common/Pagination';
import { useApp } from '../../context/AppContext';

export const UsersTable = () => {
  const { confirmDelete } = useApp();
  const navigate = useNavigate();
  const [users, setUsers] = useState(mockUsersList);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [tierFilter, setTierFilter] = useState('All Tiers');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userId.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === 'All Statuses' ||
        user.status.toLowerCase() === statusFilter.toLowerCase();

      const matchTier =
        tierFilter === 'All Tiers' || user.tier === tierFilter;

      return matchSearch && matchStatus && matchTier;
    });
  }, [users, searchTerm, statusFilter, tierFilter]);

  const handleUserAction = (action, user) => {
    if (action === 'view') {
      navigate(`/users/${user.userId.replace('#', '')}`);
    } else if (action === 'delete') {
      confirmDelete(`Remove ${user.name}? This action cannot be undone.`, () =>
        setUsers((prev) => prev.filter((item) => item.id !== user.id))
      );
    }
  };

  const totalPages = Math.ceil(filteredUsers.length / pageSize) || 1;
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm space-y-5">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, email or user ID..."
            className="w-full text-xs text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#ff2b75] focus:outline-none transition-all"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3">
          {/* Status Dropdown */}
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
              <option>Inactive</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Tier Dropdown */}
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
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs table-fixed">
          <thead>
            <tr className="text-[11px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">
              <th className="py-3 px-3 pl-0 w-[14.28%]">USER</th>
              <th className="py-3 px-3 w-[14.28%]">USER ID</th>
              <th className="py-3 px-3 w-[14.28%]">SONGS SUNG</th>
              <th className="py-3 px-3 w-[14.28%]">JOINED DATE</th>
              <th className="py-3 px-3 w-[14.28%]">TIER</th>
              <th className="py-3 px-3 w-[14.28%]">STATUS</th>
              <th className="py-3 px-3 text-right pr-0 w-[14.28%]">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70">
            {paginatedUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No users found matching your filters.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-[#f8fafc]/70 transition-colors"
                >
                  {/* User Profile */}
                  <td className="py-3.5 px-3 pl-0">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${user.avatarBg}`}
                      >
                        {user.initials}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">
                          {user.name}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* User ID */}
                  <td className="py-3.5 px-3 font-semibold text-slate-600">
                    {user.userId}
                  </td>

                  {/* Songs Sung */}
                  <td className="py-3.5 px-3 font-bold text-slate-900">
                    {user.songsSung}
                  </td>

                  {/* Joined Date */}
                  <td className="py-3.5 px-3 text-slate-500 font-medium">
                    {user.joinedDate}
                  </td>

                  {/* Tier */}
                  <td className="py-3.5 px-3">
                    {user.tier === 'Gold' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Gold
                      </span>
                    ) : user.tier === 'Silver' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 text-slate-600 border border-slate-300">
                        Silver
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-orange-50 text-orange-700 border border-orange-200">
                        Bronze
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3">
                    <StatusBadge status={user.status} type="user" />
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-3 text-right pr-0">
                    <RowActions
                      onView={() => handleUserAction('view', user)}
                      onDelete={() => handleUserAction('delete', user)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - 10 page limit */}
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

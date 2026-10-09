import React, { useState } from 'react';
import {
  Search,
  MoreHorizontal,
  Mic,
  Star,
  Heart,
  Flame,
  Trophy,
  Flag,
  Award,
  Sparkles,
} from 'lucide-react';
import {
  achievementCategories,
  achievementStatuses,
} from '../../data/mockAchievements';
import { Pagination } from '../common/Pagination';
import { useApp } from '../../context/AppContext';

export const AchievementsTable = ({ achievements, onUpdateAchievements }) => {
  const { confirmDelete } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [currentPage, setCurrentPage] = useState(1);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);

  const pageSize = 6;

  // Filter logic
  const filtered = achievements.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unlockCriteria.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All Categories' || item.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'All Statuses' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginatedItems = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'mic':
        return <Mic className="w-4 h-4 text-[#ff2b75]" />;
      case 'star':
        return <Star className="w-4 h-4 text-[#ff2b75]" />;
      case 'heart':
        return <Heart className="w-4 h-4 text-[#ff2b75]" fill="#ff2b75" />;
      case 'flame':
        return <Flame className="w-4 h-4 text-[#ff2b75]" />;
      case 'trophy':
        return <Trophy className="w-4 h-4 text-[#ff2b75]" />;
      case 'flag':
        return <Flag className="w-4 h-4 text-[#ff2b75]" />;
      case 'sparkles':
        return <Sparkles className="w-4 h-4 text-[#ff2b75]" />;
      default:
        return <Award className="w-4 h-4 text-[#ff2b75]" />;
    }
  };

  const toggleStatus = (id) => {
    if (onUpdateAchievements) {
      onUpdateAchievements((prev) =>
        prev.map((a) =>
          a.id === id
            ? { ...a, status: a.status === 'Active' ? 'Inactive' : 'Active' }
            : a
        )
      );
    }
    setActionMenuOpen(null);
  };

  const deleteAchievement = (id) => {
    if (onUpdateAchievements) {
      onUpdateAchievements((prev) => prev.filter((a) => a.id !== id));
    }
    setActionMenuOpen(null);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-b border-slate-100">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search achievements..."
            className="w-full pl-10 pr-4 py-2 bg-white text-xs text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:border-[#ff2b75] transition"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs text-slate-700 font-medium px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#ff2b75] cursor-pointer"
          >
            {achievementCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs text-slate-700 font-medium px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#ff2b75] cursor-pointer"
          >
            {achievementStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/40">
              <th className="py-3.5 px-6">Achievement</th>
              <th className="py-3.5 px-6">Category</th>
              <th className="py-3.5 px-6">Unlock Criteria</th>
              <th className="py-3.5 px-6">Users Unlocked</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
            {paginatedItems.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  No achievements found matching your criteria.
                </td>
              </tr>
            ) : (
              paginatedItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Achievement Name & Icon */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-pink-50/80 border border-pink-100 flex items-center justify-center shrink-0">
                        {renderIcon(item.icon)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-6 font-medium text-slate-700">
                    {item.category}
                  </td>

                  {/* Unlock Criteria */}
                  <td className="py-4 px-6 font-medium text-slate-700">
                    {item.unlockCriteria}
                  </td>

                  {/* Users Unlocked */}
                  <td className="py-4 px-6 font-semibold text-slate-800">
                    {item.usersUnlocked.toLocaleString()} users
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    {item.status === 'Active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right relative">
                    <button
                      onClick={() =>
                        setActionMenuOpen(actionMenuOpen === item.id ? null : item.id)
                      }
                      className="w-8 h-8 rounded-lg inline-flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {/* Popover Action Menu */}
                    {actionMenuOpen === item.id && (
                      <div className="absolute right-6 mt-1 w-36 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-20 text-left animate-in fade-in duration-100">
                        <button
                          onClick={() => toggleStatus(item.id)}
                          className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                        >
                          Mark as {item.status === 'Active' ? 'Inactive' : 'Active'}
                        </button>
                        <button
                          onClick={() =>
                            confirmDelete(
                              `Delete "${item.name}"? This action cannot be undone.`,
                              () => deleteAchievement(item.id)
                            )
                          }
                          className="w-full px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="px-6 py-4 border-t border-slate-100">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          pageSize={pageSize}
          itemLabel="achievements"
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

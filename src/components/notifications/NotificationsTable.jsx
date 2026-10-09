import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, RefreshCw, Bell } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';
import { ActionMenu } from '../common/ActionMenu';
import { Pagination } from '../common/Pagination';

const notificationIcons = [
  { Icon: Bell, box: 'bg-pink-50 text-[#ff2b75]' },
  { Icon: Bell, box: 'bg-rose-50 text-rose-500' },
  { Icon: Bell, box: 'bg-sky-50 text-sky-600' },
  { Icon: Bell, box: 'bg-emerald-50 text-emerald-600' },
  { Icon: Bell, box: 'bg-amber-50 text-amber-500' },
  { Icon: Bell, box: 'bg-violet-50 text-violet-600' },
];

export const NotificationsTable = () => {
  const {
    notifications,
    deleteNotification,
    duplicateNotification,
    setNotificationBeingEdited,
    setActiveModal,
    confirmDelete,
  } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const pageSize = 10;

  // Filter Notifications
  const filteredNotifications = useMemo(() => {
    const list = notifications || [];
    const result = list.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === 'All Statuses' ||
        item.status.toLowerCase() === statusFilter.toLowerCase();

      const matchType =
        typeFilter === 'All Types' || item.type === typeFilter;

      return matchSearch && matchStatus && matchType;
    });

    return result;
  }, [notifications, searchTerm, statusFilter, typeFilter]);

  const totalPages = Math.ceil(filteredNotifications.length / pageSize) || 1;
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All Statuses');
    setTypeFilter('All Types');
    setCurrentPage(1);
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
            placeholder="Search notifications..."
            className="w-full text-xs text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#ff2b75] focus:outline-none transition-all"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 flex-wrap">
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
              <option>Content Update</option>
              <option>Challenge</option>
              <option>System</option>
              <option>Welcome</option>
              <option>Promotion</option>
              <option>Achievement</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

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
              <option>Sent</option>
              <option>Scheduled</option>
              <option>Draft</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Reset Filters */}
          <button
            onClick={handleResetFilters}
            title="Reset filters"
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#ff2b75] hover:border-pink-200 transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Notifications Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-[11px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">
              <th className="py-3 px-3 pl-0">NOTIFICATION</th>
              <th className="py-3 px-3">TYPE</th>
              <th className="py-3 px-3">AUDIENCE</th>
              <th className="py-3 px-3">DATE</th>
              <th className="py-3 px-3">STATUS</th>
              <th className="py-3 px-3 text-right pr-0">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70">
            {paginatedNotifications.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  No notifications found matching your filter.
                </td>
              </tr>
            ) : (
              paginatedNotifications.map((item, index) => {
                const { Icon, box } =
                  notificationIcons[
                    ((currentPage - 1) * pageSize + index) %
                      notificationIcons.length
                  ];

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-[#f8fafc]/70 transition-colors"
                  >
                    {/* Notification */}
                    <td className="py-3 px-3 pl-0">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${box}`}
                        >
                          <Icon className="w-4 h-4" strokeWidth={1.9} />
                        </div>
                        <div className="min-w-0 max-w-[280px]">
                          <span className="font-bold text-slate-900 text-xs block truncate">
                            {item.title}
                          </span>
                          <span className="text-[11px] text-slate-400 block truncate">
                            {item.description}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-3 px-3">
                      <StatusBadge status={item.type} type="notification-type" />
                    </td>

                    {/* Audience */}
                    <td className="py-3 px-3 font-medium text-slate-600">
                      {item.audience}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-3 text-slate-600 font-medium">
                      {item.date}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3">
                      <StatusBadge
                        status={item.status}
                        type="notification-status"
                      />
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 text-right pr-0">
                      <ActionMenu
                        onSelect={(action) => {
                          if (action === 'del') {
                            confirmDelete(`Delete "${item.title}"? This action cannot be undone.`, () =>
                              deleteNotification(item.id)
                            );
                          } else if (action === 'duplicate') {
                            duplicateNotification(item);
                          } else if (action === 'view') {
                            setSelectedNotification(item);
                          } else if (action === 'edit') {
                            setNotificationBeingEdited(item);
                            setActiveModal('create-notification');
                          }
                        }}
                        items={[
                          { id: 'view', label: 'View Details' },
                          { id: 'edit', label: 'Edit Notification' },
                          { id: 'duplicate', label: 'Duplicate' },
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
        totalItems={filteredNotifications.length}
        pageSize={pageSize}
        itemLabel="notifications"
        onPageChange={(p) => setCurrentPage(p)}
      />

      {selectedNotification && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {selectedNotification.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedNotification.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedNotification(null)}
                className="text-xs font-semibold text-slate-400 hover:text-slate-700"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5 text-xs">
              <div>
                <span className="text-slate-400 block">Type</span>
                <span className="font-semibold text-slate-700">{selectedNotification.type}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Audience</span>
                <span className="font-semibold text-slate-700">{selectedNotification.audience}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Date</span>
                <span className="font-semibold text-slate-700">{selectedNotification.date}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Status</span>
                <span className="font-semibold text-slate-700">{selectedNotification.status}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

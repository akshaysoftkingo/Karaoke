import React, { useState } from 'react';
import { Download, CheckCircle2 } from 'lucide-react';
import { userMetrics, mockUsersList } from '../data/mockUsers';
import { MetricCard } from '../components/common/MetricCard';
import { UsersTable } from '../components/users/UsersTable';
import { downloadUsersExcel } from '../utils/exportExcel';

export const UsersPage = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleExportUsers = () => {
    downloadUsersExcel(mockUsersList);
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
            Users
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage registered users and their account status.
          </p>
        </div>

        <button
          onClick={handleExportUsers}
          className="bg-[#ff2b75] hover:bg-[#e61d65] active:scale-98 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm shadow-pink-500/20 flex items-center gap-2 transition self-start sm:self-auto cursor-pointer"
          title="Download Excel Users Directory"
        >
          {downloaded ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>Users Exported!</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Export Users</span>
            </>
          )}
        </button>
      </div>

      {/* Top 4 Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {userMetrics.map((metric) => (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
            iconBox={true}
          />
        ))}
      </div>

      {/* Main Users Table Card */}
      <UsersTable />
    </div>
  );
};

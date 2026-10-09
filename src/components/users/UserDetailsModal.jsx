import React from 'react';
import { X, Mic, Calendar, Mail, Hash, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../common/StatusBadge';

export const UserDetailsModal = () => {
  const { selectedUser, setSelectedUser } = useApp();

  if (!selectedUser) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">User Profile</h3>
          <button
            onClick={() => setSelectedUser(null)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold shadow-sm ${selectedUser.avatarBg}`}
            >
              {selectedUser.initials}
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">
                {selectedUser.name}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">{selectedUser.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <StatusBadge status={selectedUser.status} type="user" />
                <span className="text-[11px] font-semibold text-[#ff2b75] bg-pink-50 px-2 py-0.5 rounded-full">
                  {selectedUser.accountType}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold uppercase">
                <Hash className="w-3.5 h-3.5" /> User ID
              </div>
              <span className="font-bold text-slate-800 text-xs mt-1 block">
                {selectedUser.userId}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold uppercase">
                <Mic className="w-3.5 h-3.5" /> Songs Sung
              </div>
              <span className="font-bold text-slate-800 text-xs mt-1 block">
                {selectedUser.songsSung} Tracks
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold uppercase">
                <Calendar className="w-3.5 h-3.5" /> Joined Date
              </div>
              <span className="font-bold text-slate-800 text-xs mt-1 block">
                {selectedUser.joinedDate}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-semibold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" /> Role
              </div>
              <span className="font-bold text-slate-800 text-xs mt-1 block">
                Vocalist
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={() => setSelectedUser(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            Close
          </button>
          <button
            onClick={() => setSelectedUser(null)}
            className="px-4 py-2 bg-[#ff2b75] hover:bg-[#e61d65] text-white text-xs font-semibold rounded-xl shadow-xs"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

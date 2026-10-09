import React, { useState } from 'react';
import { X, RefreshCw, CheckCircle2, History } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SyncCatalogueModal = () => {
  const { activeModal, setActiveModal } = useApp();
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(false);

  if (activeModal !== 'sync-catalogue' && activeModal !== 'view-sync-logs') {
    return null;
  }

  const isLogs = activeModal === 'view-sync-logs';

  const handleStartSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSynced(true);
      setTimeout(() => {
        setSynced(false);
        setActiveModal(null);
      }, 1200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isLogs ? (
              <History className="w-4 h-4 text-[#ff2b75]" />
            ) : (
              <RefreshCw className="w-4 h-4 text-[#ff2b75]" />
            )}
            <h3 className="font-bold text-slate-900 text-sm">
              {isLogs ? 'Catalogue Sync Logs' : 'Sync Music Catalogue'}
            </h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {isLogs ? (
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center justify-between font-semibold text-slate-800">
                  <span>Spotify Sync (Delta)</span>
                  <span className="text-emerald-600">Success</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  18 new tracks indexed, 4 stem files processed.
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Today, 10:30 AM
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs">
                <div className="flex items-center justify-between font-semibold text-slate-800">
                  <span>Apple Music Sync (Full)</span>
                  <span className="text-emerald-600">Success</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Catalogue verified against 8,640 available stems.
                </p>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Yesterday, 04:15 PM
                </span>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Triggering a synchronization will query all connected streaming
                providers (Spotify & Apple Music) for new track metadata, stems, and lyrics.
              </p>
              <div className="mt-4 p-3.5 bg-pink-50/50 rounded-xl border border-pink-100 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-[#ff2b75] block">
                  Active Connections:
                </span>
                <div>• Spotify API: Connected (OAuth Token valid)</div>
                <div>• Apple Music API: Connected (MusicKit Token valid)</div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            Close
          </button>
          {!isLogs && (
            <button
              onClick={handleStartSync}
              disabled={syncing || synced}
              className="px-4 py-2 bg-[#ff2b75] hover:bg-[#e61d65] text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5"
            >
              {synced ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" /> Synced!
                </>
              ) : syncing ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Syncing...
                </>
              ) : (
                'Start Sync Now'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

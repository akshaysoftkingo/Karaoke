import React from 'react';
import { X, SlidersHorizontal, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProviderSettingsModal = () => {
  const { activeModal, setActiveModal } = useApp();

  if (activeModal !== 'provider-settings') return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#ff2b75]" />
            <h3 className="font-bold text-slate-900 text-sm">Provider Settings</h3>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                SP
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Spotify for Developers</h4>
                <p className="text-[11px] text-slate-400">Client ID: **********901</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <Check className="w-3.5 h-3.5" /> Connected
            </span>
          </div>

          <div className="p-3.5 border border-slate-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 flex items-center justify-center font-bold text-xs">
                AM
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Apple MusicKit</h4>
                <p className="text-[11px] text-slate-400">Team ID: **********442</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <Check className="w-3.5 h-3.5" /> Connected
            </span>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

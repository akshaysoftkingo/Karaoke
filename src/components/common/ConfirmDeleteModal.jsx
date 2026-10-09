import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ConfirmDeleteModal = () => {
  const { deleteConfirmation, cancelDelete, completeDelete } = useApp();

  if (!deleteConfirmation) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-100 overflow-hidden">
        <div className="p-5 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-slate-900">Confirm deletion</h3>
            <p className="text-xs text-slate-500 mt-1">{deleteConfirmation.message}</p>
          </div>
          <button type="button" onClick={cancelDelete} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-2">
          <button type="button" onClick={cancelDelete} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900">
            Cancel
          </button>
          <button type="button" onClick={completeDelete} className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

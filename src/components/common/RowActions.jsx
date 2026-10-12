import React from 'react';
import { Eye, Trash2 } from 'lucide-react';

const actionBtnClass =
  'w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer';

export const RowActions = ({ onView, onToggle, toggleOn = false, toggleTitle, onDelete }) => (
  <div className="flex items-center justify-end gap-0.5">
    {onView && (
      <button
        type="button"
        title="View Details"
        onClick={onView}
        className={`${actionBtnClass} text-slate-400 hover:text-slate-700 hover:bg-slate-100`}
      >
        <Eye className="w-4 h-4" />
      </button>
    )}
    {onToggle && (
      <button
        type="button"
        title={toggleTitle || (toggleOn ? 'Deactivate' : 'Activate')}
        onClick={onToggle}
        className={`${actionBtnClass} hover:bg-slate-100`}
      >
        <span
          className={`relative inline-block w-7 h-4 rounded-full transition-colors duration-200 ${
            toggleOn ? 'bg-emerald-500' : 'bg-slate-300'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              toggleOn ? 'translate-x-3' : 'translate-x-0'
            }`}
          />
        </span>
      </button>
    )}
    {onDelete && (
      <button
        type="button"
        title="Delete"
        onClick={onDelete}
        className={`${actionBtnClass} text-slate-400 hover:text-rose-600 hover:bg-rose-50`}
      >
        <Trash2 className="w-4 h-4" />
      </button>
    )}
  </div>
);

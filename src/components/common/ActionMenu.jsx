import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal } from 'lucide-react';

export const ActionMenu = ({ items = [], onSelect }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const defaultItems = [
    { id: 'view', label: 'View Details' },
    { id: 'edit', label: 'Edit' },
    { id: 'analytics', label: 'View Telemetry' },
    { id: 'delete', label: 'Delete', danger: true },
  ];

  const menuOptions = items.length > 0 ? items : defaultItems;

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-30 animate-in fade-in duration-100">
          {menuOptions.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setOpen(false);
                if (onSelect) onSelect(item.id);
              }}
              className={`w-full px-3.5 py-1.5 text-xs text-left transition-colors flex items-center justify-between ${
                item.danger
                  ? 'text-rose-600 hover:bg-rose-50'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

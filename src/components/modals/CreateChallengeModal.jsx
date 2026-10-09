import React, { useState } from 'react';
import { X, Trophy, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CreateChallengeModal = () => {
  const { activeModal, setActiveModal } = useApp();
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    type: 'Song Completion',
    startDate: '2026-10-17',
    endDate: '2026-10-20',
    target: '',
  });

  if (activeModal !== 'create-challenge') {
    return null;
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCreate = () => {
    setCreating(true);
    setTimeout(() => {
      setCreating(false);
      setCreated(true);
      setTimeout(() => {
        setCreated(false);
        setActiveModal(null);
        setForm({
          name: '',
          description: '',
          type: 'Song Completion',
          startDate: '2026-10-17',
          endDate: '2026-10-20',
          target: '',
        });
      }, 1200);
    }, 1500);
  };

  const inputClass =
    'w-full text-xs text-slate-800 placeholder-slate-400 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#ff2b75] focus:outline-none transition-all';
  const labelClass =
    'text-[11px] font-bold tracking-wider text-slate-500 uppercase block mb-1.5';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#ff2b75]" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Create Challenge
              </h3>
              <p className="text-[11px] text-slate-400">
                Set up a new karaoke challenge
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Challenge Name */}
          <div>
            <label className={labelClass}>Challenge Name</label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange('name')}
              placeholder="e.g. Hindi Hits Challenge"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Describe the challenge rules, criteria, and rewards."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Challenge Type */}
          <div>
            <label className={labelClass}>Challenge Type</label>
            <select
              value={form.type}
              onChange={handleChange('type')}
              className={`${inputClass} appearance-none font-semibold cursor-pointer`}
            >
              <option>Song Completion</option>
              <option>Consistency</option>
              <option>Score Target</option>
            </select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Start Date</label>
              <input
                type="date"
                value={form.startDate}
                onChange={handleChange('startDate')}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>End Date</label>
              <input
                type="date"
                value={form.endDate}
                onChange={handleChange('endDate')}
                className={inputClass}
              />
            </div>
          </div>

          {/* Target */}
          <div>
            <label className={labelClass}>Target (Songs to Complete)</label>
            <input
              type="number"
              min="1"
              value={form.target}
              onChange={handleChange('target')}
              placeholder="e.g. 5"
              className={inputClass}
            />
            <p className="text-[10px] text-slate-400 mt-1.5">
              Number of songs required for participants to complete the
              challenge.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={creating || created}
            className="px-4 py-2 bg-[#ff2b75] hover:bg-[#e61d65] text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            {created ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Created!
              </>
            ) : creating ? (
              'Creating...'
            ) : (
              'Create Challenge'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

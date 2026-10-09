import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CreateAchievementModal = ({ onAchievementCreated }) => {
  const { activeModal, setActiveModal } = useApp();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'Getting Started',
    unlockCriteria: 'Complete performances',
    targetValue: '',
    status: 'Active',
  });

  if (activeModal !== 'create-achievement') {
    return null;
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);

      if (onAchievementCreated) {
        onAchievementCreated({
          id: `ach-${Date.now()}`,
          name: form.name.trim(),
          description: form.description.trim() || 'New milestone for vocalists',
          category: form.category,
          unlockCriteria: form.targetValue
            ? `${form.unlockCriteria} (${form.targetValue})`
            : form.unlockCriteria,
          usersUnlocked: 0,
          status: form.status,
          icon: 'trophy',
        });
      }

      setTimeout(() => {
        setSaved(false);
        setActiveModal(null);
        setForm({
          name: '',
          description: '',
          category: 'Getting Started',
          unlockCriteria: 'Complete performances',
          targetValue: '',
          status: 'Active',
        });
      }, 700);
    }, 600);
  };

  const closeModal = () => {
    setActiveModal(null);
    setForm({
      name: '',
      description: '',
      category: 'Getting Started',
      unlockCriteria: 'Complete performances',
      targetValue: '',
      status: 'Active',
    });
  };

  const labelClass = 'text-[11px] font-bold tracking-wider text-slate-600 uppercase block mb-1.5';
  const inputClass =
    'w-full text-xs text-slate-800 placeholder-slate-400 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#ff2b75] focus:outline-none transition-all bg-white';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-6 pb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Create Achievement</h3>
            <p className="text-xs text-slate-400 mt-0.5">Define a new milestone for karaoke users.</p>
          </div>
          <button
            type="button"
            onClick={closeModal}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
          {/* Achievement Name */}
          <div>
            <label className={labelClass}>Achievement Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={handleChange('name')}
              placeholder="e.g. First Performance"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Describe this achievement..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>Category</label>
            <select
              value={form.category}
              onChange={handleChange('category')}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="Getting Started">Getting Started</option>
              <option value="Performance">Performance</option>
              <option value="Milestones">Milestones</option>
              <option value="Consistency">Consistency</option>
              <option value="Special">Special</option>
            </select>
          </div>

          {/* Unlock Criteria & Target Value */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Unlock Criteria</label>
              <select
                value={form.unlockCriteria}
                onChange={handleChange('unlockCriteria')}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="Complete performances">Complete performances</option>
                <option value="Score threshold (90+)">Score threshold (90+)</option>
                <option value="7-day singing streak">7-day singing streak</option>
                <option value="Duet collaborations">Duet collaborations</option>
                <option value="Special event participation">Special event participation</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Target Value</label>
              <input
                type="text"
                value={form.targetValue}
                onChange={handleChange('targetValue')}
                placeholder="Enter target"
                className={inputClass}
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className={labelClass}>Status</label>
            <select
              value={form.status}
              onChange={handleChange('status')}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || saved}
              className="px-5 py-2.5 bg-[#ff2b75] hover:bg-[#e61d65] active:scale-98 text-white text-xs font-bold rounded-xl shadow-sm shadow-pink-500/20 transition flex items-center gap-1.5 cursor-pointer disabled:opacity-75"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" /> Created!
                </>
              ) : saving ? (
                'Creating...'
              ) : (
                'Create Achievement'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

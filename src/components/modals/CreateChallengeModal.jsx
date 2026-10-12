import React, { useEffect, useState } from 'react';
import { X, Trophy, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CreateChallengeModal = () => {
  const {
    activeModal,
    setActiveModal,
    addChallenge,
    updateChallenge,
    challengeBeingEdited,
    setChallengeBeingEdited,
  } = useApp();
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);
  const [form, setForm] = useState({
    name: '',
    description: '',
    type: 'Song Completion',
    startDate: '2026-10-17',
    endDate: '2026-10-20',
    participants: '',
  });

  useEffect(() => {
    if (activeModal === 'create-challenge' && challengeBeingEdited) {
      setForm({
        name: challengeBeingEdited.name || '',
        description: challengeBeingEdited.description || '',
        type: challengeBeingEdited.type || 'Song Completion',
        startDate: challengeBeingEdited.startDate || '2026-10-17',
        endDate: challengeBeingEdited.endDate || '2026-10-20',
        participants: String(challengeBeingEdited.participants || ''),
      });
    }
  }, [activeModal, challengeBeingEdited]);

  if (activeModal !== 'create-challenge') {
    return null;
  }

  const handleChange = (field) => (e) => {
    const raw = e.target.value;
    setForm((prev) => ({
      ...prev,
      [field]: field === 'participants' ? raw.replace(/[^0-9]/g, '') : raw,
    }));
  };

  const parseParticipants = () => {
    const parsed = parseInt(form.participants, 10);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const handleCreate = () => {
    if (!form.name.trim()) return;

    setCreating(true);
    setTimeout(() => {
      setCreating(false);
      setCreated(true);

      if (challengeBeingEdited) {
        updateChallenge(challengeBeingEdited.id, {
          name: form.name.trim(),
          type: form.type,
          startDate: form.startDate,
          endDate: form.endDate,
          participants: parseParticipants(),
        });
      } else if (addChallenge) {
        addChallenge({
          id: `challenge-${Date.now()}`,
          name: form.name.trim(),
          description: form.description.trim() || 'Karaoke vocal milestone',
          type: form.type,
          startDate: form.startDate,
          endDate: form.endDate,
          participants: parseParticipants(),
          status: 'Active',
        });
      }

      setTimeout(() => {
        setCreated(false);
        setActiveModal(null);
        setChallengeBeingEdited(null);
        setForm({
          name: '',
          description: '',
          type: 'Song Completion',
          startDate: '2026-10-17',
          endDate: '2026-10-20',
          participants: '',
        });
      }, 800);
    }, 600);
  };

  const closeModal = () => {
    setActiveModal(null);
    setChallengeBeingEdited(null);
    setForm({
      name: '',
      description: '',
      type: 'Song Completion',
      startDate: '2026-10-17',
      endDate: '2026-10-20',
      participants: '',
    });
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
                {challengeBeingEdited ? 'Save Changes' : 'Create Challenge'}
              </h3>
              <p className="text-[11px] text-slate-400">
                Set up a new karaoke challenge
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
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

          {!challengeBeingEdited && (
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
          )}

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

          {/* Participants */}
          <div>
            <label className={labelClass}>Participants</label>
            <input
              type="text"
              inputMode="numeric"
              value={form.participants}
              onChange={handleChange('participants')}
              placeholder="e.g. 100"
              className={inputClass}
            />
            <p className="text-[10px] text-slate-400 mt-1.5">
              Expected number of participants for this challenge.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={closeModal}
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

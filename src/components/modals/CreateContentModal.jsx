import React, { useState } from 'react';
import { X, Plus, CheckCircle2, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { availableCatalogueSongs } from '../../data/mockContent';

export const CreateContentModal = ({ onContentCreated }) => {
  const { activeModal, setActiveModal } = useApp();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [songQuery, setSongQuery] = useState('');
  const [selectedSongs, setSelectedSongs] = useState([
    'Kesariya',
    'Apna Bana Le',
    'Chaleya',
    'O Maahi',
  ]);
  const [form, setForm] = useState({
    contentType: 'Collection',
    status: 'Draft',
    title: '',
    description: '',
    placement: 'Both Home & Discover',
  });

  if (activeModal !== 'create-content') {
    return null;
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const removeSong = (songToRemove) => {
    setSelectedSongs((prev) => prev.filter((s) => s !== songToRemove));
  };

  const addSong = (songToAdd) => {
    if (!selectedSongs.includes(songToAdd)) {
      setSelectedSongs((prev) => [...prev, songToAdd]);
    }
    setSongQuery('');
  };

  const filteredCatalogue = availableCatalogueSongs.filter(
    (s) =>
      s.toLowerCase().includes(songQuery.toLowerCase()) &&
      !selectedSongs.includes(s)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);

      if (onContentCreated) {
        onContentCreated({
          id: `col-${Date.now()}`,
          title: form.title.trim(),
          description: form.description.trim() || 'Curated track collection',
          contentType: form.contentType,
          songCount: selectedSongs.length || 10,
          placement: form.placement.includes('Home') && form.placement.includes('Discover')
            ? 'Both'
            : form.placement.includes('Home')
              ? 'Home'
              : 'Discover',
          status: form.status,
          coverImg: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=120&auto=format&fit=crop&q=80',
          songs: selectedSongs,
        });
      }

      setTimeout(() => {
        setSaved(false);
        setActiveModal(null);
        setForm({
          contentType: 'Collection',
          status: 'Draft',
          title: '',
          description: '',
          placement: 'Both Home & Discover',
        });
        setSelectedSongs(['Kesariya', 'Apna Bana Le', 'Chaleya', 'O Maahi']);
      }, 700);
    }, 600);
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
            <h3 className="text-lg font-bold text-slate-900">Create Content</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Create a collection or manage featured content in VOX.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setActiveModal(null);
              setSongQuery('');
              setSelectedSongs(['Kesariya', 'Apna Bana Le', 'Chaleya', 'O Maahi']);
            }}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
          {/* Content Type & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Content Type</label>
              <select
                value={form.contentType}
                onChange={handleChange('contentType')}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="Collection">Collection</option>
                <option value="Playlist">Playlist</option>
                <option value="Curated Collection">Curated Collection</option>
                <option value="Featured Banner">Featured Banner</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Status</label>
              <select
                value={form.status}
                onChange={handleChange('status')}
                className={`${inputClass} appearance-none cursor-pointer`}
              >
                <option value="Draft">Draft</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className={labelClass}>Title</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={handleChange('title')}
              placeholder="Enter content title"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={form.description}
              onChange={handleChange('description')}
              placeholder="Add a short description..."
              rows={2}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Placement */}
          <div>
            <label className={labelClass}>Placement</label>
            <select
              value={form.placement}
              onChange={handleChange('placement')}
              className={`${inputClass} appearance-none cursor-pointer`}
            >
              <option value="Both Home & Discover">Both Home & Discover</option>
              <option value="Home">Home Only</option>
              <option value="Discover">Discover Only</option>
            </select>
          </div>

          {/* Select Songs */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className={labelClass.replace('mb-1.5', '')}>Select Songs</label>
              <span className="text-xs font-semibold text-[#ff2b75]">
                {selectedSongs.length} selected
              </span>
            </div>

            <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              {/* Chips */}
              <div className="flex flex-wrap gap-1.5">
                {selectedSongs.map((song) => (
                  <span
                    key={song}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-white border border-slate-200 text-slate-700 shadow-2xs"
                  >
                    <span>{song}</span>
                    <button
                      type="button"
                      onClick={() => removeSong(song)}
                      className="text-slate-400 hover:text-rose-500 transition cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>

              {/* Search Catalogue Songs */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={songQuery}
                  onChange={(e) => setSongQuery(e.target.value)}
                  placeholder="Search catalogue songs..."
                  className="w-full text-xs text-slate-800 placeholder-slate-400 pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-[#ff2b75]"
                />
              </div>

              {/* Autocomplete Dropdown if typing */}
              {songQuery && filteredCatalogue.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-lg max-h-32 overflow-y-auto divide-y divide-slate-100 shadow-sm">
                  {filteredCatalogue.slice(0, 5).map((song) => (
                    <div
                      key={song}
                      onClick={() => addSong(song)}
                      className="px-3 py-1.5 text-xs text-slate-700 hover:bg-pink-50 hover:text-[#ff2b75] cursor-pointer flex items-center justify-between"
                    >
                      <span>{song}</span>
                      <Plus className="w-3 h-3" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Catalogue songs available for Collections & Featured Songs.
            </p>
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                setSongQuery('');
                setSelectedSongs(['Kesariya', 'Apna Bana Le', 'Chaleya', 'O Maahi']);
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
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
                <>
                  <Plus className="w-3.5 h-3.5 stroke-3" /> Create Content
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

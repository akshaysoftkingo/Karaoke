import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Music2 } from 'lucide-react';
import { mockSongsList } from '../../data/mockSongs';
import { ProviderBadge } from './ProviderBadge';
import { StatusBadge } from '../common/StatusBadge';
import { RowActions } from '../common/RowActions';
import { Pagination } from '../common/Pagination';
import { useApp } from '../../context/AppContext';

export const SongsTable = () => {
  const { setActiveModal, confirmDelete } = useApp();
  const [songs, setSongs] = useState(mockSongsList);
  const [searchTerm, setSearchTerm] = useState('');
  const [providerFilter, setProviderFilter] = useState('All Providers');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [languageFilter, setLanguageFilter] = useState('All Languages');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSong, setSelectedSong] = useState(null);
  const pageSize = 10;

  // Filter songs
  const filteredSongs = useMemo(() => {
    return songs.filter((song) => {
      const matchSearch =
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.trackCode.toLowerCase().includes(searchTerm.toLowerCase());

      const matchProvider =
        providerFilter === 'All Providers' ||
        song.provider.toLowerCase() === providerFilter.toLowerCase();

      const matchStatus =
        statusFilter === 'All Statuses' ||
        song.status.toLowerCase() === statusFilter.toLowerCase();

      const matchLanguage =
        languageFilter === 'All Languages' ||
        song.language.toLowerCase() === languageFilter.toLowerCase();

      return matchSearch && matchProvider && matchStatus && matchLanguage;
    });
  }, [songs, searchTerm, providerFilter, statusFilter, languageFilter]);

  const handleSongAction = (action, song) => {
    if (action === 'del') {
      confirmDelete(`Remove "${song.title}" from the catalogue? This action cannot be undone.`, () =>
        setSongs((prev) => prev.filter((item) => item.id !== song.id))
      );
    } else if (action === 'lyrics' || action === 'preview') {
      setSelectedSong(song);
    } else if (action === 're-sync') {
      setSongs((prev) =>
        prev.map((item) => (item.id === song.id ? { ...item, status: 'Ready' } : item))
      );
    }
  };

  const totalPages = Math.ceil(filteredSongs.length / pageSize) || 1;
  const paginatedSongs = filteredSongs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search songs, artists or track ID..."
            className="w-full text-xs text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#ff2b75] focus:outline-none transition-all"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Provider */}
          <div className="relative">
            <select
              value={providerFilter}
              onChange={(e) => {
                setProviderFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl pl-3.5 pr-8 py-2.5 focus:border-[#ff2b75] focus:outline-none cursor-pointer"
            >
              <option>All Providers</option>
              <option>Spotify</option>
              <option>Apple Music</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl pl-3.5 pr-8 py-2.5 focus:border-[#ff2b75] focus:outline-none cursor-pointer"
            >
              <option>All Statuses</option>
              <option>Ready</option>
              <option>Unavailable</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Languages */}
          <div className="relative">
            <select
              value={languageFilter}
              onChange={(e) => {
                setLanguageFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl pl-3.5 pr-8 py-2.5 focus:border-[#ff2b75] focus:outline-none cursor-pointer"
            >
              <option>All Languages</option>
              <option>Hindi</option>
              <option>English</option>
              <option>Punjabi</option>
              <option>Tamil</option>
              <option>Bengali</option>
              <option>Marathi</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Sync Status Banner */}
      <div className="flex items-center justify-between text-xs text-slate-500 py-1.5 border-b border-slate-100">
        <div>
          Last catalogue sync:{' '}
          <span className="font-semibold text-slate-700">Today, 10:30 AM</span>{' '}
          • Connected providers:{' '}
          <span className="font-semibold text-slate-700">2</span>
        </div>
        <button
          onClick={() => setActiveModal('view-sync-logs')}
          className="font-bold text-slate-700 hover:text-[#ff2b75] transition-colors cursor-pointer"
        >
          View Sync Logs
        </button>
      </div>

      {/* Songs Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs table-fixed">
          <thead>
            <tr className="text-[11px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">
              <th className="py-3 px-3 pl-0 w-[14.29%]">SONG</th>
              <th className="py-3 px-3 w-[14.29%]">ARTIST</th>
              <th className="py-3 px-3 w-[14.29%]">PROVIDER</th>
              <th className="py-3 px-3 w-[14.29%]">DURATION</th>
              <th className="py-3 px-3 w-[14.29%]">LANGUAGE</th>
              <th className="py-3 px-3 w-[14.29%]">KARAOKE STATUS</th>
              <th className="py-3 px-3 text-right pr-0 w-[14.29%]">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/70">
            {paginatedSongs.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  No songs found matching your search.
                </td>
              </tr>
            ) : (
              paginatedSongs.map((song) => (
                <tr
                  key={song.id}
                  className="hover:bg-[#f8fafc]/70 transition-colors"
                >
                  {/* Song Title & Artwork */}
                  <td className="py-3 px-3 pl-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 shadow-xs relative bg-slate-100">
                        <img
                          src={song.coverImg}
                          alt={song.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-tr ${song.coverGradient} flex items-center justify-center -z-10`}
                        >
                          <Music2 className="w-4 h-4 text-white/70" />
                        </div>
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">
                          {song.title}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {song.trackCode}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Artist */}
                  <td className="py-3 px-3 font-medium text-slate-700">
                    {song.artist}
                  </td>

                  {/* Provider */}
                  <td className="py-3 px-3">
                    <ProviderBadge provider={song.provider} />
                  </td>

                  {/* Duration */}
                  <td className="py-3 px-3 font-medium text-slate-600">
                    {song.duration}
                  </td>

                  {/* Language */}
                  <td className="py-3 px-3 text-slate-700 font-medium">
                    {song.language}
                  </td>

                  {/* Karaoke Status */}
                  <td className="py-3 px-3">
                    <StatusBadge status={song.status} type="song" />
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-3 text-right pr-0">
                    <RowActions
                      onView={() => setSelectedSong(song)}
                      onDelete={() => handleSongAction('del', song)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - 10 page limit */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredSongs.length}
        pageSize={pageSize}
        itemLabel="songs"
        onPageChange={(p) => setCurrentPage(p)}
      />

      {selectedSong && (
        <div className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 p-6">
            <div className="flex items-start justify-between gap-4">
              <div><h3 className="text-sm font-bold text-slate-900">{selectedSong.title}</h3><p className="text-xs text-slate-500 mt-1">{selectedSong.artist}</p></div>
              <button type="button" onClick={() => setSelectedSong(null)} className="text-xs font-semibold text-slate-400 hover:text-slate-700">Close</button>
            </div>
            <p className="text-xs text-slate-600 mt-5">{selectedSong.lyrics || 'Lyrics and karaoke cues are ready for this track.'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

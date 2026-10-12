import React, { useState } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import { RowActions } from '../common/RowActions';
import { Pagination } from '../common/Pagination';
import { useApp } from '../../context/AppContext';

export const ContentTable = ({
  activeTab,
  collections,
  featuredSongs,
  banners,
  onUpdateCollections,
  onUpdateFeaturedSongs,
  onUpdateBanners,
}) => {
  const { confirmDelete } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedPlacement, setSelectedPlacement] = useState('All Placements');
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;

  // Filter collections
  const filteredCollections = collections.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === 'All Statuses' || item.status === selectedStatus;
    const matchesPlacement =
      selectedPlacement === 'All Placements' ||
      item.placement === selectedPlacement ||
      item.placement === 'Both';
    return matchesSearch && matchesStatus && matchesPlacement;
  });

  // Filter featured songs
  const filteredSongs = featuredSongs.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === 'All Statuses' || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Filter banners
  const filteredBanners = banners.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === 'All Statuses' || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getActiveList = () => {
    if (activeTab === 'collections') return filteredCollections;
    if (activeTab === 'featuredSongs') return filteredSongs;
    return filteredBanners;
  };

  const currentList = getActiveList();
  const totalPages = Math.max(1, Math.ceil(currentList.length / pageSize));
  const paginatedList = currentList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('All Statuses');
    setSelectedPlacement('All Placements');
    setCurrentPage(1);
  };

  const toggleCollectionStatus = (id) => {
    if (onUpdateCollections) {
      onUpdateCollections((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' }
            : c
        )
      );
    }
  };

  const deleteCollection = (id) => {
    if (onUpdateCollections) {
      onUpdateCollections((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const toggleSongStatus = (id) => {
    if (onUpdateFeaturedSongs) {
      onUpdateFeaturedSongs((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' }
            : s
        )
      );
    }
  };

  const deleteSong = (id) => {
    if (onUpdateFeaturedSongs) {
      onUpdateFeaturedSongs((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const toggleBannerStatus = (id) => {
    if (onUpdateBanners) {
      onUpdateBanners((prev) =>
        prev.map((b) =>
          b.id === id
            ? { ...b, status: b.status === 'Active' ? 'Inactive' : 'Active' }
            : b
        )
      );
    }
  };

  const deleteBanner = (id) => {
    if (onUpdateBanners) {
      onUpdateBanners((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-b border-slate-100">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={
              activeTab === 'collections'
                ? 'Search collections by title, description...'
                : activeTab === 'featuredSongs'
                  ? 'Search featured songs by title, artist...'
                  : 'Search promotional banners...'
            }
            className="w-full pl-10 pr-4 py-2 bg-white text-xs text-slate-800 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:border-[#ff2b75] transition"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs text-slate-700 font-medium px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#ff2b75] cursor-pointer"
          >
            <option>All Statuses</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Draft</option>
          </select>

          {activeTab === 'collections' && (
            <select
              value={selectedPlacement}
              onChange={(e) => {
                setSelectedPlacement(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs text-slate-700 font-medium px-3.5 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#ff2b75] cursor-pointer"
            >
              <option>All Placements</option>
              <option>Home</option>
              <option>Discover</option>
            </select>
          )}

          <button
            onClick={resetFilters}
            title="Reset filters"
            className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content depending on Active Tab */}
      <div className="overflow-x-auto">
        {activeTab === 'collections' && (
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/40">
                <th className="py-3.5 px-6 w-[16.67%]">Collection</th>
                <th className="py-3.5 px-6 w-[16.67%]">Content Type</th>
                <th className="py-3.5 px-6 w-[16.67%]">Songs</th>
                <th className="py-3.5 px-6 w-[16.67%]">Placement</th>
                <th className="py-3.5 px-6 w-[16.67%]">Status</th>
                <th className="py-3.5 px-6 text-right w-[16.67%]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No collections found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedList.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* Collection Thumbnail & Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3.5">
                        <img
                          src={item.coverImg}
                          alt={item.title}
                          className="w-10 h-10 rounded-xl object-cover shrink-0 shadow-2xs border border-slate-100"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-sm">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {item.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Content Type */}
                    <td className="py-4 px-6 font-medium text-slate-700">
                      {item.contentType}
                    </td>

                    {/* Songs */}
                    <td className="py-4 px-6 font-medium text-slate-700">
                      {item.songCount} songs
                    </td>

                    {/* Placement */}
                    <td className="py-4 px-6">
                      {item.placement === 'Home' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200/60">
                          Home
                        </span>
                      ) : item.placement === 'Discover' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-50 text-[#ff2b75] border border-pink-200/60">
                          Discover
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200/60">
                          Both
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      {item.status === 'Active' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <RowActions
                        onToggle={() => toggleCollectionStatus(item.id)}
                        toggleOn={item.status === 'Active'}
                        onDelete={() =>
                          confirmDelete(
                            `Delete "${item.title}"? This action cannot be undone.`,
                            () => deleteCollection(item.id)
                          )
                        }
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* Featured Songs Tab View */}
        {activeTab === 'featuredSongs' && (
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/40">
                <th className="py-3.5 px-6 w-[16.67%]">Song</th>
                <th className="py-3.5 px-6 w-[16.67%]">Artist</th>
                <th className="py-3.5 px-6 w-[16.67%]">Total Plays</th>
                <th className="py-3.5 px-6 w-[16.67%]">Placement Spot</th>
                <th className="py-3.5 px-6 w-[16.67%]">Status</th>
                <th className="py-3.5 px-6 text-right w-[16.67%]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {paginatedList.map((song) => (
                <tr key={song.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900 text-sm">
                    {song.title}
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-600">
                    {song.artist}
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-800">
                    {song.plays}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-pink-50 text-[#ff2b75] border border-pink-200/60">
                      {song.placement}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {song.status === 'Active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <RowActions
                      onToggle={() => toggleSongStatus(song.id)}
                      toggleOn={song.status === 'Active'}
                      onDelete={() =>
                        confirmDelete(
                          `Delete "${song.title}"? This action cannot be undone.`,
                          () => deleteSong(song.id)
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Banners Tab View */}
        {activeTab === 'banners' && (
          <table className="w-full text-left border-collapse table-fixed">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50/40">
                <th className="py-3.5 px-6 w-[16.67%]">Banner Title & Target</th>
                <th className="py-3.5 px-6 w-[16.67%]">Placement</th>
                <th className="py-3.5 px-6 w-[16.67%]">Impressions</th>
                <th className="py-3.5 px-6 w-[16.67%]">Clicks</th>
                <th className="py-3.5 px-6 w-[16.67%]">Status</th>
                <th className="py-3.5 px-6 text-right w-[16.67%]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {paginatedList.map((banner) => (
                <tr key={banner.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">
                      {banner.title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {banner.subtitle}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-700">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200/60">
                      {banner.placement}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-800">
                    {banner.impressions}
                  </td>
                  <td className="py-4 px-6 font-semibold text-slate-800">
                    {banner.clicks}
                  </td>
                  <td className="py-4 px-6">
                    {banner.status === 'Active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <RowActions
                      onToggle={() => toggleBannerStatus(banner.id)}
                      toggleOn={banner.status === 'Active'}
                      onDelete={() =>
                        confirmDelete(
                          `Delete "${banner.title}"? This action cannot be undone.`,
                          () => deleteBanner(banner.id)
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Bar */}
      <div className="px-6 py-4 border-t border-slate-100">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={currentList.length}
          pageSize={pageSize}
          itemLabel={
            activeTab === 'collections'
              ? 'collections'
              : activeTab === 'featuredSongs'
                ? 'featured songs'
                : 'banners'
          }
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

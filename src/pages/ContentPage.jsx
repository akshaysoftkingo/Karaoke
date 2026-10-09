import React, { useState } from 'react';
import { Plus, Folder, Music, Layout } from 'lucide-react';
import {
  initialCollectionsList,
  initialFeaturedSongsList,
  initialBannersList,
} from '../data/mockContent';
import { MetricCard } from '../components/common/MetricCard';
import { ContentTable } from '../components/content/ContentTable';
import { CreateContentModal } from '../components/modals/CreateContentModal';
import { useApp } from '../context/AppContext';

export const ContentPage = () => {
  const { setActiveModal } = useApp();
  const [activeTab, setActiveTab] = useState('collections');
  const [collections, setCollections] = useState(initialCollectionsList);
  const [featuredSongs, setFeaturedSongs] = useState(initialFeaturedSongsList);
  const [banners, setBanners] = useState(initialBannersList);

  const metrics = [
    {
      id: 'total-collections',
      label: 'TOTAL COLLECTIONS',
      value: collections.length.toString(),
      icon: Folder,
      iconBox: true,
      badgeColor: 'bg-pink-50 text-[#ff2b75]',
    },
    {
      id: 'featured-songs',
      label: 'FEATURED SONGS',
      value: featuredSongs.length.toString(),
      icon: Music,
      iconBox: true,
      badgeColor: 'bg-pink-50 text-[#ff2b75]',
    },
    {
      id: 'active-banners',
      label: 'ACTIVE BANNERS',
      value: banners.length.toString(),
      icon: Layout,
      iconBox: true,
      badgeColor: 'bg-pink-50 text-[#ff2b75]',
    },
  ];

  const handleContentCreated = (newContent) => {
    setCollections((prev) => [newContent, ...prev]);
    setActiveTab('collections');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Content
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage featured songs, curated playlists, and content displayed in the app.
          </p>
        </div>

        <button
          onClick={() => setActiveModal('create-content')}
          className="bg-[#ff2b75] hover:bg-[#e61d65] active:scale-98 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm shadow-pink-500/20 flex items-center gap-2 transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-3" />
          <span>Create Content</span>
        </button>
      </div>

      {/* Top 3 Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
            iconBox={true}
            badgeColor={metric.badgeColor}
          />
        ))}
      </div>

      {/* Segmented Tabs matching screenshot */}
      <div className="flex items-center gap-6 border-b border-slate-200/80 px-1 pt-1">
        <button
          onClick={() => setActiveTab('collections')}
          className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
            activeTab === 'collections'
              ? 'text-[#ff2b75]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Collections</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              activeTab === 'collections'
                ? 'bg-pink-100 text-[#ff2b75]'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {collections.length}
          </span>
          {activeTab === 'collections' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff2b75] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('featuredSongs')}
          className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
            activeTab === 'featuredSongs'
              ? 'text-[#ff2b75]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Featured Songs</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              activeTab === 'featuredSongs'
                ? 'bg-pink-100 text-[#ff2b75]'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {featuredSongs.length}
          </span>
          {activeTab === 'featuredSongs' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff2b75] rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('banners')}
          className={`pb-3 text-xs font-bold transition-all relative flex items-center gap-2 cursor-pointer ${
            activeTab === 'banners'
              ? 'text-[#ff2b75]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Banners</span>
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
              activeTab === 'banners'
                ? 'bg-pink-100 text-[#ff2b75]'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {banners.length}
          </span>
          {activeTab === 'banners' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff2b75] rounded-full" />
          )}
        </button>
      </div>

      {/* Main Content Table */}
      <ContentTable
        activeTab={activeTab}
        collections={collections}
        featuredSongs={featuredSongs}
        banners={banners}
        onUpdateCollections={setCollections}
        onUpdateFeaturedSongs={setFeaturedSongs}
        onUpdateBanners={setBanners}
      />

      {/* Create Content Modal */}
      <CreateContentModal onContentCreated={handleContentCreated} />
    </div>
  );
};

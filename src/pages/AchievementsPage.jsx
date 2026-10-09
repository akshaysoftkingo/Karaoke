import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  initialAchievementsList,
  getAchievementMetrics,
} from '../data/mockAchievements';
import { MetricCard } from '../components/common/MetricCard';
import { AchievementsTable } from '../components/achievements/AchievementsTable';
import { CreateAchievementModal } from '../components/modals/CreateAchievementModal';
import { useApp } from '../context/AppContext';

export const AchievementsPage = () => {
  const { setActiveModal } = useApp();
  const [achievements, setAchievements] = useState(initialAchievementsList);

  const metrics = getAchievementMetrics(achievements);

  const handleAchievementCreated = (newAchievement) => {
    setAchievements((prev) => [newAchievement, ...prev]);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Achievements
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage user achievements and track unlock progress.
          </p>
        </div>

        <button
          onClick={() => setActiveModal('create-achievement')}
          className="bg-[#ff2b75] hover:bg-[#e61d65] active:scale-98 text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm shadow-pink-500/20 flex items-center gap-2 transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-3" />
          <span>Create Achievement</span>
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

      {/* Main Table */}
      <AchievementsTable
        achievements={achievements}
        onUpdateAchievements={setAchievements}
      />

      {/* Modal */}
      <CreateAchievementModal onAchievementCreated={handleAchievementCreated} />
    </div>
  );
};

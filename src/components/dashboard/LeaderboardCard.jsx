import React from 'react';
import { Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { leaderboardSnapshot } from '../../data/mockDashboard';

export const LeaderboardCard = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-200/70 rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Leaderboard Snapshot
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Top performing singers this week
            </p>
          </div>
          <Trophy className="w-4 h-4 text-[#ff2b75]" />
        </div>

        {/* Singer Rows */}
        <div className="mt-3 divide-y divide-slate-100/70">
          {leaderboardSnapshot.map((user) => (
            <div
              key={user.rank}
              className="py-2.5 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-slate-400 w-4">
                  #{user.rank}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${user.avatarBg}`}
                >
                  {user.initials}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-xs leading-none">
                    {user.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    {user.subtitle}
                  </span>
                </div>
              </div>

              <div
                className={`font-bold text-xs ${
                  user.isTop ? 'text-[#ff2b75]' : 'text-slate-700'
                }`}
              >
                {user.xp}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => navigate('/leaderboard')}
        className="w-full mt-3 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200/70 transition-all text-center"
      >
        View Leaderboard
      </button>
    </div>
  );
};

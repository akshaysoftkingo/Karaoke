import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Music2,
  Mic2,
  Trophy,
  Target,
  Award,
  FolderClosed,
  Bell,
  LineChart,
  Settings,
} from 'lucide-react';

export const Sidebar = ({ onNavigate }) => {
  const navGroups = [
    {
      group: 'MAIN',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'songs', label: 'Songs', icon: Music2 },
        { id: 'performances', label: 'Performances', icon: Mic2 },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
      ],
    },
    {
      group: 'ENGAGEMENT',
      items: [
        { id: 'challenges', label: 'Challenges', icon: Target },
        { id: 'achievements', label: 'Achievements', icon: Award },
        { id: 'content', label: 'Content', icon: FolderClosed },
      ],
    },
    {
      group: 'MANAGEMENT',
      items: [
        { id: 'reports', label: 'Reports & Analytics', icon: LineChart },
        { id: 'notifications', label: 'Notifications', icon: Bell },
      ],
    },
    {
      group: 'SYSTEM',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 min-w-[256px] bg-white border-r border-slate-200/80 min-h-screen flex flex-col select-none">
      {/* Brand Header */}
      <div className="p-6 pb-5 flex items-center">
        <img
          src="/softkingo-logo.png"
          alt="Softkingo"
          className="h-8 w-auto max-w-[180px] object-contain"
        />
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 px-4 py-2 space-y-6 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.group}>
            <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              {group.group}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.id}
                    to={`/${item.id}`}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 text-left ${
                        isActive
                          ? 'bg-[#ff2b75] text-white shadow-md shadow-pink-500/25'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className={`w-[18px] h-[18px] shrink-0 ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                          }`}
                          strokeWidth={isActive ? 2.3 : 1.8}
                        />
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

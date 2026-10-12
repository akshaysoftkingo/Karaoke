import React, { useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowUp,
  Mail,
  Mic2,
  MoreVertical,
  Music,
  Star,
  Trophy,
  Users,
} from 'lucide-react';
import { mockUsersList } from '../data/mockUsers';
import { StatusBadge } from '../components/common/StatusBadge';

const recentSongsPool = [
  { title: 'Kesariya', artist: 'Arijit Singh', genre: 'Bollywood', duration: '03:42' },
  { title: 'Apna Bana Le', artist: 'Arijit Singh', genre: 'Romantic', duration: '03:18' },
  { title: 'Chaleya', artist: 'Arijit Singh, Shilpa Rao', genre: 'Dance', duration: '03:05' },
  { title: 'O Maahi', artist: 'Arijit Singh', genre: 'Soulful', duration: '03:36' },
  { title: 'Heeriye', artist: 'Jasleen Royal, Arijit Singh', genre: 'Romantic', duration: '02:58' },
  { title: 'Tum Kya Mile', artist: 'Arijit Singh, Shreya Ghoshal', genre: 'Romantic', duration: '04:12' },
  { title: 'Raataan Lambiyan', artist: 'Jubin Nautiyal, Asees Kaur', genre: 'Love', duration: '03:50' },
  { title: 'Pasoori', artist: 'Ali Sethi, Shae Gill', genre: 'Pop', duration: '03:44' },
];

const songTints = [
  'bg-pink-100 text-[#ff2b75]',
  'bg-violet-100 text-violet-500',
  'bg-amber-100 text-amber-600',
  'bg-sky-100 text-sky-600',
];

const followedSingersPool = [
  { name: 'Aarav Music', handle: '@aaravmusic', initials: 'AM', bg: 'bg-indigo-100 text-indigo-600' },
  { name: 'Priya Sings', handle: '@priyasingsofficial', initials: 'PS', bg: 'bg-pink-100 text-[#ff2b75]' },
  { name: 'Rohan Melodies', handle: '@rohanmelodies', initials: 'RM', bg: 'bg-emerald-100 text-emerald-600' },
  { name: 'Neha Vocals', handle: '@nevavocals', initials: 'NV', bg: 'bg-violet-100 text-violet-600' },
  { name: 'DJ Arjun', handle: '@djarjun', initials: 'DA', bg: 'bg-amber-100 text-amber-600' },
  { name: 'Meera Soul', handle: '@meerasoul', initials: 'MS', bg: 'bg-sky-100 text-sky-600' },
  { name: 'Kabir Beats', handle: '@kabirbeats', initials: 'KB', bg: 'bg-rose-100 text-rose-600' },
  { name: 'Ananya Tunes', handle: '@ananyatunes', initials: 'AT', bg: 'bg-teal-100 text-teal-600' },
  { name: 'Ravi Ragas', handle: '@raviraga', initials: 'RR', bg: 'bg-blue-100 text-blue-600' },
  { name: 'Simran Notes', handle: '@simrannotes', initials: 'SN', bg: 'bg-fuchsia-100 text-fuchsia-600' },
  { name: 'Devansh Live', handle: '@devanshlive', initials: 'DL', bg: 'bg-lime-100 text-lime-700' },
  { name: 'Kavita Chords', handle: '@kavitachords', initials: 'KC', bg: 'bg-cyan-100 text-cyan-700' },
  { name: 'Aditya Riffs', handle: '@adityariffs', initials: 'AR', bg: 'bg-purple-100 text-purple-600' },
  { name: 'Rhea Harmonies', handle: '@rheaharmonies', initials: 'RH', bg: 'bg-pink-100 text-pink-600' },
  { name: 'Karan Studio', handle: '@karanstudio', initials: 'KS', bg: 'bg-orange-100 text-orange-600' },
  { name: 'Ishita Melodies', handle: '@ishitamelodies', initials: 'IM', bg: 'bg-indigo-100 text-indigo-500' },
  { name: 'Varun Soul', handle: '@varunsoul', initials: 'VS', bg: 'bg-emerald-100 text-emerald-500' },
  { name: 'Pooja Beats', handle: '@poojabeats', initials: 'PB', bg: 'bg-sky-100 text-sky-500' },
  { name: 'Ishaan Rhythm', handle: '@ishaanrhythm', initials: 'IR', bg: 'bg-amber-100 text-amber-500' },
  { name: 'Aanya Voice', handle: '@aanyavoice', initials: 'AN', bg: 'bg-rose-100 text-rose-500' },
  { name: 'Sahil Studio', handle: '@sahilstudio', initials: 'SS', bg: 'bg-violet-100 text-violet-500' },
  { name: 'Kiara Notes', handle: '@kiaranotes', initials: 'KN', bg: 'bg-teal-100 text-teal-500' },
  { name: 'Tara Melody', handle: '@taramelody', initials: 'TM', bg: 'bg-fuchsia-100 text-fuchsia-500' },
  { name: 'Nikhil Beats', handle: '@nikhilbeats', initials: 'NB', bg: 'bg-blue-100 text-blue-500' },
];

const tierChipStyles = {
  Gold: 'bg-amber-50 text-amber-600 border border-amber-200',
  Silver: 'bg-slate-200 text-slate-600 border border-slate-300',
  Bronze: 'bg-orange-50 text-orange-700 border border-orange-200',
};

const tierStarStyles = {
  Gold: 'fill-amber-500 text-amber-500',
  Silver: 'fill-slate-400 text-slate-400',
  Bronze: 'fill-orange-500 text-orange-500',
};

const buildUserInsights = (user) => {
  const seed = parseInt(String(user.id).replace(/\D/g, ''), 10) || 1;

  const songStart = (seed - 1) % recentSongsPool.length;
  const dayBase = 10 - (seed % 6);
  const dayOffsets = [0, 1, 2, 4];
  const scores = [92, 87, 76, 89, 81, 90, 74, 85];

  const recentPerformances = [];
  const takePatterns = [
    [1, 2, 3, 1],
    [2, 1, 3, 1],
    [3, 1, 2, 1],
  ];
  const takeCounts = takePatterns[(seed - 1) % 3];
  for (let j = 0; j < 4; j++) {
    const poolIndex = (songStart + j) % recentSongsPool.length;
    const song = recentSongsPool[poolIndex];
    const count = takeCounts[j];
    const day = Math.max(1, dayBase - dayOffsets[j]);
    for (let k = 0; k < count; k++) {
      recentPerformances.push({
        key: `${poolIndex}-${k}`,
        ...song,
        date: `Oct ${day < 10 ? '0' : ''}${day}, 2026`,
        score: scores[poolIndex],
        tint: songTints[poolIndex % songTints.length],
      });
    }
  }

  const recordingsShown = new Set(recentPerformances.map((p) => p.title)).size;
  const performances = Math.max(
    recordingsShown,
    Math.round(user.songsSung * 0.6) + (seed % 3)
  );

  const followersCount = 12 + ((seed * 6) % 12);
  const followerStart = (seed - 1) % followedSingersPool.length;

  return {
    songsThisMonth: Math.min(
      Math.max(1, Math.round(user.songsSung * 0.15)),
      5 + ((seed * 7) % 15)
    ),
    performances,
    avgScore: 75 + ((seed * 13) % 16),
    leaderboardPoints: Math.round(user.songsSung * 87.5) + 25 * seed,
    followersCount,
    recentPerformances,
    recordingsShown,
    lastActive: recentPerformances[0]?.date || user.joinedDate,
    followedSingers: Array.from(
      { length: 4 },
      (_, k) => followedSingersPool[(followerStart + k) % followedSingersPool.length]
    ),
    followedSingersAll: Array.from(
      { length: followersCount },
      (_, k) => followedSingersPool[(followerStart + k) % followedSingersPool.length]
    ),
  };
};

export const UserDetailPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [showAllSingers, setShowAllSingers] = useState(false);

  const user = mockUsersList.find(
    (u) => u.userId.replace('#', '') === userId
  );

  if (!user) {
    return <Navigate to="/users" replace />;
  }

  const insights = buildUserInsights(user);

  const metricCards = [
    {
      label: 'SONGS SUNG',
      value: user.songsSung,
      sub: (
        <span className="inline-flex items-center gap-0.5 text-[#ff2b75] font-semibold">
          <ArrowUp className="w-3 h-3" />
          {insights.songsThisMonth} this month
        </span>
      ),
      icon: Music,
      iconBox: 'bg-pink-50',
      iconColor: 'text-[#ff2b75]',
    },
    {
      label: 'PERFORMANCES',
      value: insights.performances,
      sub: 'Completed takes',
      icon: Mic2,
      iconBox: 'bg-purple-50',
      iconColor: 'text-purple-500',
    },
    {
      label: 'AVERAGE SCORE',
      value: insights.avgScore,
      suffix: '/100',
      icon: Star,
      iconBox: 'bg-amber-50',
      iconColor: 'text-amber-500',
    },
    {
      label: 'LEADERBOARD POINTS',
      value: insights.leaderboardPoints.toLocaleString(),
      sub: 'XP earned',
      icon: Trophy,
      iconBox: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      label: 'SINGERS FOLLOWED',
      value: insights.followersCount,
      sub: 'Community network',
      icon: Users,
      iconBox: 'bg-pink-50',
      iconColor: 'text-[#ff2b75]',
    },
  ];

  const accountRows = [
    {
      label: 'Account Status',
      value: <StatusBadge status={user.status} type="user" />,
    },
    {
      label: 'Membership Tier',
      value: (
        <span
          className={`inline-flex px-2.5 py-1 rounded-lg text-[11px] font-bold ${
            tierChipStyles[user.tier] || tierChipStyles.Silver
          }`}
        >
          {user.tier}
        </span>
      ),
    },
    {
      label: 'Total Songs Sung',
      value: <span className="text-xs font-bold text-slate-900">{user.songsSung}</span>,
    },
    {
      label: 'Last Active',
      value: <span className="text-xs font-bold text-slate-900">{insights.lastActive}</span>,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-medium">
        <Link
          to="/users"
          className="text-slate-500 hover:text-[#ff2b75] transition-colors"
        >
          Users
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-400">User Details</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {user.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            View account information, karaoke activity, and followed singers.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            onClick={() => navigate('/users')}
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-2 transition cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Users</span>
          </button>
          <button
            type="button"
            title="More options"
            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 w-10 h-10 rounded-xl flex items-center justify-center transition cursor-pointer shadow-2xs"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shrink-0 ${user.avatarBg}`}
          >
            {user.initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-extrabold text-slate-900 text-lg">{user.name}</h2>
              <StatusBadge status={user.status} type="user" />
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                  tierChipStyles[user.tier] || tierChipStyles.Silver
                }`}
              >
                <Star
                  className={`w-3 h-3 ${
                    tierStarStyles[user.tier] || tierStarStyles.Silver
                  }`}
                />
                {user.tier} Tier
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500 mt-1.5 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {user.email}
              </span>
              <span className="text-slate-300">•</span>
              <span>ID: {user.userId}</span>
              <span className="text-slate-300">•</span>
              <span>Joined: {user.joinedDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-8 shrink-0 self-start sm:self-center bg-slate-50 border border-slate-200/70 rounded-xl px-5 py-3">
          <div>
            <div className="font-extrabold text-slate-900 text-base leading-tight">
              {insights.followersCount}
            </div>
            <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mt-0.5">
              Singers Followed
            </div>
          </div>
        </div>
      </div>

      {/* Insight Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {metricCards.map((card) => {
          const IconComp = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase block">
                  {card.label}
                </span>
                <div className="flex items-baseline gap-0.5 mt-1">
                  <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {card.value}
                  </span>
                  {card.suffix && (
                    <span className="text-xs font-semibold text-slate-400">
                      {card.suffix}
                    </span>
                  )}
                </div>
                {card.sub && (
                  <div className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    {card.sub}
                  </div>
                )}
              </div>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${card.iconBox}`}
              >
                <IconComp className={`w-4 h-4 ${card.iconColor}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Performances + Side Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Recent Performances */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Recent Performances</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Latest karaoke studio recordings and vocal evaluations.
              </p>
            </div>
            <span className="shrink-0 text-[11px] font-semibold text-slate-500 bg-slate-100 rounded-lg px-2.5 py-1">
              {insights.recordingsShown} recordings shown
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] font-bold tracking-wider text-slate-400 uppercase border-b border-slate-100">
                  <th className="py-3 pl-5 pr-3 font-bold">SONG</th>
                  <th className="py-3 px-3 font-bold">DATE</th>
                  <th className="py-3 px-3 font-bold">DURATION</th>
                  <th className="py-3 px-3 font-bold">SCORE</th>
                  <th className="py-3 pl-3 pr-5 font-bold">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/70">
                {insights.recentPerformances.map((perf) => (
                  <tr
                    key={perf.key}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    <td className="py-3.5 pl-5 pr-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${perf.tint}`}
                        >
                          <Music className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold text-slate-900 block text-xs">
                            {perf.title}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {perf.artist} • {perf.genre}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 font-medium">
                      {perf.date}
                    </td>
                    <td className="py-3.5 px-3 text-slate-500 font-medium">
                      {perf.duration}
                    </td>
                    <td className="py-3.5 px-3">
                      <span className="inline-flex px-2.5 py-1 rounded-lg bg-pink-50 text-[11px] font-bold text-slate-900">
                        {perf.score}/100
                      </span>
                    </td>
                    <td className="py-3.5 pl-3 pr-5">
                      <StatusBadge status="Completed" type="session-status" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>
              Showing last {insights.recordingsShown} recordings for {user.name}
            </span>
            <span>Last Active: {insights.lastActive}</span>
            <span>Total {insights.performances} takes recorded</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 flex flex-col">
          {/* Followed Singers */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-5 pb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Followed Singers</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Artists and community vocalists
                </p>
              </div>
              <button
                onClick={() => setShowAllSingers((prev) => !prev)}
                className="shrink-0 text-[#ff2b75] hover:text-[#e61d65] text-[11px] font-bold transition cursor-pointer"
              >
                {showAllSingers
                  ? 'Show Less'
                  : `View All (${insights.followersCount})`}
              </button>
            </div>

            <div
              className={`divide-y divide-slate-100/70 border-t border-slate-100 ${
                showAllSingers ? 'max-h-[259px] overflow-y-auto' : ''
              }`}
            >
              {(showAllSingers
                ? insights.followedSingersAll
                : insights.followedSingers
              ).map((singer) => (
                <div
                  key={singer.handle}
                  className="px-5 py-3.5 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${singer.bg}`}
                    >
                      {singer.initials}
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-slate-900 block text-xs truncate">
                        {singer.name}
                      </span>
                      <span className="text-[11px] text-slate-400 block truncate">
                        {singer.handle}
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 text-[11px] font-bold text-[#ff2b75] bg-pink-50 px-2.5 py-1 rounded-lg">
                    Following
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden flex-1">
            <div className="p-5 pb-4">
              <h3 className="font-bold text-slate-900 text-sm">Account Information</h3>
            </div>
            <div className="divide-y divide-slate-100/70 border-t border-slate-100">
              {accountRows.map((row) => (
                <div
                  key={row.label}
                  className="px-5 py-3.5 flex items-center justify-between gap-3"
                >
                  <span className="text-xs text-slate-500 font-medium">
                    {row.label}
                  </span>
                  {row.value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

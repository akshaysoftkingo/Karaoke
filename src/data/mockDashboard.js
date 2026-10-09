import { mockUsersList } from './mockUsers';

// Helper to generate 100 high fidelity mock performances
const singerNames = [
  { name: 'Sahil Sharma', initials: 'SS', color: 'bg-pink-100 text-pink-600' },
  { name: 'Priya Kapoor', initials: 'PK', color: 'bg-purple-100 text-purple-600' },
  { name: 'Rohan Mehta', initials: 'RM', color: 'bg-blue-100 text-blue-600' },
  { name: 'Aanya Sharma', initials: 'AS', color: 'bg-pink-100 text-[#ff2b75]' },
  { name: 'Arjun Verma', initials: 'AV', color: 'bg-indigo-100 text-indigo-700' },
  { name: 'Meera Iyer', initials: 'MI', color: 'bg-rose-100 text-rose-600' },
  { name: 'Devansh Roy', initials: 'DR', color: 'bg-amber-100 text-amber-700' },
  { name: 'Kavita Chawla', initials: 'KC', color: 'bg-emerald-100 text-emerald-700' },
  { name: 'Kabir Joshi', initials: 'KJ', color: 'bg-cyan-100 text-cyan-700' },
  { name: 'Neha Gupta', initials: 'NG', color: 'bg-fuchsia-100 text-fuchsia-600' },
];

const songsCatalog = [
  { song: 'Kesariya', artist: 'Arijit Singh' },
  { song: 'Chaleya', artist: 'Arijit Singh, Shilpa Rao' },
  { song: 'Apna Bana Le', artist: 'Arijit Singh' },
  { song: 'Tum Kya Mile', artist: 'Arijit Singh, Shreya Ghoshal' },
  { song: 'O Maahi', artist: 'Arijit Singh' },
  { song: 'Heeriye', artist: 'Jasleen Royal, Arijit Singh' },
  { song: 'Raataan Lambiyan', artist: 'Jubin Nautiyal, Asees Kaur' },
  { song: 'Tere Hawaale', artist: 'Arijit Singh, Parampara Tandon' },
  { song: 'Pehle Bhi Main', artist: 'Vishal Mishra, Raj Shekhar' },
  { song: 'Ilahi', artist: 'Arijit Singh' },
  { song: 'Shayad', artist: 'Arijit Singh' },
  { song: 'Dil Diyan Gallan', artist: 'Atif Aslam' },
  { song: 'Ghungroo', artist: 'Arijit Singh, Shilpa Rao' },
  { song: 'Satranga', artist: 'Arijit Singh' },
  { song: 'Tum Hi Ho', artist: 'Arijit Singh' },
  { song: 'Agar Tum Saath Ho', artist: 'Alka Yagnik, Arijit Singh' },
];

const dates = ['Today', 'Today', 'Today', 'Yesterday', 'Yesterday', '2 days ago', '3 days ago', '4 days ago'];

export const recentPerformancesData = Array.from({ length: 100 }, (_, index) => {
  const singer = singerNames[index % singerNames.length];
  const songData = songsCatalog[index % songsCatalog.length];
  const score = 80 + ((index * 7 + 3) % 19); // Generates scores between 80 and 98
  const date = dates[Math.floor(index / 12) % dates.length];

  return {
    id: `perf-${index + 1}`,
    user: singer.name,
    avatarInitials: singer.initials,
    avatarColor: singer.color,
    song: songData.song,
    artist: songData.artist,
    score,
    xp: `+${score} XP`,
    date,
    status: 'Completed',
  };
});

// Dynamic dashboard metrics calculating directly from 100 mock users & 100 performances
export const getDashboardMetrics = () => {
  const totalUsers = mockUsersList.length;
  const activeUsers = mockUsersList.filter((u) => u.status === 'Active').length;
  const totalPerformances = recentPerformancesData.length;
  const totalSongsSung = mockUsersList.reduce((acc, u) => acc + (u.songsSung || 0), 0);

  return [
    {
      id: 'total-users',
      label: 'TOTAL USERS',
      value: totalUsers.toLocaleString(),
      icon: 'users',
    },
    {
      id: 'active-users',
      label: 'ACTIVE USERS',
      value: activeUsers.toLocaleString(),
      icon: 'activity',
    },
    {
      id: 'performances',
      label: 'PERFORMANCES',
      value: totalPerformances.toLocaleString(),
      icon: 'mic',
    },
    {
      id: 'songs-sung',
      label: 'SONGS SUNG',
      value: totalSongsSung.toLocaleString(),
      icon: 'music',
    },
  ];
};

export const dashboardMetrics = getDashboardMetrics();

// Dynamic telemetry computed from the 100 performances
const totalScoreSum = recentPerformancesData.reduce((acc, p) => acc + p.score, 0);
const avgScore = Math.round(totalScoreSum / recentPerformancesData.length);
const totalXPInK = (totalScoreSum / 1000).toFixed(1);

export const performanceSummaryData = [
  {
    id: 'avg-score',
    title: 'Average Score',
    value: `${avgScore}`,
    subvalue: '/ 100',
    icon: 'star',
    iconBg: 'bg-pink-50 text-[#ff2b75]',
  },
  {
    id: 'avg-session',
    title: 'Average Session',
    value: '12 min',
    subvalue: null,
    icon: 'clock',
    iconBg: 'bg-blue-50 text-blue-500',
  },
  {
    id: 'xp-earned',
    title: 'XP Earned',
    value: `${totalXPInK} K`,
    subvalue: null,
    icon: 'zap',
    iconBg: 'bg-pink-50 text-[#ff2b75]',
  },
  {
    id: 'active-challenges',
    title: 'Active Challenges',
    value: '8',
    subvalue: null,
    badge: 'Live now',
    icon: 'trophy',
    iconBg: 'bg-pink-50 text-[#ff2b75]',
  },
];

export const leaderboardSnapshot = [
  {
    rank: 1,
    initials: 'AS',
    name: 'Aanya Sharma',
    subtitle: 'Vocals • Level 42',
    xp: '3,920 XP',
    avatarBg: 'bg-pink-600 text-white',
    isTop: true,
  },
  {
    rank: 2,
    initials: 'RM',
    name: 'Rohan Mehta',
    subtitle: 'Vocals • Level 39',
    xp: '3,760 XP',
    avatarBg: 'bg-slate-700 text-white',
  },
  {
    rank: 3,
    initials: 'PK',
    name: 'Priya Kapoor',
    subtitle: 'Vocals • Level 38',
    xp: '3,580 XP',
    avatarBg: 'bg-pink-100 text-pink-600',
  },
  {
    rank: 4,
    initials: 'AV',
    name: 'Arjun Verma',
    subtitle: 'Vocals • Level 35',
    xp: '3,420 XP',
    avatarBg: 'bg-purple-100 text-purple-600',
  },
];

export const recentActivity = [
  {
    id: 1,
    title: 'New user joined from Mumbai',
    time: '2 minutes ago',
    icon: 'user-plus',
    iconBg: 'bg-pink-50 text-[#ff2b75]',
  },
  {
    id: 2,
    title: 'Priya Kapoor completed Chaleya',
    time: '8 minutes ago',
    icon: 'music',
    iconBg: 'bg-pink-50 text-[#ff2b75]',
  },
  {
    id: 3,
    title: 'Achievement unlocked: High Note Pro',
    time: '15 minutes ago',
    icon: 'award',
    iconBg: 'bg-pink-50 text-[#ff2b75]',
  },
];

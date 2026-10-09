const singerNames = [
  { name: 'Aarav Sharma', email: 'aarav.sharma@gmail.com', initials: 'AS', avatarBg: 'bg-pink-100 text-[#ff2b75]' },
  { name: 'Priya Verma', email: 'priya.verma@outlook.com', initials: 'PV', avatarBg: 'bg-purple-100 text-purple-600' },
  { name: 'Rohan Mehta', email: 'rohan.mehta@voxstage.io', initials: 'RM', avatarBg: 'bg-blue-100 text-blue-600' },
  { name: 'Ananya Singh', email: 'ananya.singh@gmail.com', initials: 'AS', avatarBg: 'bg-pink-100 text-[#ff2b75]' },
  { name: 'Kabir Malhotra', email: 'kabir.m@yahoo.com', initials: 'KM', avatarBg: 'bg-amber-100 text-amber-700' },
  { name: 'Ishita Kapoor', email: 'ishita.k@icloud.com', initials: 'IK', avatarBg: 'bg-indigo-100 text-indigo-700' },
  { name: 'Sahil Sharma', email: 'sahil.sharma@gmail.com', initials: 'SS', avatarBg: 'bg-rose-100 text-rose-600' },
  { name: 'Aanya Sharma', email: 'aanya.sing@gmail.com', initials: 'AS', avatarBg: 'bg-pink-100 text-[#ff2b75]' },
  { name: 'Meera Iyer', email: 'meera.iyer@gmail.com', initials: 'MI', avatarBg: 'bg-emerald-100 text-emerald-700' },
  { name: 'Devansh Roy', email: 'devansh.r@live.com', initials: 'DR', avatarBg: 'bg-slate-200 text-slate-700' },
  { name: 'Kavita Chawla', email: 'kavita.c@gmail.com', initials: 'KC', avatarBg: 'bg-cyan-100 text-cyan-700' },
  { name: 'Kabir Joshi', email: 'kabir.j@voxstage.io', initials: 'KJ', avatarBg: 'bg-fuchsia-100 text-fuchsia-600' },
  { name: 'Neha Gupta', email: 'neha.g@gmail.com', initials: 'NG', avatarBg: 'bg-purple-100 text-purple-600' },
  { name: 'Arjun Verma', email: 'arjun.v@soundwave.in', initials: 'AV', avatarBg: 'bg-indigo-100 text-indigo-700' },
  { name: 'Tanya Sen', email: 'tanya.sen@icloud.com', initials: 'TS', avatarBg: 'bg-amber-100 text-amber-700' },
];

// Generate exactly 100 mock ranked singers
export const mockLeaderboardList = Array.from({ length: 100 }, (_, i) => {
  const rank = i + 1;
  const singer = singerNames[i % singerNames.length];
  const uniqueName = i < 15 ? singer.name : `${singer.name} ${Math.floor(i / 15) + 1}`;
  const uniqueEmail = i < 15 ? singer.email : `${singer.email.split('@')[0]}${i}@${singer.email.split('@')[1]}`;

  // Tiers distribution: Rank 1-20 Gold, 21-50 Silver, 51-100 Bronze
  let tier = 'Bronze';
  if (rank <= 20) tier = 'Gold';
  else if (rank <= 50) tier = 'Silver';

  // Movement indicator
  let change = 'same';
  if (i % 3 === 0) change = 'up';
  else if (i % 3 === 1) change = 'down';

  // Points progressively decreasing from 12,450 down to ~1,200
  const points = Math.max(1200, Math.floor(12450 - i * 114 - (i % 5) * 12));
  const performances = Math.max(12, Math.floor(148 - i * 1.3));
  const avgScore = Math.max(68, Math.floor(96 - (i * 0.28)));

  return {
    rank,
    change,
    name: uniqueName,
    email: uniqueEmail,
    initials: singer.initials,
    avatarBg: singer.avatarBg,
    tier,
    performances,
    avgScore,
    points,
  };
});

// Dynamic Leaderboard Metrics calculated from the 100 mock records
export const getLeaderboardMetrics = (list = mockLeaderboardList) => {
  const rankedUsers = list.length;
  const totalPoints = list.reduce((acc, u) => acc + u.points, 0);

  return [
    {
      id: 'ranked-users',
      label: 'RANKED USERS',
      value: rankedUsers.toLocaleString(),
      icon: 'bar-chart',
      iconBox: true,
      badgeColor: 'bg-pink-50 text-[#ff2b75]',
    },
    {
      id: 'total-points',
      label: 'TOTAL POINTS AWARDED',
      value: totalPoints.toLocaleString(),
      icon: 'star',
      iconBox: true,
      badgeColor: 'bg-pink-50 text-[#ff2b75]',
    },
  ];
};

export const leaderboardMetrics = getLeaderboardMetrics();

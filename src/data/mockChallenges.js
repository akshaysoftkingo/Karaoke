const challengeTemplates = [
  { name: 'Hindi Hits Challenge', type: 'Song Completion' },
  { name: '7-Day Singing Streak', type: 'Consistency' },
  { name: 'Bollywood Classics', type: 'Song Completion' },
  { name: 'High Score Challenge', type: 'Score Target' },
  { name: 'Weekend Karaoke', type: 'Song Completion' },
  { name: 'Monsoon Melodies', type: 'Song Completion' },
  { name: 'Romantic Duets Week', type: 'Song Completion' },
  { name: 'Golden Oldies Revival', type: 'Song Completion' },
  { name: 'Pitch Perfect Sprint', type: 'Score Target' },
  { name: 'Daily Vocal Habit', type: 'Consistency' },
];

const datePairs = [
  { start: 'Oct 01, 2026', end: 'Oct 15, 2026' },
  { start: 'Oct 05, 2026', end: 'Oct 12, 2026' },
  { start: 'Sep 15, 2026', end: 'Sep 30, 2026' },
  { start: 'Oct 07, 2026', end: 'Oct 20, 2026' },
  { start: 'Oct 10, 2026', end: 'Oct 12, 2026' },
  { start: 'Aug 01, 2026', end: 'Aug 15, 2026' },
  { start: 'Oct 03, 2026', end: 'Oct 17, 2026' },
  { start: 'Sep 20, 2026', end: 'Oct 04, 2026' },
  { start: 'Oct 08, 2026', end: 'Oct 22, 2026' },
  { start: 'Oct 12, 2026', end: 'Oct 14, 2026' },
];

// Generate exactly 100 mock challenges matching screenshot
export const mockChallengesList = Array.from({ length: 100 }, (_, i) => {
  const template = challengeTemplates[i % challengeTemplates.length];
  const dates = datePairs[i % datePairs.length];

  const name =
    i < 10
      ? template.name
      : `${template.name} ${Math.floor(i / 10) + 1}`;

  // Status breakdown: mostly Active & Completed, a few Scheduled
  let status = 'Active';
  if (i % 5 === 2 || i % 5 === 3) status = 'Completed';
  if (i % 7 === 4) status = 'Scheduled';

  const participants = Math.max(40, Math.floor(320 - i * 2.6 - (i % 6) * 9));
  const target =
    template.type === 'Consistency'
      ? 7
      : template.type === 'Score Target'
        ? 90 + ((i * 3) % 10)
        : 3 + (i % 8);

  return {
    id: `challenge-${i + 1}`,
    name,
    type: template.type,
    participants,
    startDate: dates.start,
    endDate: dates.end,
    status,
    target,
  };
});

// Dynamic challenge metrics calculated from the 100 mock records
export const getChallengeMetrics = (list = mockChallengesList) => {
  const total = list.length;
  const active = list.filter((c) => c.status === 'Active').length;
  const totalParticipants = list.reduce((acc, c) => acc + c.participants, 0);

  return [
    {
      id: 'total-challenges',
      label: 'TOTAL CHALLENGES',
      value: total.toLocaleString(),
      icon: 'trophy',
      iconBox: true,
      badgeColor: 'bg-pink-50 text-[#ff2b75]',
    },
    {
      id: 'active-challenges',
      label: 'ACTIVE CHALLENGES',
      value: active.toLocaleString(),
      icon: 'target',
      iconBox: true,
      badgeColor: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'total-participants',
      label: 'TOTAL PARTICIPANTS',
      value: totalParticipants.toLocaleString(),
      icon: 'users',
      iconBox: true,
      badgeColor: 'bg-pink-50 text-[#ff2b75]',
    },
  ];
};

export const challengeMetrics = getChallengeMetrics();

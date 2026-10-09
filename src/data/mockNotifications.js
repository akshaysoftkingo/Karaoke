const notificationTemplates = [
  { title: 'New Hindi Hits Available', description: 'Discover the latest songs added to the catalogue.', type: 'Content Update' },
  { title: 'Weekend Karaoke Challenge', description: "Join this weekend's singing challenge.", type: 'Challenge' },
  { title: 'Platform Maintenance', description: 'Scheduled maintenance announcement.', type: 'System' },
  { title: 'October Song Picks', description: "Explore this month's featured songs.", type: 'Content Update' },
  { title: 'Welcome to VOX', description: 'A welcome message for new users.', type: 'Welcome' },
  { title: 'New Achievement Unlocked', description: 'Celebrate user milestones and rewards.', type: 'Achievement' },
  { title: 'Festive Rewards Week', description: 'Exclusive in-app rewards for singers.', type: 'Promotion' },
  { title: 'Leaderboard Reset', description: 'Monthly leaderboard rankings refreshed.', type: 'System' },
  { title: 'Fresh Curated Playlists', description: 'Handpicked playlists for your sessions.', type: 'Content Update' },
  { title: 'Duet With Friends', description: 'Invite friends and sing together.', type: 'Challenge' },
];

const datePool = [
  'Oct 09, 2026',
  'Oct 09, 2026',
  'Oct 10, 2026',
  'Oct 11, 2026',
  'Oct 08, 2026',
  'Oct 12, 2026',
  'Oct 13, 2026',
  'Oct 14, 2026',
  'Oct 05, 2026',
  'Oct 06, 2026',
];

const audiencePool = [
  'All Users',
  'All Users',
  'All Users',
  'Active Users',
  'New Users',
];

// Generate exactly 100 mock notifications matching screenshot
export const mockNotificationsList = Array.from({ length: 100 }, (_, i) => {
  const template = notificationTemplates[i % notificationTemplates.length];

  let status = 'Sent';
  if (i % 6 === 2) status = 'Scheduled';
  if (i % 13 === 4) status = 'Draft';
  if (i === 3) status = 'Scheduled';
  if (i === 4) status = 'Draft';

  return {
    id: `notification-${i + 1}`,
    title:
      i < 10 ? template.title : `${template.title} ${Math.floor(i / 10) + 1}`,
    description: template.description,
    type: template.type,
    audience: audiencePool[i % audiencePool.length],
    date: datePool[i % datePool.length],
    status,
  };
});

// Dynamic notification metrics calculated from the 100 mock records
export const getNotificationMetrics = (list = mockNotificationsList) => {
  const sent = list.filter((n) => n.status === 'Sent').length;
  const scheduled = list.filter((n) => n.status === 'Scheduled').length;
  const drafts = list.filter((n) => n.status === 'Draft').length;

  return [
    {
      id: 'total-sent',
      label: 'TOTAL SENT',
      value: sent.toLocaleString(),
      icon: 'send',
      iconBox: true,
      badgeColor: 'bg-pink-50 text-[#ff2b75]',
    },
    {
      id: 'scheduled',
      label: 'SCHEDULED',
      value: scheduled.toLocaleString(),
      icon: 'clock',
      iconBox: true,
      badgeColor: 'bg-sky-50 text-sky-600',
      helper: 'Next send tomorrow 10:00 AM',
    },
    {
      id: 'drafts',
      label: 'DRAFTS',
      value: drafts.toLocaleString(),
      icon: 'file-text',
      iconBox: true,
      badgeColor: 'bg-slate-100 text-slate-500',
      helper: 'Last edited 2 hours ago',
    },
  ];
};

export const notificationMetrics = getNotificationMetrics();

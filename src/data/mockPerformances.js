const sampleSongs = [
  {
    title: 'Kesariya',
    codePrefix: '#PF-904',
    coverImg: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&auto=format&fit=crop&q=80',
    coverGradient: 'from-amber-600 via-rose-700 to-indigo-900',
    dur: '03:42',
  },
  {
    title: 'Apna Bana Le',
    codePrefix: '#PF-882',
    coverImg: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&auto=format&fit=crop&q=80',
    coverGradient: 'from-blue-900 via-indigo-800 to-purple-900',
    dur: '03:18',
  },
  {
    title: 'Chaleya',
    codePrefix: '#PF-871',
    coverImg: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&auto=format&fit=crop&q=80',
    coverGradient: 'from-purple-900 via-pink-700 to-amber-600',
    dur: '03:05',
  },
  {
    title: 'Tum Kya Mile',
    codePrefix: '#PF-864',
    coverImg: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&auto=format&fit=crop&q=80',
    coverGradient: 'from-sky-700 via-teal-800 to-slate-900',
    dur: '04:12',
  },
  {
    title: 'O Maahi',
    codePrefix: '#PF-852',
    coverImg: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=100&auto=format&fit=crop&q=80',
    coverGradient: 'from-amber-700 via-orange-800 to-red-950',
    dur: '03:36',
  },
  {
    title: 'Heeriye',
    codePrefix: '#PF-840',
    coverImg: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=100&auto=format&fit=crop&q=80',
    coverGradient: 'from-slate-800 via-indigo-950 to-stone-900',
    dur: '02:58',
  },
  {
    title: 'Raataan Lambiyan',
    codePrefix: '#PF-831',
    coverImg: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=100&auto=format&fit=crop&q=80',
    coverGradient: 'from-pink-900 via-purple-800 to-slate-900',
    dur: '03:50',
  },
  {
    title: 'Tere Hawaale',
    codePrefix: '#PF-820',
    coverImg: 'https://images.unsplash.com/photo-1520523839898-507126c0d663?w=100&auto=format&fit=crop&q=80',
    coverGradient: 'from-teal-900 via-cyan-800 to-slate-900',
    dur: '05:46',
  },
  {
    title: 'Pehle Bhi Main',
    codePrefix: '#PF-811',
    coverImg: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=100&auto=format&fit=crop&q=80',
    coverGradient: 'from-red-950 via-rose-900 to-stone-900',
    dur: '04:10',
  },
  {
    title: 'Satranga',
    codePrefix: '#PF-802',
    coverImg: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&auto=format&fit=crop&q=80',
    coverGradient: 'from-fuchsia-900 via-purple-700 to-pink-600',
    dur: '04:31',
  },
];

const singers = [
  { name: 'Aarav Sharma', email: 'aarav.sharma@gmail.com' },
  { name: 'Priya Verma', email: 'priya.verma@outlook.com' },
  { name: 'Rohan Mehta', email: 'rohan.mehta@voxstage.io' },
  { name: 'Ananya Singh', email: 'ananya.singh@gmail.com' },
  { name: 'Kabir Malhotra', email: 'kabir.m@yahoo.com' },
  { name: 'Ishita Kapoor', email: 'ishita.k@icloud.com' },
  { name: 'Sahil Sharma', email: 'sahil.sharma@gmail.com' },
  { name: 'Aanya Sharma', email: 'aanya.sing@gmail.com' },
  { name: 'Meera Iyer', email: 'meera.iyer@gmail.com' },
  { name: 'Devansh Roy', email: 'devansh.r@live.com' },
];

const dates = [
  'Oct 09, 2026',
  'Oct 09, 2026',
  'Oct 08, 2026',
  'Oct 08, 2026',
  'Oct 07, 2026',
  'Oct 07, 2026',
  'Oct 06, 2026',
  'Oct 05, 2026',
  'Oct 04, 2026',
  'Oct 03, 2026',
];

// Generate exactly 100 mock performances matching screenshot
export const mockPerformancesList = Array.from({ length: 100 }, (_, i) => {
  // First 6 match screenshot exactly
  if (i === 0) {
    return {
      id: 'perf-1',
      perfCode: '#PF-90412',
      song: 'Kesariya',
      user: 'Aarav Sharma',
      email: 'aarav.sharma@gmail.com',
      duration: '03:42',
      date: 'Oct 09, 2026',
      score: 92,
      status: 'Completed',
      coverImg: sampleSongs[0].coverImg,
      coverGradient: sampleSongs[0].coverGradient,
    };
  }
  if (i === 1) {
    return {
      id: 'perf-2',
      perfCode: '#PF-88231',
      song: 'Apna Bana Le',
      user: 'Priya Verma',
      email: 'priya.verma@outlook.com',
      duration: '03:18',
      date: 'Oct 09, 2026',
      score: 87,
      status: 'Completed',
      coverImg: sampleSongs[1].coverImg,
      coverGradient: sampleSongs[1].coverGradient,
    };
  }
  if (i === 2) {
    return {
      id: 'perf-3',
      perfCode: '#PF-87104',
      song: 'Chaleya',
      user: 'Rohan Mehta',
      email: 'rohan.mehta@voxstage.io',
      duration: '03:05',
      date: 'Oct 08, 2026',
      score: 76,
      status: 'Completed',
      coverImg: sampleSongs[2].coverImg,
      coverGradient: sampleSongs[2].coverGradient,
    };
  }
  if (i === 3) {
    return {
      id: 'perf-4',
      perfCode: '#PF-86450',
      song: 'Tum Kya Mile',
      user: 'Ananya Singh',
      email: 'ananya.singh@gmail.com',
      duration: '04:12',
      date: 'Oct 08, 2026',
      score: 89,
      status: 'Under Review',
      coverImg: sampleSongs[3].coverImg,
      coverGradient: sampleSongs[3].coverGradient,
    };
  }
  if (i === 4) {
    return {
      id: 'perf-5',
      perfCode: '#PF-85219',
      song: 'O Maahi',
      user: 'Kabir Malhotra',
      email: 'kabir.m@yahoo.com',
      duration: '03:36',
      date: 'Oct 07, 2026',
      score: 94,
      status: 'Completed',
      coverImg: sampleSongs[4].coverImg,
      coverGradient: sampleSongs[4].coverGradient,
    };
  }
  if (i === 5) {
    return {
      id: 'perf-6',
      perfCode: '#PF-84092',
      song: 'Heeriye',
      user: 'Ishita Kapoor',
      email: 'ishita.k@icloud.com',
      duration: '02:58',
      date: 'Oct 07, 2026',
      score: 61,
      status: 'Reported',
      coverImg: sampleSongs[5].coverImg,
      coverGradient: sampleSongs[5].coverGradient,
    };
  }

  const songObj = sampleSongs[i % sampleSongs.length];
  const singer = singers[i % singers.length];
  const date = dates[i % dates.length];
  const perfCode = `${songObj.codePrefix}${10 + (i % 89)}`;

  // Status breakdown: mostly Completed, a few Under Review and Reported
  let status = 'Completed';
  if (i % 12 === 3 || i % 12 === 9) status = 'Under Review';
  if (i % 14 === 5) status = 'Reported';

  const score = 65 + ((i * 7 + 11) % 34); // 65 to 98

  return {
    id: `perf-${i + 1}`,
    perfCode,
    song: songObj.title,
    user: singer.name,
    email: singer.email,
    duration: songObj.dur,
    date,
    score,
    status,
    coverImg: songObj.coverImg,
    coverGradient: songObj.coverGradient,
  };
});

// Dynamic performance metrics calculated from the 100 mock records
export const getPerformanceMetrics = (list = mockPerformancesList) => {
  const total = list.length;
  const completed = list.filter((p) => p.status === 'Completed').length;
  const underReview = list.filter((p) => p.status === 'Under Review').length;
  const reported = list.filter((p) => p.status === 'Reported').length;

  return [
    {
      id: 'total-perf',
      label: 'TOTAL PERFORMANCES',
      value: total.toLocaleString(),
      icon: 'mic',
      iconBox: true,
      badgeColor: 'bg-pink-50 text-[#ff2b75]',
    },
    {
      id: 'completed-perf',
      label: 'COMPLETED',
      value: completed.toLocaleString(),
      icon: 'check-circle',
      iconBox: true,
      badgeColor: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'review-perf',
      label: 'UNDER REVIEW',
      value: underReview.toLocaleString(),
      icon: 'clock',
      iconBox: true,
      badgeColor: 'bg-amber-50 text-amber-600',
    },
    {
      id: 'reported-perf',
      label: 'REPORTED',
      value: reported.toLocaleString(),
      icon: 'alert-triangle',
      iconBox: true,
      badgeColor: 'bg-rose-50 text-rose-600',
    },
  ];
};

export const performanceMetrics = getPerformanceMetrics();

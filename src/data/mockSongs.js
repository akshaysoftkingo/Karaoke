const songTitlesAndArtists = [
  { title: 'Kesariya', artist: 'Arijit Singh', lang: 'Hindi', dur: '4:28' },
  { title: 'Apna Bana Le', artist: 'Arijit Singh', lang: 'Hindi', dur: '3:42' },
  { title: 'Chaleya', artist: 'Arijit Singh, Shilpa Rao', lang: 'Hindi', dur: '3:20' },
  { title: 'Tum Kya Mile', artist: 'Arijit Singh, Shreya Ghoshal', lang: 'Hindi', dur: '4:37' },
  { title: 'O Maahi', artist: 'Arijit Singh', lang: 'Hindi', dur: '3:53' },
  { title: 'Heeriye', artist: 'Jasleen Royal, Arijit Singh', lang: 'Hindi', dur: '3:15' },
  { title: 'Raataan Lambiyan', artist: 'Jubin Nautiyal, Asees Kaur', lang: 'Hindi', dur: '3:50' },
  { title: 'Tere Hawaale', artist: 'Arijit Singh, Parampara Tandon', lang: 'Hindi', dur: '5:46' },
  { title: 'Pehle Bhi Main', artist: 'Vishal Mishra, Raj Shekhar', lang: 'Hindi', dur: '4:10' },
  { title: 'Levitating', artist: 'Dua Lipa', lang: 'English', dur: '3:23' },
  { title: 'Blinding Lights', artist: 'The Weeknd', lang: 'English', dur: '3:20' },
  { title: 'Satranga', artist: 'Arijit Singh', lang: 'Hindi', dur: '4:31' },
  { title: 'Lover', artist: 'Taylor Swift', lang: 'English', dur: '3:41' },
  { title: 'Ghungroo', artist: 'Arijit Singh, Shilpa Rao', lang: 'Hindi', dur: '5:02' },
  { title: 'Dil Diyan Gallan', artist: 'Atif Aslam', lang: 'Hindi', dur: '4:20' },
  { title: 'Shape of You', artist: 'Ed Sheeran', lang: 'English', dur: '3:53' },
  { title: 'Kahani Suno 2.0', artist: 'Kaifi Khalil', lang: 'Hindi', dur: '2:53' },
  { title: 'Maan Meri Jaan', artist: 'King', lang: 'Hindi', dur: '3:14' },
  { title: 'Perfect', artist: 'Ed Sheeran', lang: 'English', dur: '4:23' },
  { title: 'Pasoori', artist: 'Ali Sethi, Shae Gill', lang: 'Punjabi', dur: '3:44' },
  { title: 'Amplifier', artist: 'Imran Khan', lang: 'Punjabi', dur: '3:50' },
  { title: 'Flowers', artist: 'Miley Cyrus', lang: 'English', dur: '3:20' },
  { title: 'Tum Hi Ho', artist: 'Arijit Singh', lang: 'Hindi', dur: '4:22' },
  { title: 'Ilahi', artist: 'Arijit Singh', lang: 'Hindi', dur: '3:49' },
  { title: 'As It Was', artist: 'Harry Styles', lang: 'English', dur: '2:47' },
  { title: 'Why This Kolaveri Di', artist: 'Dhanush, Anirudh', lang: 'Tamil', dur: '3:21' },
  { title: 'Rowdy Baby', artist: 'Dhanush, Dhee', lang: 'Tamil', dur: '4:32' },
  { title: 'Arabic Kuthu', artist: 'Anirudh, Jonita Gandhi', lang: 'Tamil', dur: '3:51' },
  { title: 'Vikram Title Track', artist: 'Anirudh Ravichander', lang: 'Tamil', dur: '3:18' },
  { title: 'Ami Je Tomar', artist: 'Arijit Singh', lang: 'Bengali', dur: '5:12' },
  { title: 'Mon Majhi Re', artist: 'Arijit Singh', lang: 'Bengali', dur: '4:05' },
  { title: 'Tomake Chai', artist: 'Arijit Singh', lang: 'Bengali', dur: '3:58' },
  { title: 'Jadi Tare Nai Chini Go', artist: 'Kishore Kumar', lang: 'Bengali', dur: '3:27' },
  { title: 'Sairat Zaala Ji', artist: 'Ajay Gogavale, Chinmayi', lang: 'Marathi', dur: '4:06' },
  { title: 'Hrudayat Vaje Something', artist: 'Ajay-Atul', lang: 'Marathi', dur: '3:44' },
  { title: 'Mauli Mauli', artist: 'Ajay Gogavale, Ajay-Atul', lang: 'Marathi', dur: '4:39' },
  { title: 'Aga Bai Aga Bai', artist: 'Shruti Pathak, Shalmali Kholgade', lang: 'Marathi', dur: '3:19' },
];

const coverGradients = [
  'from-amber-600 via-rose-700 to-indigo-900',
  'from-blue-900 via-indigo-800 to-purple-900',
  'from-purple-900 via-pink-700 to-amber-600',
  'from-sky-700 via-teal-800 to-slate-900',
  'from-amber-700 via-orange-800 to-red-950',
  'from-slate-800 via-indigo-950 to-stone-900',
  'from-pink-900 via-purple-800 to-slate-900',
  'from-teal-900 via-cyan-800 to-slate-900',
  'from-red-950 via-rose-900 to-stone-900',
  'from-fuchsia-900 via-purple-700 to-pink-600',
];

const sampleCoverImages = [
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1520523839898-507126c0d663?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511379938547-c1f69d1988ed?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=100&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=100&auto=format&fit=crop&q=80',
];

// Specific image URLs for certain songs
const specificSongImages = {
  'Tere Hawaale': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=100&auto=format&fit=crop&q=80',
  'Satranga': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&auto=format&fit=crop&q=80',
  'Rowdy Baby': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=100&auto=format&fit=crop&q=80',
  'Mon Majhi Re': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&auto=format&fit=crop&q=80',
  'Pehle Bhi Main': 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=100&auto=format&fit=crop&q=80',
  'Lover': 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=100&auto=format&fit=crop&q=80',
  'Arabic Kuthu': 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=100&auto=format&fit=crop&q=80',
  'Tomake Chai': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&auto=format&fit=crop&q=80',
  'Levitating': 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=100&auto=format&fit=crop&q=80',
  'Ghungroo': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=100&auto=format&fit=crop&q=80',
};

// Generate 100 mock songs
export const mockSongsList = Array.from({ length: 100 }, (_, i) => {
  const item = songTitlesAndArtists[i % songTitlesAndArtists.length];
  const provider = i % 3 === 2 ? 'Apple Music' : 'Spotify';
  const prefix = provider === 'Spotify' ? '#SP' : '#AM';
  const trackCode = `${prefix}-${90214 - i * 37}`;
  const status = i % 6 === 5 ? 'Unavailable' : 'Ready';

  // Use specific image if available, otherwise use random from array
  const coverImg = specificSongImages[item.title] || sampleCoverImages[i % sampleCoverImages.length];

  return {
    id: `s-${i + 1}`,
    title: item.title,
    trackCode,
    artist: item.artist,
    provider,
    duration: item.dur,
    language: item.lang,
    status,
    coverGradient: coverGradients[i % coverGradients.length],
    coverImg,
  };
});

// Dynamic metrics calculating directly from 100 mock songs
export const getSongMetrics = (songs = mockSongsList) => {
  const total = songs.length;
  const ready = songs.filter((s) => s.status === 'Ready').length;
  const unavailable = songs.filter((s) => s.status === 'Unavailable').length;

  return [
    {
      id: 'total-songs',
      label: 'TOTAL SONGS',
      value: total.toLocaleString(),
      icon: 'music',
    },
    {
      id: 'ready-songs',
      label: 'READY SONGS',
      value: ready.toLocaleString(),
      icon: 'mic',
    },
    {
      id: 'unavailable-songs',
      label: 'UNAVAILABLE SONGS',
      value: unavailable.toLocaleString(),
      icon: 'slash',
    },
  ];
};

export const songMetrics = getSongMetrics();

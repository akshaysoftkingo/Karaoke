const firstNames = [
  'Sahil', 'Priya', 'Rohan', 'Aanya', 'Vikram', 'Tanya', 'Arjun', 'Meera', 'Devansh', 'Kavita',
  'Kabir', 'Neha', 'Aditya', 'Simran', 'Ishaan', 'Ananya', 'Varun', 'Rhea', 'Karan', 'Pooja',
  'Aarav', 'Diya', 'Reyansh', 'Tara', 'Vihaan', 'Myra', 'Vivaan', 'Ira', 'Shaurya', 'Siya'
];

const lastNames = [
  'Sharma', 'Kapoor', 'Mehta', 'Verma', 'Malhotra', 'Sen', 'Iyer', 'Roy', 'Chawla', 'Joshi',
  'Gupta', 'Bose', 'Singhania', 'Nair', 'Chopra', 'Reddy', 'Patel', 'Khanna', 'Deshmukh', 'Saxena'
];

const emailDomains = ['gmail.com', 'outlook.com', 'voxstage.io', 'yahoo.com', 'icloud.com', 'soundwave.in'];
const statuses = ['Active', 'Active', 'Active', 'Active', 'Inactive', 'Active'];
const tiers = ['Gold', 'Silver', 'Bronze', 'Gold', 'Silver', 'Bronze'];

const avatarColorPalette = [
  'bg-pink-100 text-[#ff2b75]',
  'bg-purple-100 text-purple-600',
  'bg-blue-100 text-blue-600',
  'bg-indigo-100 text-indigo-700',
  'bg-rose-100 text-rose-600',
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
  'bg-cyan-100 text-cyan-700',
  'bg-fuchsia-100 text-fuchsia-600',
  'bg-slate-200 text-slate-700',
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Generate 100 realistic mock users
export const mockUsersList = Array.from({ length: 100 }, (_, i) => {
  // First 6 match original screenshot entries
  if (i === 0) {
    return {
      id: 'usr-1',
      name: 'Sahil Sharma',
      email: 'sahil.sharma@gmail.com',
      initials: 'SS',
      avatarBg: 'bg-pink-100 text-[#ff2b75]',
      userId: '#VX-84920',
      songsSung: 142,
      joinedDate: 'Jan 12, 2024',
      status: 'Active',
      tier: 'Gold',
    };
  }
  if (i === 1) {
    return {
      id: 'usr-2',
      name: 'Priya Kapoor',
      email: 'priya.k@outlook.com',
      initials: 'PK',
      avatarBg: 'bg-purple-100 text-purple-600',
      userId: '#VX-84919',
      songsSung: 98,
      joinedDate: 'Feb 04, 2024',
      status: 'Active',
      tier: 'Gold',
    };
  }
  if (i === 2) {
    return {
      id: 'usr-3',
      name: 'Rohan Mehta',
      email: 'rohan.mehta@voxstage.io',
      initials: 'RM',
      avatarBg: 'bg-blue-100 text-blue-600',
      userId: '#VX-84705',
      songsSung: 215,
      joinedDate: 'Nov 18, 2023',
      status: 'Active',
      tier: 'Silver',
    };
  }
  if (i === 3) {
    return {
      id: 'usr-4',
      name: 'Aanya Sharma',
      email: 'aanya.sing@gmail.com',
      initials: 'AS',
      avatarBg: 'bg-pink-100 text-[#ff2b75]',
      userId: '#VX-84210',
      songsSung: 310,
      joinedDate: 'Aug 22, 2023',
      status: 'Active',
      tier: 'Gold',
    };
  }
  if (i === 4) {
    return {
      id: 'usr-5',
      name: 'Vikram Malhotra',
      email: 'vikram.m@yahoo.com',
      initials: 'VM',
      avatarBg: 'bg-slate-200 text-slate-700',
      userId: '#VX-83112',
      songsSung: 14,
      joinedDate: 'May 09, 2024',
      status: 'Inactive',
      tier: 'Bronze',
    };
  }
  if (i === 5) {
    return {
      id: 'usr-6',
      name: 'Tanya Sen',
      email: 'tanya.sen@icloud.com',
      initials: 'TS',
      avatarBg: 'bg-amber-100 text-amber-700',
      userId: '#VX-82044',
      songsSung: 5,
      joinedDate: 'Oct 02, 2023',
      status: 'Inactive',
      tier: 'Silver',
    };
  }

  const fName = firstNames[(i * 3 + 2) % firstNames.length];
  const lName = lastNames[(i * 2 + 5) % lastNames.length];
  const fullName = `${fName} ${lName}`;
  const initials = `${fName[0]}${lName[0]}`;
  const domain = emailDomains[(i * 4) % emailDomains.length];
  const email = `${fName.toLowerCase()}.${lName.toLowerCase().slice(0, 3)}${i}@${domain}`;
  const userId = `#VX-${84000 - i * 17}`;
  const songsSung = Math.floor(5 + ((i * 137) % 360));
  const month = months[i % months.length];
  const day = ((i * 7) % 27) + 1;
  const year = 2023 + (i % 2);
  const joinedDate = `${month} ${day < 10 ? '0' : ''}${day}, ${year}`;
  const status = statuses[i % statuses.length];
  const tier = tiers[i % tiers.length];
  const avatarBg = avatarColorPalette[i % avatarColorPalette.length];

  return {
    id: `usr-${i + 1}`,
    name: fullName,
    email,
    initials,
    avatarBg,
    userId,
    songsSung,
    joinedDate,
    status,
    tier,
  };
});

// Dynamic metrics calculating directly from 100 mock users
export const getUserMetrics = (users = mockUsersList) => {
  const total = users.length;
  const active = users.filter((u) => u.status === 'Active').length;
  const inactive = users.filter((u) => u.status === 'Inactive').length;
  // Users registered in 2024
  const newThisMonth = users.filter((u) => u.joinedDate.includes('2024')).length;

  return [
    {
      id: 'total-users',
      label: 'TOTAL USERS',
      value: total.toLocaleString(),
      icon: 'users',
    },
    {
      id: 'active-users',
      label: 'ACTIVE USERS',
      value: active.toLocaleString(),
      icon: 'activity',
    },
    {
      id: 'inactive-users',
      label: 'INACTIVE USERS',
      value: inactive.toLocaleString(),
      icon: 'ban',
    },
    {
      id: 'new-this-month',
      label: 'NEW THIS MONTH',
      value: newThisMonth.toLocaleString(),
      icon: 'user-plus',
    },
  ];
};

export const userMetrics = getUserMetrics();

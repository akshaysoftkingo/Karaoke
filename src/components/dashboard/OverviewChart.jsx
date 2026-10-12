import React, { useState } from 'react';

export const OverviewChart = () => {
  const [activePeriod, setActivePeriod] = useState('30 Days');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const periods = ['7 Days', '30 Days', '3 Months', '1 Year'];

  // Data sets for different periods
  const datasets = {
    '7 Days': [
      { label: 'Mon', users: 420, performances: 610 },
      { label: 'Tue', users: 510, performances: 720 },
      { label: 'Wed', users: 490, performances: 680 },
      { label: 'Thu', users: 650, performances: 890 },
      { label: 'Fri', users: 800, performances: 1100 },
      { label: 'Sat', users: 950, performances: 1350 },
      { label: 'Sun', users: 890, performances: 1290 },
    ],
    '30 Days': [
      { label: 'Day 1', users: 180, performances: 300 },
      { label: 'Day 5', users: 220, performances: 340 },
      { label: 'Day 10', users: 240, performances: 390 },
      { label: 'Day 15', users: 280, performances: 460 },
      { label: 'Day 20', users: 380, performances: 620 },
      { label: 'Day 25', users: 510, performances: 820 },
      { label: 'Day 28', users: 580, performances: 910 },
      { label: 'Day 30', users: 490, performances: 860 },
    ],
    '3 Months': [
      { label: 'Month 1', users: 3400, performances: 5200 },
      { label: 'Month 2', users: 5100, performances: 7800 },
      { label: 'Month 3', users: 8420, performances: 12640 },
    ],
    '1 Year': [
      { label: 'Q1', users: 4100, performances: 6200 },
      { label: 'Q2', users: 7800, performances: 11400 },
      { label: 'Q3', users: 14200, performances: 21900 },
      { label: 'Q4', users: 24580, performances: 38640 },
    ],
  };

  const currentData = datasets[activePeriod] || datasets['30 Days'];

  // Dimensions
  const width = 640;
  const height = 180;
  const paddingX = 20;
  const paddingY = 25;

  const maxVal = Math.max(
    ...currentData.map((d) => Math.max(d.users, d.performances))
  ) * 1.15;

  const getCoordinates = (field) => {
    return currentData.map((d, index) => {
      const x = paddingX + (index / (currentData.length - 1)) * (width - 2 * paddingX);
      const y = height - paddingY - (d[field] / maxVal) * (height - 2 * paddingY);
      return { x, y, data: d };
    });
  };

  const usersPoints = getCoordinates('users');
  const performancesPoints = getCoordinates('performances');

  // Generate smooth SVG Bezier path
  const createSmoothPath = (points) => {
    if (points.length === 0) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = i > 0 ? points[i - 1] : points[i];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = i < points.length - 2 ? points[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 5;
      const cp1y = p1.y + (p2.y - p0.y) / 5;
      const cp2x = p2.x - (p3.x - p1.x) / 5;
      const cp2y = p2.y - (p3.y - p1.y) / 5;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  };

  const usersLinePath = createSmoothPath(usersPoints);
  const perfLinePath = createSmoothPath(performancesPoints);

  const usersAreaPath = `${usersLinePath} L ${width - paddingX} ${height} L ${paddingX} ${height} Z`;

  const activePoint =
    hoveredIndex !== null
      ? {
          x: Math.min(
            Math.max((usersPoints[hoveredIndex].x / width) * 100, 8),
            92
          ),
          y:
            Math.min(
              usersPoints[hoveredIndex].y,
              performancesPoints[hoveredIndex].y
            ) / height,
          data: currentData[hoveredIndex],
        }
      : null;

  return (
    <div className="bg-white border border-slate-200/70 rounded-2xl p-6 shadow-sm">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            User & Performance Overview
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Comparing platform growth and user vocal sessions over time
          </p>
        </div>

        {/* Time Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded-xl border border-slate-200/60 self-start sm:self-auto">
          {periods.map((period) => {
            const isActive = activePeriod === period;
            return (
              <button
                key={period}
                onClick={() => setActivePeriod(period)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-pink-50 text-[#ff2b75] border border-pink-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {period}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Chart Graphic */}
      <div className="relative mt-6 mb-2 w-full aspect-[640/180]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
        >
          <defs>
            <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff2b75" stopOpacity="0.28" />
              <stop offset="60%" stopColor="#ff2b75" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="slateGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#334155" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Background grid lines */}
          <line
            x1={paddingX}
            y1={paddingY}
            x2={width - paddingX}
            y2={paddingY}
            stroke="#f1f5f9"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height / 2}
            x2={width - paddingX}
            y2={height / 2}
            stroke="#f1f5f9"
            strokeDasharray="4 4"
          />
          <line
            x1={paddingX}
            y1={height - paddingY}
            x2={width - paddingX}
            y2={height - paddingY}
            stroke="#f1f5f9"
          />

          {/* Gradient Area Fills */}
          <path d={usersAreaPath} fill="url(#pinkGradient)" />

          {/* Smooth Stroke Lines */}
          <path
            d={perfLinePath}
            fill="none"
            stroke="#475569"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d={usersLinePath}
            fill="none"
            stroke="#ff2b75"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Hover nodes */}
          {usersPoints.map((pt, idx) => (
            <g
              key={idx}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <circle
                cx={pt.x}
                cy={pt.y}
                r={hoveredIndex === idx ? 6 : 3}
                fill="#ff2b75"
                className="transition-all duration-150"
              />
              <circle
                cx={performancesPoints[idx].x}
                cy={performancesPoints[idx].y}
                r={hoveredIndex === idx ? 6 : 3}
                fill="#475569"
                className="transition-all duration-150"
              />
            </g>
          ))}
        </svg>

        {/* Hover Tooltip Popup */}
        {activePoint && (
          <div
            className="absolute bg-slate-900 text-white text-[11px] py-1.5 px-3 rounded-lg shadow-xl pointer-events-none -translate-x-1/2 -translate-y-[calc(100%+8px)] flex items-center gap-3 z-10"
            style={{
              left: `${activePoint.x}%`,
              top: `${activePoint.y * 100}%`,
            }}
          >
            <div>
              <span className="text-slate-400 block text-[10px]">
                {activePoint.data.label}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-pink-400 font-semibold">
                  {activePoint.data.users} users
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-200 font-semibold">
                  {activePoint.data.performances} perfs
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chart Footer with Legends */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2b75]"></span>
            <span className="text-slate-700">New Users</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-[#475569]"></span>
            <span className="text-slate-700">Performances</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-400">Updated 5 mins ago</div>
      </div>
    </div>
  );
};

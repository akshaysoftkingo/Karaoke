import React, { useState } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PerformanceTrendsChart = ({ trends }) => {
  const navigate = useNavigate();
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!trends) return null;

  const { points, pathD, peakInfo, labels, highlightIndex = 4, avgText } = trends;
  const areaD = `${pathD} L 345 190 L 20 190 Z`;

  const peakPoint = points.find((p) => p.isPeak) || points[points.length - 2] || points[0];

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              Performance Trends
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Completed karaoke performances over time
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2b75]" />
            <span>Daily Sessions</span>
          </div>
        </div>

        {/* SVG Area Line Chart */}
        <div className="relative mt-4 w-full h-52">
          <svg
            viewBox="0 0 365 200"
            className="w-full h-full overflow-visible select-none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff2b75" stopOpacity="0.28" />
                <stop offset="60%" stopColor="#ff2b75" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ff2b75" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Subtle horizontal grid lines */}
            <line x1="10" y1="50" x2="355" y2="50" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="10" y1="100" x2="355" y2="100" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="10" y1="150" x2="355" y2="150" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="10" y1="190" x2="355" y2="190" stroke="#e2e8f0" strokeWidth="1" />

            {/* Gradient Area Fill */}
            <path
              d={areaD}
              fill="url(#performanceGradient)"
              className="transition-all duration-300 ease-in-out"
            />

            {/* Peak indicator dashed vertical guide line */}
            <line
              x1={peakPoint.x}
              y1={peakPoint.y}
              x2={peakPoint.x}
              y2="190"
              stroke="#ff2b75"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.8"
              className="transition-all duration-300"
            />

            {/* Smooth Line Path */}
            <path
              d={pathD}
              fill="none"
              stroke="#ff2b75"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300 ease-in-out"
            />

            {/* Data circles */}
            {points.map((pt, idx) => (
              <g key={idx}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="4"
                  fill="#ffffff"
                  stroke="#ff2b75"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-transform hover:scale-130"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            ))}
          </svg>

          {/* Peak Tooltip Callout */}
          {peakInfo && (
            <div
              className="absolute z-10 pointer-events-none transition-all duration-300"
              style={{
                left: peakInfo.leftPercent || '68%',
                top: peakInfo.topPercent || '8%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="bg-[#241a24] text-white px-3.5 py-1.5 rounded-xl shadow-xl text-center border border-white/10 relative">
                <div className="text-[10px] text-pink-200/80 font-medium tracking-tight">
                  {peakInfo.label}
                </div>
                <div className="text-xs font-bold text-white tracking-tight">
                  {peakInfo.value}
                </div>
                {/* Tooltip triangle tail */}
                <div className="w-2 h-2 bg-[#241a24] rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
              </div>
            </div>
          )}

          {/* Interactive Hover Tooltip if hovering another point */}
          {hoveredPoint && !hoveredPoint.isPeak && (
            <div
              className="absolute z-20 pointer-events-none bg-slate-900 text-white px-2.5 py-1 rounded-lg text-xs font-semibold shadow-lg transition-all"
              style={{
                left: `${(hoveredPoint.x / 365) * 100}%`,
                top: `${(hoveredPoint.y / 200) * 100}%`,
                transform: 'translate(-50%, -130%)',
              }}
            >
              {hoveredPoint.label}: {hoveredPoint.value}
            </div>
          )}

          {/* X Axis Ticks */}
          <div className="flex justify-between items-center px-2 pt-2 text-[11px] text-slate-400 font-medium">
            {labels.map((lbl, i) => (
              <span
                key={i}
                className={i === highlightIndex ? 'font-bold text-[#ff2b75]' : ''}
              >
                {lbl}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
          <TrendingUp className="w-4 h-4" />
          <span>{avgText}</span>
        </div>
        <button
          onClick={() => navigate('/performances')}
          className="text-[#ff2b75] hover:text-[#e61d65] font-semibold flex items-center gap-1 group cursor-pointer"
        >
          <span>View Performance Logs</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

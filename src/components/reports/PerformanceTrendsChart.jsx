import React, { useState } from 'react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PerformanceTrendsChart = ({ trends, periodLabel = 'Last 30 Days' }) => {
  const navigate = useNavigate();
  const [hoveredPoint, setHoveredPoint] = useState(null);

  if (!trends) return null;

  const { points, pathD, labels, highlightIndex = 4, avgText } = trends;
  const firstX = points[0]?.x ?? 20;
  const lastX = points[points.length - 1]?.x ?? 345;
  const areaD = `${pathD} L ${lastX} 190 L ${firstX} 190 Z`;

  const clampX = (x) => Math.min(Math.max((x / 365) * 100, 8), 92);

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
          <div className="bg-pink-50 border border-pink-200 rounded-full px-3 py-1 text-[11px] font-bold text-[#ff2b75]">
            {periodLabel}
          </div>
        </div>

        {/* SVG Area Line Chart */}
        <div className="relative mt-4 w-full aspect-[365/200]">
          <svg
            viewBox="0 0 365 200"
            className="w-full h-full overflow-visible select-none"
          >
            <defs>
              <linearGradient id="performanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff2b75" stopOpacity="0.28" />
                <stop offset="60%" stopColor="#ff2b75" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ff2b75" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Subtle horizontal grid lines */}
            <line x1="10" y1="50" x2="355" y2="50" stroke="#f1f5f9" strokeWidth="0.2" />
            <line x1="10" y1="100" x2="355" y2="100" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="10" y1="150" x2="355" y2="150" stroke="#f1f5f9" strokeWidth="1" />
            <line x1="10" y1="190" x2="355" y2="190" stroke="#e2e8f0" strokeWidth="1" />

            {/* Gradient Area Fill */}
            <path
              d={areaD}
              fill="url(#performanceGradient)"
              className="transition-all duration-300 ease-in-out"
            />

            {/* Smooth Line Path */}
            <path
              d={pathD}
              fill="none"
              stroke="#ff2b75"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300 ease-in-out"
            />

            {/* Data circles */}
            {points.map((pt, idx) => (
              <circle
                key={idx}
                cx={pt.x}
                cy={pt.y}
                r={hoveredPoint === pt ? 4 : 2}
                fill="#ff2b75"
                className="cursor-pointer transition-all duration-150"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              />
            ))}
          </svg>

          {/* Interactive Hover Tooltip */}
          {hoveredPoint && (
            <div
              className="absolute z-20 pointer-events-none bg-slate-900 text-white text-[11px] py-1.5 px-3 rounded-lg shadow-xl -translate-x-1/2 -translate-y-[calc(100%+8px)] text-center"
              style={{
                left: `${clampX(hoveredPoint.x)}%`,
                top: `${(hoveredPoint.y / 200) * 100}%`,
              }}
            >
              <span className="text-slate-400 block text-[10px]">
                {hoveredPoint.label}
              </span>
              <span className="font-semibold block mt-0.5">
                {hoveredPoint.value} performances
              </span>
            </div>
          )}

          {/* X Axis Ticks */}
          <div className="relative px-2 pt-2 text-[11px] text-slate-400 font-medium">
            {points.map((pt, i) => (
              <span
                key={i}
                className={`absolute -translate-x-1/2 ${i === highlightIndex ? 'font-bold text-[#ff2b75]' : ''}`}
                style={{ left: `${clampX(pt.x)}%` }}
              >
                {labels[i]}
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

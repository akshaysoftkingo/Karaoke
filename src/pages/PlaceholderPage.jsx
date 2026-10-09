import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PlaceholderPage = ({ title, description, category }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-200/70 rounded-2xl p-10 shadow-sm text-center max-w-2xl mx-auto my-12 animate-in fade-in duration-200">
      <div className="w-14 h-14 rounded-2xl bg-pink-50 text-[#ff2b75] flex items-center justify-center mx-auto mb-4">
        <Sparkles className="w-7 h-7" />
      </div>

      <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
        {category || 'SECTION'}
      </span>

      <h2 className="text-2xl font-extrabold text-slate-900 mt-1 mb-2">
        {title}
      </h2>

      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
        {description ||
          `Manage and configure all ${title.toLowerCase()} data, analytics and real-time karaoke operational metrics here.`}
      </p>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
        <button
          onClick={() => navigate('/songs')}
          className="px-4 py-2 bg-[#ff2b75] hover:bg-[#e61d65] text-white text-xs font-semibold rounded-xl shadow-xs transition cursor-pointer"
        >
          Browse Songs
        </button>
      </div>
    </div>
  );
};

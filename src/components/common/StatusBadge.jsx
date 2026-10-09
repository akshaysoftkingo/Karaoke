import React from 'react';
import { Award } from 'lucide-react';

export const StatusBadge = ({ status, type = 'user' }) => {
  if (type === 'score') {
    return (
      <span className="inline-flex items-center justify-center min-w-[32px] px-2 py-0.5 rounded-full text-xs font-bold bg-pink-50 text-[#ff2b75] border border-pink-100">
        {status}
      </span>
    );
  }

  if (type === 'session-status') {
    const norm = (status || '').toLowerCase();
    if (norm === 'completed') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Completed
        </span>
      );
    }
    if (norm === 'under review') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          Under Review
        </span>
      );
    }
    if (norm === 'reported') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          Reported
        </span>
      );
    }
  }

  if (type === 'tier') {
    const norm = (status || '').toLowerCase();
    if (norm === 'gold') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/70">
          <Award className="w-3.5 h-3.5 text-amber-600" />
          Gold
        </span>
      );
    }
    if (norm === 'silver') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200/70">
          <Award className="w-3.5 h-3.5 text-slate-500" />
          Silver
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200/70">
        <Award className="w-3.5 h-3.5 text-orange-600" />
        Bronze
      </span>
    );
  }

  if (type === 'performance-status') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-pink-50/80 text-[#ff2b75] border border-pink-200/50">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff2b75]"></span>
        {status}
      </span>
    );
  }

  if (type === 'challenge-status') {
    const norm = (status || '').toLowerCase();
    if (norm === 'active') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Active
        </span>
      );
    }
    if (norm === 'scheduled') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
          Scheduled
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/70">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
        Completed
      </span>
    );
  }

  if (type === 'notification-type') {
    const norm = (status || '').toLowerCase();
    const styles = {
      'content update': 'bg-pink-50 text-[#ff2b75] border-pink-200/60',
      challenge: 'bg-rose-50 text-rose-600 border-rose-200/60',
      system: 'bg-sky-50 text-sky-700 border-sky-200/60',
      welcome: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
      promotion: 'bg-amber-50 text-amber-700 border-amber-200/60',
      achievement: 'bg-violet-50 text-violet-700 border-violet-200/60',
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${styles[norm] || 'bg-slate-100 text-slate-600 border-slate-200/70'}`}
      >
        {status}
      </span>
    );
  }

  if (type === 'notification-status') {
    const norm = (status || '').toLowerCase();
    if (norm === 'sent') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Sent
        </span>
      );
    }
    if (norm === 'scheduled') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
          Scheduled
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200/70">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
        Draft
      </span>
    );
  }

  if (type === 'song') {
    const isReady = status.toLowerCase() === 'ready';
    return (
      <span
        className={`text-xs font-medium ${
          isReady ? 'text-slate-800' : 'text-slate-600'
        }`}
      >
        {status}
      </span>
    );
  }

  // User status types: Active, Suspended, Inactive
  const normalized = (status || '').toLowerCase();

  if (normalized === 'active') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        Active
      </span>
    );
  }

  if (normalized === 'suspended') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-600 border border-rose-200/60">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
        Suspended
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
      {status || 'Inactive'}
    </span>
  );
};

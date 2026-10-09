import React from 'react';
import {
  Users,
  Activity,
  Ban,
  UserPlus,
  Music,
  Mic,
  Slash,
  CheckCircle2,
  Clock,
  AlertTriangle,
  BarChart3,
  Star,
  Trophy,
  Target,
  Send,
  FileText,
} from 'lucide-react';

export const MetricCard = ({
  label,
  value,
  icon,
  iconBox = false,
  badgeColor = 'bg-pink-50/80 text-[#ff2b75]',
  showPlaceholderBox = false,
  helper,
}) => {
  const renderIcon = () => {
    if (!icon) return null;

    let IconComp = null;
    switch (icon) {
      case 'users':
        IconComp = Users;
        break;
      case 'activity':
        IconComp = Activity;
        break;
      case 'ban':
        IconComp = Ban;
        break;
      case 'user-plus':
        IconComp = UserPlus;
        break;
      case 'music':
        IconComp = Music;
        break;
      case 'mic':
        IconComp = Mic;
        break;
      case 'slash':
        IconComp = Slash;
        break;
      case 'check-circle':
        IconComp = CheckCircle2;
        break;
      case 'clock':
        IconComp = Clock;
        break;
      case 'alert-triangle':
        IconComp = AlertTriangle;
        break;
      case 'bar-chart':
        IconComp = BarChart3;
        break;
      case 'star':
        IconComp = Star;
        break;
      case 'trophy':
        IconComp = Trophy;
        break;
      case 'target':
        IconComp = Target;
        break;
      case 'send':
        IconComp = Send;
        break;
      case 'file-text':
        IconComp = FileText;
        break;
      default:
        IconComp = typeof icon === 'function' ? icon : null;
    }

    if (!IconComp) return null;

    if (iconBox) {
      return (
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${badgeColor}`}
        >
          <IconComp className="w-5 h-5" strokeWidth={1.9} />
        </div>
      );
    }

    return (
      <div className="text-slate-600">
        <IconComp className="w-5 h-5 text-slate-700" strokeWidth={1.8} />
      </div>
    );
  };

  return (
    <div className="bg-white border border-slate-200/70 rounded-2xl p-5 flex items-center justify-between shadow-sm hover:border-slate-300 transition-all">
      <div className="space-y-1">
        <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase block">
          {label}
        </span>
        <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
          {value}
        </div>
        {helper && (
          <span className="text-[10px] text-slate-400 block pt-0.5">
            {helper}
          </span>
        )}
      </div>

      {renderIcon()}

      {showPlaceholderBox && !icon && (
        <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100" />
      )}
    </div>
  );
};

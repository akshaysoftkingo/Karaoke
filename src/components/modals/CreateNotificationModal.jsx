import React, { useState } from 'react';
import { X, Bell, Send, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CreateNotificationModal = () => {
  const { activeModal, setActiveModal } = useApp();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    title: '',
    message: '',
    type: 'Content Update',
    audience: 'All Users',
    delivery: 'send-now',
    date: '2026-10-12',
    time: '10:00',
  });

  if (activeModal !== 'create-notification') {
    return null;
  }

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setActiveModal(null);
        setForm({
          title: '',
          message: '',
          type: 'Content Update',
          audience: 'All Users',
          delivery: 'send-now',
          date: '2026-10-12',
          time: '10:00',
        });
      }, 1200);
    }, 1500);
  };

  const inputClass =
    'w-full text-xs text-slate-800 placeholder-slate-400 px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#ff2b75] focus:outline-none transition-all';
  const labelClass =
    'text-[11px] font-bold tracking-wider text-slate-500 uppercase block mb-1.5';

  const deliveryOptions = [
    { id: 'send-now', label: 'Send Now', Icon: Send },
    { id: 'schedule', label: 'Schedule', Icon: Clock },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#ff2b75]" />
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Create Notification
              </h3>
              <p className="text-[11px] text-slate-400">
                Compose and send an update to VOX users.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Notification Title */}
          <div>
            <label className={labelClass}>Notification Title</label>
            <input
              type="text"
              value={form.title}
              onChange={handleChange('title')}
              placeholder="Enter notification title"
              className={inputClass}
            />
          </div>

          {/* Message */}
          <div>
            <label className={labelClass}>Message</label>
            <textarea
              value={form.message}
              onChange={handleChange('message')}
              placeholder="Write your notification message..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Type & Audience */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Notification Type</label>
              <select
                value={form.type}
                onChange={handleChange('type')}
                className={`${inputClass} appearance-none font-semibold cursor-pointer`}
              >
                <option>Content Update</option>
                <option>Challenge</option>
                <option>System</option>
                <option>Welcome</option>
                <option>Promotion</option>
                <option>Achievement</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Audience</label>
              <select
                value={form.audience}
                onChange={handleChange('audience')}
                className={`${inputClass} appearance-none font-semibold cursor-pointer`}
              >
                <option>All Users</option>
                <option>Active Users</option>
                <option>New Users</option>
              </select>
            </div>
          </div>

          {/* Delivery */}
          <div>
            <label className={labelClass}>Delivery</label>
            <div className="grid grid-cols-2 gap-3">
              {deliveryOptions.map(({ id, label, Icon }) => {
                const selected = form.delivery === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, delivery: id }))}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition cursor-pointer ${
                      selected
                        ? 'border-[#ff2b75] bg-pink-50/70 text-[#ff2b75]'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Schedule Date & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Date</label>
              <input
                type="date"
                value={form.date}
                onChange={handleChange('date')}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Time</label>
              <input
                type="time"
                value={form.time}
                onChange={handleChange('time')}
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            onClick={() => setActiveModal(null)}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending || sent}
            className="px-4 py-2 bg-[#ff2b75] hover:bg-[#e61d65] text-white text-xs font-semibold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            {sent ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Sent!
              </>
            ) : sending ? (
              'Sending...'
            ) : (
              <>
                <Send className="w-3.5 h-3.5" /> Send Notification
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

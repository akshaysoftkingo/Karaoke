import React, { useState } from 'react';
import {
  Shield,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Camera,
  RotateCw,
  Bell,
  Radio,
  Clock,
  Smartphone,
  KeyRound,
  Check,
  Music,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage = () => {
  const { setActiveModal } = useApp();

  // Admin Profile state
  const [profileName, setProfileName] = useState('Abhishek Sharma');
  const [profileEmail, setProfileEmail] = useState('Admin123@gmail.com');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Security / Password state
  const [currentPassword, setCurrentPassword] = useState('supersecretpassword123');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Music Providers state
  const [providers, setProviders] = useState([
    {
      id: 'spotify',
      name: 'Spotify',
      status: 'Connected',
      detail: 'Connected to catalogue · 12,480 tracks synced',
      color: 'bg-[#1DB954]',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
      connected: true,
    },
    {
      id: 'apple',
      name: 'Apple Music',
      status: 'Connected',
      detail: 'Catalogue integration active · Auto-sync enabled',
      color: 'bg-[#FA243C]',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200/60',
      connected: true,
    },
    {
      id: 'gaana',
      name: 'Gaana',
      status: 'Disconnected',
      detail: 'Regional catalogue · Not connected',
      color: 'bg-[#E72C33]',
      badgeColor: 'text-slate-500 bg-slate-100 border-slate-200',
      connected: false,
    },
  ]);

  // Notification Preferences toggles
  const [notifPrefs, setNotifPrefs] = useState({
    securityAlerts: true,
    platformUpdates: true,
    scheduledReminders: true,
  });

  const toggleNotifPref = (key) => {
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = () => {
    if (isEditingProfile) {
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2000);
    }
    setIsEditingProfile(!isEditingProfile);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword !== confirmPassword) {
      alert('Please enter and confirm your new password correctly.');
      return;
    }
    setPasswordUpdated(true);
    setTimeout(() => {
      setPasswordUpdated(false);
      setNewPassword('');
      setConfirmPassword('');
    }, 2000);
  };

  const toggleProviderConnect = (id) => {
    setProviders((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextState = !p.connected;
          return {
            ...p,
            connected: nextState,
            status: nextState ? 'Connected' : 'Disconnected',
            detail: nextState
              ? p.id === 'spotify'
                ? 'Connected to catalogue · 12,480 tracks synced'
                : p.id === 'apple'
                ? 'Catalogue integration active · Auto-sync enabled'
                : 'Regional catalogue · Connected and synced'
              : p.id === 'spotify'
              ? 'Spotify catalogue · Not connected'
              : p.id === 'apple'
              ? 'Apple Music catalogue · Not connected'
              : 'Regional catalogue · Not connected',
            badgeColor: nextState
              ? 'text-emerald-700 bg-emerald-50 border-emerald-200/60'
              : 'text-slate-500 bg-slate-100 border-slate-200',
          };
        }
        return p;
      })
    );
  };

  const labelClass = 'text-[11px] font-bold tracking-wider text-slate-500 uppercase block mb-1.5';
  const inputContainerClass =
    'flex items-center px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus-within:border-[#ff2b75] transition-all';

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-[#ff2b75] tracking-wider uppercase block mb-1">
            PREFERENCES & CONTROL
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your account, security, and connected music services.
          </p>
        </div>

        {/* System Status Indicator Pill */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200/80 rounded-full shadow-2xs self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-slate-700">
            System Status:{' '}
            <span className="font-bold text-slate-900">
              All Nodes Operational
            </span>
          </span>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT COLUMN: Admin Profile & Security */}
        <div className="space-y-6">
          {/* Admin Profile Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#ff2b75] flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-slate-900">
                  Admin Profile
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 border border-slate-200/60 px-2.5 py-1 rounded-lg">
                Profile ID #VX-8021
              </span>
            </div>

            {/* Profile Info with Avatar */}
            <div className="flex items-center gap-4 pt-1">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=140&auto=format&fit=crop&q=80"
                  alt="Abhishek Sharma"
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-pink-100 shadow-sm"
                />
                <button
                  type="button"
                  title="Upload profile photo"
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#ff2b75] text-white flex items-center justify-center shadow-sm border-2 border-white cursor-pointer hover:bg-[#e61d65] transition"
                >
                  <Camera className="w-3 h-3" />
                </button>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {profileName}
                  </h3>
                  <CheckCircle2
                    className="w-4 h-4 text-[#ff2b75]"
                    fill="#fff"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Primary Platform Custodian · APAC Node
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-[#ff2b75] border border-pink-100">
                    <Shield className="w-3 h-3" />
                    Admin
                  </span>
                  <span className="text-[11px] text-slate-400">
                    · Read-only clearance
                  </span>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 pt-2">
              <div>
                <label className={labelClass}>Full Name</label>
                <div className={inputContainerClass}>
                  <User className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none disabled:text-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email Address</label>
                <div className={inputContainerClass}>
                  <Mail className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                  <input
                    type="email"
                    disabled={!isEditingProfile}
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="w-full text-xs font-semibold text-slate-800 bg-transparent focus:outline-none disabled:text-slate-700"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={labelClass.replace('mb-1.5', '')}>
                    Assigned Role
                  </label>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                    <Lock className="w-3 h-3 text-slate-400" />
                    Managed via SSO Policy
                  </span>
                </div>
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold text-slate-800">
                      Admin
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-200/60 px-2 py-0.5 rounded-md">
                    Read-only
                  </span>
                </div>
              </div>
            </div>

            {/* Edit / Save Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleSaveProfile}
                className="bg-[#ff2b75] hover:bg-[#e61d65] active:scale-98 text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-sm shadow-pink-500/20 flex items-center gap-1.5 transition cursor-pointer"
              >
                {profileSaved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : isEditingProfile ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                ) : (
                  <span>Edit Profile</span>
                )}
              </button>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#ff2b75] flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">Security</h2>
            </div>

            {/* Change Password Form */}
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <h3 className="text-xs font-bold text-slate-800">
                  Change Password
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Ensure your password uses at least 12 characters including symbols.
                </p>
              </div>

              <div>
                <label className={labelClass}>Current Password</label>
                <div className={inputContainerClass}>
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full text-xs text-slate-800 bg-transparent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer ml-2"
                  >
                    {showCurrent ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className={labelClass}>New Password</label>
                <div className={inputContainerClass}>
                  <input
                    type={showNew ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full text-xs text-slate-800 bg-transparent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer ml-2"
                  >
                    {showNew ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className={labelClass}>Confirm New Password</label>
                <div className={inputContainerClass}>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full text-xs text-slate-800 bg-transparent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer ml-2"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-[#ff2b75] hover:bg-[#e61d65] active:scale-98 text-white text-xs font-bold py-2.5 px-5 rounded-xl shadow-sm shadow-pink-500/20 flex items-center gap-1.5 transition cursor-pointer"
                >
                  {passwordUpdated ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Password Updated!</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Update Password</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="border-t border-slate-100 pt-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold text-slate-900">
                    Two-Factor Authentication
                  </h3>
                  {twoFactorEnabled ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                      Enabled
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">
                      Disabled
                    </span>
                  )}
                </div>

                {/* Toggle Switch */}
                <button
                  type="button"
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                    twoFactorEnabled ? 'bg-[#ff2b75]' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <p className="text-[11px] text-slate-500">
                Add an extra layer of security to your admin account via Authenticator App (TOTP).
              </p>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Smartphone className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium text-slate-700">
                    YubiKey & Authenticator app linked (Last verified 2h ago)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Authenticator settings modal opened.')}
                  className="text-xs font-bold text-[#ff2b75] hover:underline cursor-pointer"
                >
                  Configure
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Music Providers & Notification Preferences */}
        <div className="space-y-6">
          {/* Music Providers Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#ff2b75] flex items-center justify-center">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Music Providers
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('provider-settings')}
                title="Refresh Providers"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-500 -mt-2">
              Manage the music catalogue services connected to VOX.
            </p>

            {/* Providers List */}
            <div className="space-y-3 pt-1">
              {providers.map((prov) => (
                <div
                  key={prov.id}
                  className="p-4 rounded-xl border border-slate-200/70 hover:border-slate-300 transition-all flex items-center justify-between gap-3 bg-white"
                >
                  <div className="flex items-center gap-3.5">
                    {/* Provider Brand Icon */}
                    <div
                      className={`w-10 h-10 rounded-xl ${prov.color} flex items-center justify-center text-white font-black text-sm shadow-2xs shrink-0`}
                    >
                      {prov.id === 'gaana' ? 'G' : prov.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">
                          {prov.name}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${prov.badgeColor}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              prov.connected ? 'bg-emerald-500' : 'bg-slate-400'
                            }`}
                          />
                          {prov.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {prov.detail}
                      </p>
                    </div>
                  </div>

                  {prov.connected ? (
                    <button
                      type="button"
                      onClick={() => toggleProviderConnect(prov.id)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition cursor-pointer"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleProviderConnect(prov.id)}
                      className="px-4 py-1.5 text-xs font-bold text-white bg-[#ff2b75] hover:bg-[#e61d65] rounded-xl shadow-sm shadow-pink-500/20 transition cursor-pointer"
                    >
                      Connect
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notification Preferences Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-50 text-[#ff2b75] flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-slate-900">
                Notification Preferences
              </h2>
            </div>
            <p className="text-xs text-slate-500 -mt-2">
              Choose which updates and alerts you receive as an administrator.
            </p>

            <div className="space-y-4 pt-1">
              {/* Security Alerts */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-pink-50 text-[#ff2b75] flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      Security Alerts
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Receive immediate notifications for suspicious logins and password changes.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotifPref('securityAlerts')}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${
                    notifPrefs.securityAlerts ? 'bg-[#ff2b75]' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      notifPrefs.securityAlerts ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Platform Updates */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-pink-50 text-[#ff2b75] flex items-center justify-center shrink-0 mt-0.5">
                    <Radio className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      Platform Updates
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Get notified about weekly platform performance summaries and new feature releases.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotifPref('platformUpdates')}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${
                    notifPrefs.platformUpdates ? 'bg-[#ff2b75]' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      notifPrefs.platformUpdates ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Scheduled Notification Reminders */}
              <div className="flex items-start justify-between gap-4 p-3 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-pink-50 text-[#ff2b75] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      Scheduled Notification Reminders
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Alerts 1 hour before scheduled announcements are sent to karaoke users.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleNotifPref('scheduledReminders')}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${
                    notifPrefs.scheduledReminders ? 'bg-[#ff2b75]' : 'bg-slate-200'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                      notifPrefs.scheduledReminders ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

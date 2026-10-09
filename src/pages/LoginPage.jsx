import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already logged in
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const success = login(email, password);
      setIsSubmitting(false);

      if (success) {
        navigate('/dashboard', { replace: true });
      } else {
        setErrorMessage('Invalid email or password');
      }
    }, 400);
  };

  const fillDemoCredentials = () => {
    setEmail('admin123@gmail.com');
    setPassword('Admin@123');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff2b75]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header Card */}
        <div className="p-8 pb-6 text-center border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/softkingo-logo.png"
              alt="Softkingo"
              className="h-10 w-auto object-contain max-w-[210px]"
            />
          </div>

          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Admin Panel
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Enter your email and password to access system controls.
          </p>
        </div>

        {/* Form Area */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200/80 text-rose-600 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 duration-150">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="text-[11px] font-bold tracking-wider text-slate-600 uppercase block mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin123@gmail.com"
                className="w-full text-xs text-slate-900 placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#ff2b75] transition-all"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold tracking-wider text-slate-600 uppercase block">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs text-slate-900 placeholder-slate-400 pl-10 pr-10 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#ff2b75] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#ff2b75] hover:bg-[#e61d65] active:scale-98 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-70 mt-2"
          >
            <span>{isSubmitting ? 'Verifying...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

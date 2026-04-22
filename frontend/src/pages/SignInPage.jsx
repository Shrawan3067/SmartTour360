import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Input, Divider } from '../components/UI';

/* ── Eye icon ─────────────────────────────────────────────── */
const EyeIcon = ({ open }) => open ? (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
) : (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
  </svg>
);

/* ══════════════════════════════════════════════════════════════
   SIGN IN PAGE
══════════════════════════════════════════════════════════════ */
const SignInPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm]   = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [apiError, setApiError] = useState('');

  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: '' })); };

  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Min. 6 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    const e2 = validate();
    if (Object.keys(e2).length) { setErrors(e2); return; }

    setLoading(true);
    try {
      const result = await login(form);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setApiError(result.error || 'Sign in failed. Please try again.');
      }
    } catch {
      setApiError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] flex">
      {/* Left decorative panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-stone-900 to-stone-800 flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-6">🏛️</div>
          <h2 className="text-3xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            India Awaits You
          </h2>
          <p className="text-stone-400 text-sm leading-relaxed max-w-xs mx-auto">
            Sign in to access your bookings, wishlist, and personalised travel recommendations.
          </p>
          <div className="mt-10 space-y-3">
            {['250K+ trips booked', '200+ destinations', '4.9★ average rating'].map(t => (
              <div key={t} className="flex items-center gap-2 text-sm text-stone-300">
                <svg className="w-4 h-4 text-orange-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm page-enter">
          {/* Logo for mobile */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <span className="text-xl font-black text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>
                SmartTour<span className="text-orange-500">360</span>
              </span>
            </div>
          </div>

          <h1 className="text-3xl font-black text-stone-900 mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>
            Welcome back
          </h1>
          <p className="text-stone-500 text-sm mb-8">
            Don't have an account?{' '}
            <Link to="/signup" className="text-orange-600 font-semibold hover:text-orange-700">Sign up free</Link>
          </p>

          {apiError && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-700">
              <span>⚠️</span> {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <Input
              label="Email address"
              type="email"
              value={form.email}
              onChange={e => set('email', e.target.value)}
              placeholder="you@example.com"
              error={errors.email}
              autoComplete="email"
            />
            <Input
              label="Password"
              type={showPwd ? 'text' : 'password'}
              value={form.password}
              onChange={e => set('password', e.target.value)}
              placeholder="••••••••"
              error={errors.password}
              autoComplete="current-password"
              iconRight={
                <button type="button" onClick={() => setShowPwd(v => !v)} className="text-stone-400 hover:text-stone-600">
                  <EyeIcon open={showPwd} />
                </button>
              }
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-orange-500 rounded" />
                <span className="text-sm text-stone-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-orange-600 font-semibold hover:text-orange-700">
                Forgot password?
              </button>
            </div>

            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full justify-center mt-2">
              {!loading && 'Sign In'}
            </Button>
          </form>

          <Divider label="or continue with" className="my-6" />

          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Google', icon: <svg viewBox="0 0 24 24" className="w-4 h-4"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg> },
              { name: 'Phone', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg> },
            ].map(s => (
              <button key={s.name}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:border-stone-300 transition-all"
                style={{ fontFamily: 'var(--font-display)' }}>
                {s.icon}
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

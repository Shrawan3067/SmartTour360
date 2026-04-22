import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './UI';

const NAV = [
  { name: 'Heritage',     path: '/heritage',     icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  { name: 'Destinations', path: '/destinations',  icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  { name: 'Offers',       path: '/offers',        icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg> },
  { name: 'About',        path: '/about-us',      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { name: 'Support',      path: '/support',       icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
];

/* ─────────────────────────────────────────── */
const Header = () => {
  const { user, logout }   = useAuth();
  const navigate           = useNavigate();
  const location           = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);
  const prevPathnameRef = useRef(location.pathname);

  /* scroll effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close dropdown on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* close mobile menu on route change */
  useEffect(() => {
    if (prevPathnameRef.current !== location.pathname) {
      setMenuOpen(false);
      prevPathnameRef.current = location.pathname;
    }
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : '';

  return (
    <>
      {/* ── Main Nav ───────────────────────────────────── */}
      <header className={[
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,0,0,0.08)] border-b border-stone-100'
          : 'bg-white border-b border-stone-100',
      ].join(' ')}>
        <div className="max-w-[1248px] mx-auto px-5 md:px-10">
          <div className="flex items-center justify-between h-[68px]">

            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 group shrink-0"
              aria-label="SmartTour360 home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[17px] font-black tracking-tight text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>
                  SmartTour<span className="text-orange-500">360</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-stone-400 font-medium">AI Travel</span>
              </div>
            </button>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV.map(link => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={[
                    'relative px-3 py-2 text-[13px] font-semibold rounded-lg transition-all duration-150 flex items-center gap-2',
                    isActive(link.path)
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50',
                  ].join(' ')}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <span className="text-base">{link.icon}</span>
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-orange-500 rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              {user ? (
                /* Authenticated user menu */
                <div ref={dropRef} className="relative">
                  <button
                    onClick={() => setDropOpen(v => !v)}
                    className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-all duration-150"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white text-xs font-bold">
                      {initials}
                    </div>
                    <span className="text-sm font-semibold text-stone-700 max-w-[100px] truncate hidden sm:block"
                      style={{ fontFamily: 'var(--font-display)' }}>
                      {user.name.split(' ')[0]}
                    </span>
                    <svg className={`w-3.5 h-3.5 text-stone-400 transition-transform ${dropOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {dropOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-stone-100 rounded-2xl shadow-xl overflow-hidden z-50 py-1.5">
                      <div className="px-4 py-3 border-b border-stone-100">
                        <p className="text-sm font-bold text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>{user.name}</p>
                        <p className="text-xs text-stone-400 truncate">{user.email}</p>
                      </div>
                      {[
                        { label: 'Dashboard',   icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>, path: '/dashboard' },
                        { label: 'My Bookings', icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>, path: '/dashboard' },
                        { label: 'Wishlist',    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>, path: '/wishlist' },
                        { label: 'Trip Planner',icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>, path: '/trip-planner' },
                      ].map(item => (
                        <button key={item.path + item.label}
                          onClick={() => { navigate(item.path); setDropOpen(false); }}
                          className="w-full px-4 py-2.5 text-left text-sm text-stone-700 hover:bg-stone-50 flex items-center gap-3 transition-colors">
                          {item.icon}
                          <span style={{ fontFamily: 'var(--font-display)' }}>{item.label}</span>
                        </button>
                      ))}
                      <div className="border-t border-stone-100 mt-1 pt-1">
                        <button
                          onClick={() => { logout(); setDropOpen(false); navigate('/'); }}
                          className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors">
                          <span>🚪</span>
                          <span style={{ fontFamily: 'var(--font-display)' }}>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Guest buttons */
                <>
                  <Button variant="ghost" size="sm" className="hidden md:flex" onClick={() => navigate('/signin')}>
                    Sign In
                  </Button>
                  <Button variant="primary" size="sm" className="hidden md:flex" onClick={() => navigate('/signup')}>
                    Get Started
                  </Button>
                </>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen(v => !v)}
                className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-5 space-y-1.5">
                  <span className={`block h-0.5 bg-stone-700 rounded transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-0.5 bg-stone-700 rounded transition-all duration-200 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                  <span className={`block h-0.5 bg-stone-700 rounded transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile drawer ──────────────────────────── */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-[500px] border-t border-stone-100' : 'max-h-0'}`}>
          <div className="bg-white px-5 py-4 space-y-1">
            {NAV.map(link => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={[
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                  isActive(link.path)
                    ? 'bg-orange-50 text-orange-600'
                    : 'text-stone-700 hover:bg-stone-50',
                ].join(' ')}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span className="text-base">{link.icon}</span>
                {link.name}
              </button>
            ))}
            {!user && (
              <div className="pt-3 border-t border-stone-100 flex gap-3">
                <Button variant="ghost" size="md" className="flex-1" onClick={() => navigate('/signin')}>Sign In</Button>
                <Button variant="primary" size="md" className="flex-1" onClick={() => navigate('/signup')}>Sign Up</Button>
              </div>
            )}
            {user && (
              <div className="pt-3 border-t border-stone-100">
                <button
                  onClick={() => { logout(); navigate('/'); }}
                  className="w-full text-left px-4 py-3 text-sm text-red-500 font-semibold flex items-center gap-3"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-[68px]" aria-hidden />
    </>
  );
};

export default Header;

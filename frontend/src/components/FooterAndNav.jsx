import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/* ══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */
const LINKS = {
  Explore: [
    { name: 'Heritage Tours',       path: '/heritage' },
    { name: 'Destinations',         path: '/destinations' },
    { name: 'Offers & Deals',       path: '/offers' },
    { name: 'Trip Planner',         path: '/trip-planner' },
  ],
  Book: [
    { name: 'Flight Booking',       path: '/flight-booking' },
    { name: 'Train Booking',        path: '/train-booking' },
    { name: 'Bus Booking',          path: '/bus-booking' },
    { name: 'Search Results',       path: '/search-results' },
  ],
  Company: [
    { name: 'About Us',             path: '/about-us' },
    { name: 'Contact',              path: '/contact' },
    { name: 'Support',              path: '/support' },
    { name: 'FAQ',                  path: '/faq' },
  ],
  Legal: [
    { name: 'Privacy Policy',       path: '/privacy' },
    { name: 'Terms of Service',     path: '/terms' },
  ],
};

const SOCIAL = [
  { name: 'Twitter/X',  icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>, href: '#' },
  { name: 'Instagram',  icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>, href: '#' },
  { name: 'LinkedIn',   icon: <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>, href: '#' },
];

export const Footer = () => {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-950 text-stone-300">
      <div className="max-w-[1248px] mx-auto px-5 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_repeat(4,1fr)] gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <button onClick={() => navigate('/')} className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-black text-lg leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                  SmartTour<span className="text-orange-500">360</span>
                </div>
                <div className="text-stone-500 text-[9px] uppercase tracking-widest">AI Travel</div>
              </div>
            </button>
            <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-xs">
              India's smartest AI travel platform. Discover, book, and explore 200+ destinations with verified safety ratings.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {SOCIAL.map(s => (
                <a key={s.name} href={s.href} aria-label={s.name}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-stone-400 hover:text-orange-400 hover:border-orange-500/40 transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: 'var(--font-display)' }}>
                {group}
              </h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item.path}>
                    <button
                      onClick={() => navigate(item.path)}
                      className="text-stone-400 hover:text-orange-400 text-sm transition-colors text-left"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-500 text-xs">
            © {year} SmartTour360. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>Made with</span>
            <span className="text-red-400">❤️</span>
            <span>for Indian Travellers</span>
          </div>
          <div className="flex gap-4">
            {['Privacy', 'Terms', 'Cookies'].map(l => (
              <button key={l}
                onClick={() => navigate(`/${l.toLowerCase()}`)}
                className="text-stone-500 hover:text-stone-300 text-xs transition-colors">
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ══════════════════════════════════════════════════════════════
   BOTTOM NAVIGATION (mobile only)
══════════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { name: 'Home',    path: '/',            icon: (active) => (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
    </svg>
  )},
  { name: 'Explore', path: '/destinations', icon: (active) => (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
    </svg>
  )},
  { name: 'Offers',  path: '/offers',       icon: (active) => (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
    </svg>
  )},
  { name: 'Heritage',path: '/heritage',     icon: (active) => (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
    </svg>
  )},
  { name: 'Support', path: '/support',      icon: (active) => (
    <svg className="w-5 h-5" fill={active ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={active ? 0 : 2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
    </svg>
  )},
];

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide on auth pages
  const hidden = ['/signin', '/signup'].includes(location.pathname);
  if (hidden) return null;

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white/95 backdrop-blur-xl border-t border-stone-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-around px-1 py-1">
        {NAV_ITEMS.map(item => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={[
                'flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl flex-1 transition-all duration-200',
                active ? 'text-orange-500' : 'text-stone-400',
              ].join(' ')}
              aria-label={item.name}
            >
              {item.icon(active)}
              <span className={`text-[9px] font-bold uppercase tracking-wide leading-none ${active ? 'text-orange-500' : 'text-stone-400'}`}
                style={{ fontFamily: 'var(--font-display)' }}>
                {item.name}
              </span>
              {active && <div className="w-1 h-1 rounded-full bg-orange-500 absolute bottom-1" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Footer;

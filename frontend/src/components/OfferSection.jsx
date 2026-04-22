import React, { useState } from 'react';
import { Button } from './UI';

const OFFERS = [
  {
    badge: 'FIRST TRIP',
    title: 'Flat ₹500 Off',
    description: 'Valid on your first flight or hotel booking. No minimum spend required.',
    code: 'WELCOME500',
    icon: '🎁',
    accent: 'from-orange-500 to-amber-500',
    light: 'bg-orange-50 border-orange-200',
    expires: '31 May 2025',
  },
  {
    badge: 'UPI SAVE',
    title: 'Instant 5% Cashback',
    description: 'Pay via UPI and get instant cashback to your SmartWallet. Zero fees.',
    code: 'UPI5CASH',
    icon: '💳',
    accent: 'from-violet-500 to-purple-600',
    light: 'bg-violet-50 border-violet-200',
    expires: '30 Jun 2025',
  },
  {
    badge: 'SAFE STAY',
    title: '15% Off Verified Hotels',
    description: 'Exclusive discount on Green Flag safety-rated accommodations only.',
    code: 'SAFE15',
    icon: '🏨',
    accent: 'from-teal-500 to-emerald-600',
    light: 'bg-teal-50 border-teal-200',
    expires: '15 Jun 2025',
  },
];

export const OfferSection = () => {
  const [copied, setCopied] = useState(null);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="py-20 px-5 md:px-10 bg-white" id="offers">
      <div className="max-w-[1248px] mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold uppercase tracking-widest mb-4"
            style={{ fontFamily: 'var(--font-display)' }}>
            ⏰ Limited Time
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-stone-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
            Exclusive{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Savings
            </span>
          </h2>
          <p className="text-stone-500 max-w-md mx-auto text-[15px]">
            Grab limited-time deals before they vanish. Tap to copy your code instantly.
          </p>
        </div>

        {/* Offer cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFERS.map(offer => (
            <div key={offer.code} className="relative group bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
              {/* Top color strip */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${offer.accent}`} />

              <div className="p-6">
                {/* Icon + badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${offer.light} border flex items-center justify-center text-2xl`}>
                    {offer.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 bg-stone-100 text-stone-500 rounded-lg"
                    style={{ fontFamily: 'var(--font-display)' }}>
                    {offer.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-stone-900 mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>
                  {offer.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">
                  {offer.description}
                </p>

                {/* Code copy area */}
                <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl border border-dashed border-stone-300 mb-3">
                  <span className="flex-1 font-mono text-sm font-bold text-stone-700 tracking-widest">
                    {offer.code}
                  </span>
                  <button
                    onClick={() => copyCode(offer.code)}
                    className={[
                      'px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200',
                      copied === offer.code
                        ? 'bg-green-500 text-white'
                        : 'bg-white border border-stone-200 text-stone-600 hover:border-orange-300 hover:text-orange-600',
                    ].join(' ')}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {copied === offer.code ? '✓ Copied!' : 'Copy'}
                  </button>
                </div>

                <p className="text-[11px] text-stone-400">
                  ⏰ Expires {offer.expires}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════════════
   ABOUT SECTION
══════════════════════════════════════════════════════════════ */
const FEATURES = [
  {
    icon: '🤖',
    title: 'AI-Powered Planning',
    description: 'Our AI curates personalised itineraries based on your interests, budget, and travel style.',
  },
  {
    icon: '🛡️',
    title: 'Safety Ratings',
    description: 'Every destination is independently safety-rated with Green, Yellow and Red flags for informed decisions.',
  },
  {
    icon: '💚',
    title: 'Ethical Travel',
    description: 'We partner only with eco-certified operators and support local communities across India.',
  },
  {
    icon: '⚡',
    title: 'Instant Confirmation',
    description: 'Real-time booking confirmation for flights, trains, buses and tours — no waiting.',
  },
];

export const AboutSection = () => (
  <section className="py-20 px-5 md:px-10 bg-gradient-to-br from-stone-900 to-stone-800 text-white overflow-hidden" id="about">
    <div className="max-w-[1248px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-[11px] font-bold uppercase tracking-widest mb-6"
            style={{ fontFamily: 'var(--font-display)' }}>
            About SmartTour360
          </div>

          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Travel Intelligently.{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
              Travel Responsibly.
            </span>
          </h2>

          <p className="text-stone-300 text-[15px] leading-relaxed mb-8">
            SmartTour360 combines AI intelligence with deep local expertise to make Indian travel safer, smarter and more meaningful. 
            We're not just a booking platform — we're your travel partner.
          </p>

          <div className="flex gap-6 mb-8">
            {[
              { n: '50K+', l: 'Travellers' },
              { n: '200+', l: 'Destinations' },
              { n: '4.9★', l: 'Rating' },
            ].map(s => (
              <div key={s.l}>
                <div className="text-2xl font-black text-orange-400" style={{ fontFamily: 'var(--font-display)' }}>{s.n}</div>
                <div className="text-stone-400 text-xs mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>

          <Button variant="primary" size="lg">
            Learn More About Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>

        {/* Right grid */}
        <div className="grid grid-cols-2 gap-4">
          {FEATURES.map(f => (
            <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors duration-200">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-sm text-white mb-1.5" style={{ fontFamily: 'var(--font-display)' }}>
                {f.title}
              </h3>
              <p className="text-stone-400 text-xs leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default OfferSection;

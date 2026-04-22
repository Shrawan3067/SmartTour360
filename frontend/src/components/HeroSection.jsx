import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './UI';

const CITIES = [
  { code: 'DEL', name: 'New Delhi',    region: 'Delhi' },
  { code: 'BOM', name: 'Mumbai',       region: 'Maharashtra' },
  { code: 'BLR', name: 'Bangalore',    region: 'Karnataka' },
  { code: 'MAA', name: 'Chennai',      region: 'Tamil Nadu' },
  { code: 'CCU', name: 'Kolkata',      region: 'West Bengal' },
  { code: 'HYD', name: 'Hyderabad',    region: 'Telangana' },
  { code: 'AMD', name: 'Ahmedabad',    region: 'Gujarat' },
  { code: 'PNQ', name: 'Pune',         region: 'Maharashtra' },
  { code: 'GOI', name: 'Goa',          region: 'Goa' },
  { code: 'JAI', name: 'Jaipur',       region: 'Rajasthan' },
  { code: 'LKO', name: 'Lucknow',      region: 'Uttar Pradesh' },
  { code: 'COK', name: 'Kochi',        region: 'Kerala' },
  { code: 'VNS', name: 'Varanasi',     region: 'Uttar Pradesh' },
  { code: 'IXC', name: 'Chandigarh',   region: 'Chandigarh' },
  { code: 'GAU', name: 'Guwahati',     region: 'Assam' },
  { code: 'UDR', name: 'Udaipur',      region: 'Rajasthan' },
];

const TABS = [
  { id: 'flight', label: 'Flights', icon: '✈️' },
  { id: 'train',  label: 'Trains',  icon: '🚂' },
  { id: 'bus',    label: 'Buses',   icon: '🚌' },
  { id: 'tour',   label: 'Tours',   icon: '🗺️' },
];

const STATS = [
  { value: '50K+',  label: 'Happy Travellers' },
  { value: '200+',  label: 'Destinations' },
  { value: '4.9★',  label: 'Average Rating' },
  { value: '24/7',  label: 'Support' },
];

/* ── City autocomplete dropdown ─────────────────────────────── */
const CityPicker = ({ label, value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value || '');
  const ref = useRef(null);

  const filtered = CITIES.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.code.toLowerCase().includes(query.toLowerCase()) ||
    c.region.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 6);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const select = (city) => {
    onChange(city.name);
    setQuery(city.name);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 px-1"
        style={{ fontFamily: 'var(--font-display)' }}>
        {label}
      </label>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm font-medium text-stone-900 placeholder:text-stone-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
      />
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-100 rounded-xl shadow-xl overflow-hidden z-50">
          {filtered.map(city => (
            <button
              key={city.code}
              type="button"
              onClick={() => select(city)}
              className="w-full px-4 py-2.5 text-left hover:bg-orange-50 flex items-center justify-between group transition-colors"
            >
              <div>
                <span className="text-sm font-semibold text-stone-800" style={{ fontFamily: 'var(--font-display)' }}>{city.name}</span>
                <span className="text-xs text-stone-400 ml-2">{city.region}</span>
              </div>
              <span className="text-xs font-mono text-stone-400 group-hover:text-orange-500">{city.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Main HeroSection ────────────────────────────────────────── */
const HeroSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('flight');
  const [tripType, setTripType] = useState('one-way');
  const [form, setForm] = useState({
    origin: '', destination: '',
    departure: '', returnDate: '',
    travelers: 1, class: 'Economy',
  });

  const setField = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const routeMap = { flight: '/flight-booking', train: '/train-booking', bus: '/bus-booking', tour: '/tour-booking' };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(routeMap[activeTab], { state: { searchParams: form, tripType } });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-stone-50 via-orange-50/30 to-amber-50/20">

      {/* ── Background decoration ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-40 w-[500px] h-[500px] bg-amber-100/40 rounded-full blur-3xl" />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: 'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 w-full max-w-[1248px] mx-auto px-5 md:px-10 py-16 flex flex-col items-center gap-12">

        {/* ── Headline ── */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-xs font-bold uppercase tracking-widest mb-6"
            style={{ fontFamily: 'var(--font-display)' }}>
            <span>🇮🇳</span> India's Smartest Travel Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-stone-900 mb-6"
            style={{ fontFamily: 'var(--font-display)' }}>
            Discover India's{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                Hidden Wonders
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M4 8 Q75 2 150 8 Q225 14 296 8" stroke="#f97316" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5"/>
              </svg>
            </span>
          </h1>

          <p className="text-lg text-stone-500 max-w-xl mx-auto leading-relaxed">
            Book flights, trains, buses and curated tours with AI-powered safety ratings. 
            Travel smarter across 200+ Indian destinations.
          </p>
        </div>

        {/* ── Search Card ── */}
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.10)] border border-stone-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-stone-100">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-all duration-200',
                  'border-b-2 -mb-px',
                  activeTab === tab.id
                    ? 'border-orange-500 text-orange-600 bg-orange-50/60'
                    : 'border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-50',
                ].join(' ')}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span className="text-base">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Form body */}
          <form onSubmit={handleSearch} className="p-5 md:p-6">
            {/* Trip type (flight/train only) */}
            {(activeTab === 'flight' || activeTab === 'train') && (
              <div className="flex gap-4 mb-5">
                {['one-way', 'round-trip'].map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="tripType"
                      value={type}
                      checked={tripType === type}
                      onChange={() => setTripType(type)}
                      className="w-4 h-4 accent-orange-500"
                    />
                    <span className={`text-sm font-semibold capitalize transition-colors ${tripType === type ? 'text-orange-600' : 'text-stone-500 group-hover:text-stone-800'}`}
                      style={{ fontFamily: 'var(--font-display)' }}>
                      {type.replace('-', ' ')}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* Origin / Destination row */}
            {activeTab !== 'tour' ? (
              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 mb-4">
                <CityPicker
                  label={activeTab === 'bus' ? 'From City' : 'Origin'}
                  value={form.origin}
                  onChange={v => setField('origin', v)}
                  placeholder={activeTab === 'flight' ? 'Delhi (DEL)' : 'Delhi'}
                />
                {/* Swap button */}
                <div className="hidden md:flex items-end pb-1.5">
                  <button
                    type="button"
                    onClick={() => setForm(p => ({ ...p, origin: p.destination, destination: p.origin }))}
                    className="w-9 h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-orange-500 hover:border-orange-300 hover:bg-orange-50 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </button>
                </div>
                <CityPicker
                  label={activeTab === 'bus' ? 'To City' : 'Destination'}
                  value={form.destination}
                  onChange={v => setField('destination', v)}
                  placeholder={activeTab === 'flight' ? 'Mumbai (BOM)' : 'Mumbai'}
                />
              </div>
            ) : (
              /* Tour search */
              <div className="mb-4">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 px-1"
                  style={{ fontFamily: 'var(--font-display)' }}>Where do you want to explore?</label>
                <input
                  value={form.destination}
                  onChange={e => setField('destination', e.target.value)}
                  placeholder="Search destination, state or category..."
                  className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm font-medium outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
            )}

            {/* Date / Passengers row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 px-1"
                  style={{ fontFamily: 'var(--font-display)' }}>
                  {activeTab === 'tour' ? 'Start Date' : 'Departure'}
                </label>
                <input
                  type="date"
                  value={form.departure}
                  onChange={e => setField('departure', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>
              {(tripType === 'round-trip' && activeTab === 'flight') && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 px-1"
                    style={{ fontFamily: 'var(--font-display)' }}>Return</label>
                  <input
                    type="date"
                    value={form.returnDate}
                    onChange={e => setField('returnDate', e.target.value)}
                    min={form.departure || new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
              )}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 px-1"
                  style={{ fontFamily: 'var(--font-display)' }}>Travellers</label>
                <select
                  value={form.travelers}
                  onChange={e => setField('travelers', +e.target.value)}
                  className="w-full px-3 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all appearance-none"
                >
                  {[1,2,3,4,5,6].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Adult' : 'Adults'}</option>
                  ))}
                </select>
              </div>
              {activeTab === 'flight' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1.5 px-1"
                    style={{ fontFamily: 'var(--font-display)' }}>Class</label>
                  <select
                    value={form.class}
                    onChange={e => setField('class', e.target.value)}
                    className="w-full px-3 py-3 bg-white border border-stone-200 rounded-xl text-sm text-stone-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all appearance-none"
                  >
                    {['Economy', 'Premium Economy', 'Business', 'First'].map(c => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full justify-center text-base py-4 rounded-2xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search {TABS.find(t => t.id === activeTab)?.label}
            </Button>
          </form>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-2xl">
          {STATS.map(s => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-black text-stone-900 mb-0.5" style={{ fontFamily: 'var(--font-display)' }}>
                {s.value}
              </div>
              <div className="text-xs text-stone-400 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 animate-bounce">
        <div className="text-[10px] uppercase tracking-widest text-stone-500 font-semibold">Scroll</div>
        <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
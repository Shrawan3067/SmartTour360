import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Badge } from './UI';

const DESTINATIONS = [
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    price: '₹5,500',
    rating: 4.8,
    reviews: 2340,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&auto=format&fit=crop',
    highlights: ['Amber Fort', 'Hawa Mahal'],
    category: 'Heritage',
    duration: '3D/2N',
    safetyBadge: '🟢 Safe',
  },
  {
    id: 'munnar',
    name: 'Munnar',
    state: 'Kerala',
    price: '₹6,200',
    rating: 4.9,
    reviews: 1890,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&auto=format&fit=crop',
    highlights: ['Tea Gardens', 'Eravikulam NP'],
    category: 'Nature',
    duration: '4D/3N',
    safetyBadge: '🟢 Safe',
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    price: '₹3,499',
    rating: 4.7,
    reviews: 4120,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop',
    highlights: ['Baga Beach', 'Old Goa'],
    category: 'Beach',
    duration: '3D/2N',
    safetyBadge: '🟢 Safe',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    state: 'J&K',
    price: '₹12,999',
    rating: 4.9,
    reviews: 987,
    image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&auto=format&fit=crop',
    highlights: ['Pangong Lake', 'Nubra Valley'],
    category: 'Adventure',
    duration: '7D/6N',
    safetyBadge: '🟡 Seasonal',
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    price: '₹4,100',
    rating: 4.6,
    reviews: 3200,
    image: 'https://images.unsplash.com/photo-1561361058-c24e020f04f3?w=600&auto=format&fit=crop',
    highlights: ['Ganga Aarti', 'Boat Ride'],
    category: 'Spiritual',
    duration: '2D/1N',
    safetyBadge: '🟢 Safe',
  },
  {
    id: 'andaman',
    name: 'Andaman',
    state: 'A&N Islands',
    price: '₹9,800',
    rating: 4.8,
    reviews: 1560,
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&auto=format&fit=crop',
    highlights: ['Radhanagar Beach', 'Snorkelling'],
    category: 'Beach',
    duration: '5D/4N',
    safetyBadge: '🟢 Safe',
  },
];

const FILTERS = ['All', 'Heritage', 'Beach', 'Nature', 'Adventure', 'Spiritual'];

const DestCard = ({ dest, onBook }) => {
  const [liked, setLiked] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={dest.image}
          alt={dest.name}
          onLoad={() => setImgLoaded(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Top badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg bg-white/90 text-stone-700 backdrop-blur-sm"
            style={{ fontFamily: 'var(--font-display)' }}>
            {dest.category}
          </span>
          <button
            onClick={() => setLiked(l => !l)}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm transition-transform hover:scale-110"
          >
            <svg className={`w-4 h-4 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-stone-500'}`} fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-2 left-2 right-2">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-xl font-black text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {dest.name}
              </h3>
              <p className="text-white/80 text-xs mt-0.5">{dest.state} · {dest.duration}</p>
            </div>
            <div className="text-right">
              <div className="text-white text-xs opacity-70">from</div>
              <div className="text-white text-lg font-black leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                {dest.price}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-bold text-stone-800">{dest.rating}</span>
            <span className="text-xs text-stone-400">({dest.reviews.toLocaleString()})</span>
          </div>
          <span className="text-[11px] text-stone-500 font-medium">{dest.safetyBadge}</span>
        </div>

        <div className="flex gap-1.5 mb-3 flex-wrap">
          {dest.highlights.map(h => (
            <span key={h} className="text-[11px] px-2 py-1 bg-stone-50 border border-stone-200 rounded-lg text-stone-600 font-medium">
              {h}
            </span>
          ))}
        </div>

        <Button
          variant="primary"
          size="sm"
          className="w-full justify-center"
          onClick={() => onBook(dest.id)}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

const TrendingSection = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.category === filter);

  return (
    <section className="py-20 px-5 md:px-10 bg-stone-50/50" id="trending">
      <div className="max-w-[1248px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-700 text-[11px] font-bold uppercase tracking-widest mb-4"
              style={{ fontFamily: 'var(--font-display)' }}>
              ✨ Trending Now
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-stone-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              India's Most{' '}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Loved Escapes
              </span>
            </h2>
            <p className="text-stone-500 mt-3 max-w-lg text-[15px]">
              Handpicked journeys with verified safety ratings and authentic experiences.
            </p>
          </div>
          <Button variant="secondary" size="md" onClick={() => navigate('/destinations')}>
            View All Destinations
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={[
                'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 border',
                filter === f
                  ? 'bg-orange-500 text-white border-orange-500 shadow-[0_4px_12px_rgba(249,115,22,0.3)]'
                  : 'bg-white text-stone-600 border-stone-200 hover:border-stone-300 hover:bg-stone-50',
              ].join(' ')}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(dest => (
            <DestCard
              key={dest.id}
              dest={dest}
              onBook={(id) => navigate(`/booking/${id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSection;

import React, { useState } from 'react';

const OffersPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedCode, setCopiedCode] = useState(null);

  const offers = [
    {
      id: 1,
      badge: "FIRST-TRIP",
      title: "Flat ₹500 Off",
      description: "Valid on your first flight or hotel booking. No minimum spend.",
      code: "WELCOME500",
      icon: "🎁",
      category: "first-time",
      discount: "₹500",
      validUntil: "Dec 31, 2024",
      terms: "New users only",
      featured: true
    },
    {
      id: 2,
      badge: "UPI-SAVE",
      title: "Instant 5% Cashback",
      description: "Pay via UPI and get instant credit to your SmartWallet. No convenience fees.",
      code: "UPI5CASH",
      icon: "💳",
      category: "payments",
      discount: "5%",
      validUntil: "Nov 30, 2024",
      terms: "Max ₹1000 cashback",
      featured: true
    },
    {
      id: 3,
      badge: "SAFE-STAY",
      title: "15% Off Verified Hotels",
      description: "Exclusive discounts on Green Flag safety-rated accommodations.",
      code: "SAFE15",
      icon: "🏨",
      category: "hotels",
      discount: "15%",
      validUntil: "Dec 15, 2024",
      terms: "Minimum booking ₹3000",
      featured: true
    },
    {
      id: 4,
      badge: "FLIGHT-FEST",
      title: "Up to ₹2000 Off on Flights",
      description: "Book domestic flights and get instant discount on your fare.",
      code: "FLYHIGH",
      icon: "✈️",
      category: "flights",
      discount: "₹2000",
      validUntil: "Oct 30, 2024",
      terms: "Min. booking ₹5000",
      featured: false
    },
    {
      id: 5,
      badge: "TRAIN-DEAL",
      title: "10% Cashback on Train Bookings",
      description: "Book train tickets and earn cashback directly to your wallet.",
      code: "TRAIN10",
      icon: "🚆",
      category: "trains",
      discount: "10%",
      validUntil: "Nov 15, 2024",
      terms: "Max ₹300 cashback",
      featured: false
    },
    {
      id: 6,
      badge: "BUS-BLAST",
      title: "Flat ₹150 Off on Bus Tickets",
      description: "Travel intercity with exclusive bus discounts.",
      code: "BUS150",
      icon: "🚌",
      category: "buses",
      discount: "₹150",
      validUntil: "Oct 31, 2024",
      terms: "Minimum 2 tickets",
      featured: false
    },
    {
      id: 7,
      badge: "HOTEL-HOP",
      title: "Free Breakfast & Room Upgrade",
      description: "Book premium hotels and get complimentary breakfast with room upgrade.",
      code: "STAYLUXE",
      icon: "🏨",
      category: "hotels",
      discount: "Upgrade",
      validUntil: "Dec 31, 2024",
      terms: "Min. 2 nights stay",
      featured: false
    },
    {
      id: 8,
      badge: "GROUP-GO",
      title: "Group Discount - 20% Off",
      description: "Plan group trips with friends and family and save big.",
      code: "GROUP20",
      icon: "👥",
      category: "group",
      discount: "20%",
      validUntil: "Jan 15, 2025",
      terms: "Min. 4 travelers",
      featured: false
    },
    {
      id: 9,
      badge: "FESTIVE-SPL",
      title: "Festival Special - Extra 5% Off",
      description: "Celebrate the festive season with extra savings on all bookings.",
      code: "FESTIVE5",
      icon: "🎉",
      category: "festive",
      discount: "5%",
      validUntil: "Nov 10, 2024",
      terms: "Valid on all bookings",
      featured: true
    }
  ];

  const categories = [
    { id: "all", name: "All Offers", icon: "🎯" },
    { id: "first-time", name: "First Time", icon: "🎁" },
    { id: "flights", name: "Flights", icon: "✈️" },
    { id: "trains", name: "Trains", icon: "🚆" },
    { id: "buses", name: "Buses", icon: "🚌" },
    { id: "hotels", name: "Hotels", icon: "🏨" },
    { id: "payments", name: "Payments", icon: "💳" },
    { id: "group", name: "Group", icon: "👥" },
    { id: "festive", name: "Festive", icon: "🎉" }
  ];

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredOffers = selectedCategory === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === selectedCategory);

  const featuredOffers = offers.filter(offer => offer.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Limited Time Offers
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
            Exclusive{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              Deals & Discounts
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Unlock amazing savings on flights, hotels, and more. Limited time offers, grab them before they're gone!
          </p>

          {/* Countdown Timer */}
          <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-black text-amber-600">12</div>
              <div className="text-[10px] uppercase font-bold text-gray-500">Days</div>
            </div>
            <div className="text-2xl font-bold text-gray-400">:</div>
            <div className="text-center">
              <div className="text-2xl font-black text-amber-600">08</div>
              <div className="text-[10px] uppercase font-bold text-gray-500">Hours</div>
            </div>
            <div className="text-2xl font-bold text-gray-400">:</div>
            <div className="text-center">
              <div className="text-2xl font-black text-amber-600">45</div>
              <div className="text-[10px] uppercase font-bold text-gray-500">Mins</div>
            </div>
            <div className="text-2xl font-bold text-gray-400">:</div>
            <div className="text-center">
              <div className="text-2xl font-black text-amber-600">22</div>
              <div className="text-[10px] uppercase font-bold text-gray-500">Secs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-amber-500 hover:text-amber-600'
                }`}
              >
                <span className="text-base">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Offers Banner */}
      <section className="px-6 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold uppercase tracking-wider mb-4">
                  <span>🔥</span>
                  <span>Limited Time</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
                  Flash Sale: Up to 40% Off
                </h2>
                <p className="text-white/90">Use code <span className="font-mono font-bold">FLASH40</span> at checkout</p>
              </div>
              <button className="px-8 py-3 bg-white text-amber-600 font-black uppercase tracking-wider rounded-xl hover:shadow-xl transition-all duration-300">
                Claim Offer →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900">
                {selectedCategory === 'all' ? 'All Offers' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {filteredOffers.length} active offers available
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <span>Verified & Authentic</span>
            </div>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
              >
                {/* Featured Badge */}
                {offer.featured && (
                  <div className="absolute top-2 right-2 z-10">
                    <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase rounded-lg shadow-lg">
                      <span>⭐</span>
                      <span>Featured</span>
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-4">
                  {/* Badge and Icon */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-xl">
                        {offer.icon}
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-wider text-amber-600">
                          {offer.badge}
                        </div>
                        <div className="text-xl font-black text-gray-900">
                          {offer.discount}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-gray-400 uppercase font-bold">Valid till</div>
                      <div className="text-xs font-bold text-gray-700">{offer.validUntil}</div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {offer.description}
                  </p>

                  {/* Terms */}
                  <div className="mb-3 p-2 bg-gray-50 rounded-lg">
                    <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Terms Apply</div>
                    <div className="text-xs text-gray-600">{offer.terms}</div>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-3">
                    <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Promo Code</div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 px-2 py-1.5 bg-gray-100 rounded-lg font-mono text-sm font-bold text-gray-800">
                        {offer.code}
                      </code>
                      <button
                        onClick={() => handleCopyCode(offer.code)}
                        className="px-2 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                      >
                        {copiedCode === offer.code ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    <span>Book Now</span>
                    <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredOffers.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No offers found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
            Get Exclusive Offers First
          </h3>
          <p className="text-gray-300 mb-6">
            Subscribe to our newsletter and get early access to deals and discounts
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            No spam, unsubscribe anytime
          </p>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 left-8 z-50 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
      </button>
    </div>
  );
};

export default OffersPage;
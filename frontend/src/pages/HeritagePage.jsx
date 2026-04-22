import React, { useState } from 'react';

const HeritagePage = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const heritageSites = [
    {
      id: 1,
      name: "Taj Mahal",
      location: "Agra, Uttar Pradesh",
      era: "Mughal Era",
      yearBuilt: "1632-1653",
      description: "An ivory-white marble mausoleum, one of the Seven Wonders of the World and UNESCO World Heritage Site.",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
      region: "north",
      type: "monument",
      rating: 4.9,
      visitors: "8M+",
      bestTime: "Oct-Mar",
      unesco: true,
      featured: true
    },
    {
      id: 2,
      name: "Hawa Mahal",
      location: "Jaipur, Rajasthan",
      era: "Rajput Era",
      yearBuilt: "1799",
      description: "Palace of Winds with 953 small windows, designed for royal ladies to observe street festivals.",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
      region: "north",
      type: "palace",
      rating: 4.7,
      visitors: "5M+",
      bestTime: "Nov-Feb",
      unesco: false,
      featured: true
    },
    {
      id: 3,
      name: "Khajuraho Temples",
      location: "Madhya Pradesh",
      era: "Chandela Dynasty",
      yearBuilt: "950-1050",
      description: "Group of Hindu and Jain temples known for intricate erotic sculptures and architectural brilliance.",
      image: "https://images.unsplash.com/photo-1603206669266-2eaa4a06c232?w=800",
      region: "central",
      type: "temple",
      rating: 4.8,
      visitors: "3M+",
      bestTime: "Oct-Mar",
      unesco: true,
      featured: false
    },
    {
      id: 4,
      name: "Mysore Palace",
      location: "Mysore, Karnataka",
      era: "Wodeyar Dynasty",
      yearBuilt: "1912",
      description: "Magnificent palace showcasing Indo-Saracenic architecture, illuminated with 97,000 lights during festivals.",
      image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800",
      region: "south",
      type: "palace",
      rating: 4.8,
      visitors: "6M+",
      bestTime: "Sep-Oct",
      unesco: false,
      featured: true
    },
    {
      id: 5,
      name: "Ellora Caves",
      location: "Aurangabad, Maharashtra",
      era: "Rashtrakuta Dynasty",
      yearBuilt: "600-1000 CE",
      description: "Rock-cut cave complex representing Buddhism, Hinduism, and Jainism with stunning monolithic Kailasa temple.",
      image: "https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?w=800",
      region: "west",
      type: "cave",
      rating: 4.9,
      visitors: "4M+",
      bestTime: "Nov-Feb",
      unesco: true,
      featured: false
    },
    {
      id: 6,
      name: "Qutub Minar",
      location: "Delhi",
      era: "Delhi Sultanate",
      yearBuilt: "1193",
      description: "World's tallest brick minaret, standing at 73 meters with intricate carvings and inscriptions.",
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886707?w=800",
      region: "north",
      type: "monument",
      rating: 4.6,
      visitors: "7M+",
      bestTime: "Oct-Mar",
      unesco: true,
      featured: false
    },
    {
      id: 7,
      name: "Hampi Ruins",
      location: "Karnataka",
      era: "Vijayanagara Empire",
      yearBuilt: "1336-1565",
      description: "Ancient city ruins with over 500 monuments, temples, and structures spread across vast landscape.",
      image: "https://images.unsplash.com/photo-1603206669266-2eaa4a06c232?w=800",
      region: "south",
      type: "ruins",
      rating: 4.8,
      visitors: "3M+",
      bestTime: "Oct-Mar",
      unesco: true,
      featured: true
    },
    {
      id: 8,
      name: "Konark Sun Temple",
      location: "Odisha",
      era: "Eastern Ganga Dynasty",
      yearBuilt: "1250",
      description: "Chariot-shaped temple dedicated to Sun God, with 24 intricately carved wheels and stone horses.",
      image: "https://images.unsplash.com/photo-1614274431433-7de0c96fde7a?w=800",
      region: "east",
      type: "temple",
      rating: 4.7,
      visitors: "2M+",
      bestTime: "Oct-Feb",
      unesco: true,
      featured: false
    },
    {
      id: 9,
      name: "Amber Fort",
      location: "Jaipur, Rajasthan",
      era: "Rajput Era",
      yearBuilt: "1592",
      description: "Majestic fort with Hindu and Mughal architecture, known for its artistic mirror work and elephant rides.",
      image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800",
      region: "north",
      type: "fort",
      rating: 4.8,
      visitors: "5M+",
      bestTime: "Nov-Feb",
      unesco: true,
      featured: false
    }
  ];

  const regions = [
    { id: "all", name: "All Regions", icon: "🇮🇳" },
    { id: "north", name: "North India", icon: "🏔️" },
    { id: "south", name: "South India", icon: "🌴" },
    { id: "east", name: "East India", icon: "🏞️" },
    { id: "west", name: "West India", icon: "🌊" },
    { id: "central", name: "Central India", icon: "🗿" }
  ];

  const types = [
    { id: "all", name: "All Types", icon: "🏛️" },
    { id: "monument", name: "Monuments", icon: "🗼" },
    { id: "temple", name: "Temples", icon: "🛕" },
    { id: "palace", name: "Palaces", icon: "🏰" },
    { id: "fort", name: "Forts", icon: "🏯" },
    { id: "cave", name: "Caves", icon: "🪨" },
    { id: "ruins", name: "Ruins", icon: "🏚️" }
  ];

  const filteredSites = heritageSites.filter(site => {
    if (selectedRegion !== 'all' && site.region !== selectedRegion) return false;
    if (selectedType !== 'all' && site.type !== selectedType) return false;
    return true;
  });

  const featuredSites = heritageSites.filter(site => site.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-12 px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 21v-4H7v4"></path>
            </svg>
            India's Rich Heritage
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
            Explore India's{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              Timeless Heritage
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover magnificent monuments, ancient temples, and architectural marvels that tell the story of India's glorious past
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-black text-amber-600">40+</div>
              <div className="text-xs text-gray-500">UNESCO Sites</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-amber-600">2000+</div>
              <div className="text-xs text-gray-500">Years of History</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-amber-600">50M+</div>
              <div className="text-xs text-gray-500">Annual Visitors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Heritage Sites */}
      <section className="px-6 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 mb-2">
              Featured Heritage Sites
            </h2>
            <p className="text-gray-600">Must-visit landmarks that define India's cultural legacy</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSites.slice(0, 3).map((site) => (
              <div
                key={site.id}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* UNESCO Badge */}
                  {site.unesco && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-500 text-white text-[10px] font-black uppercase rounded-full shadow-lg">
                        <span>🏛️</span>
                        <span>UNESCO World Heritage</span>
                      </div>
                    </div>
                  )}
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs">
                      <span>⭐</span>
                      <span className="font-bold">{site.rating}</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-black text-white mb-1">{site.name}</h3>
                    <p className="text-amber-400 text-sm font-semibold mb-2">{site.location}</p>
                    <p className="text-white/90 text-sm line-clamp-2">{site.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex flex-wrap gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-amber-600 mb-2">
                    Region
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {regions.map((region) => (
                      <button
                        key={region.id}
                        onClick={() => setSelectedRegion(region.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                          selectedRegion === region.id
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-amber-100'
                        }`}
                      >
                        <span>{region.icon}</span>
                        <span>{region.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-wider text-amber-600 mb-2">
                    Heritage Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {types.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                          selectedType === type.id
                            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-amber-100'
                        }`}
                      >
                        <span>{type.icon}</span>
                        <span>{type.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Sites Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">
                Discover Heritage Sites
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {filteredSites.length} heritage sites found
              </p>
            </div>
          </div>

          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            : "space-y-6"
          }>
            {filteredSites.map((site) => (
              <div
                key={site.id}
                className={`group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
                  viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'md:w-72 h-56 md:h-auto' : 'h-56'}`}>
                  <img
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {site.unesco && (
                    <div className="absolute top-2 left-2">
                      <div className="px-2 py-1 bg-amber-500 text-white text-[8px] font-black uppercase rounded shadow-lg">
                        UNESCO
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 mb-1">
                        {site.name}
                      </h3>
                      <p className="text-sm text-gray-500">{site.location}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-amber-500">⭐</span>
                      <span className="text-sm font-bold">{site.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-semibold text-gray-600">
                      {site.era}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-semibold text-gray-600">
                      Built: {site.yearBuilt}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-semibold text-gray-600">
                      🕒 {site.bestTime}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {site.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span className="font-bold">{site.visitors}</span> visitors/year
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-lg hover:shadow-lg transition-all">
                      Explore Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSites.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No heritage sites found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Heritage Travel Tips */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900 mb-2">
                Heritage Travel Tips
              </h2>
              <p className="text-gray-600">Make the most of your heritage exploration</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">📅</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Best Time to Visit</h3>
                  <p className="text-sm text-gray-600">October to March offers pleasant weather for exploring heritage sites</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">🎫</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Book in Advance</h3>
                  <p className="text-sm text-gray-600">Get skip-the-line tickets online to avoid long queues</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-lg">📸</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Photography Tips</h3>
                  <p className="text-sm text-gray-600">Early morning and golden hour offer the best lighting for photos</p>
                </div>
              </div>
            </div>
          </div>
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

export default HeritagePage;
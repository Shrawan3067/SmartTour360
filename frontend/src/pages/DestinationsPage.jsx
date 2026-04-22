import React, { useState } from 'react';

const DestinationsPage = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedSafety, setSelectedSafety] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [compareList, setCompareList] = useState([]);

  const destinations = [
    {
      id: 1,
      name: "Leh Ladakh",
      description: "High Altitude • Adventure",
      price: "₹12,499",
      carbon: "120kg",
      duration: "5D / 4N",
      safety: "Green Flag 99%",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBW1RzLA8tVGBzDA-OgKeSLDFUuIttUTisj1OBfcJUQMsd7hW3B7NXtpTnm24dHa0PBzrC1OmtTcsxStPF8YLug87RgdCGT0xP9jVhwZnNDdtsAduf6z2vH72TPNvuZkDgLKoT3ztx5VctUDs3M_OpgJZRu5FHw5h6Por3B_IyeVdR6shmY748-_ZK_WuYdTos3mzy8xX0xPHHnXuUOO-sPryTzUPJOIRR7d_LZlVav9nsRyQxhFkMGsI6Q5aJQQfJ3svpfFP8TwQE",
      region: "north",
      experience: "adventure",
      verified: true
    },
    {
      id: 2,
      name: "Varanasi",
      description: "Spiritual • Heritage",
      price: "₹4,100",
      carbon: "85kg",
      duration: "3D / 2N",
      safety: "Green Flag 98%",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjbFm9_4E8BL2p656wbtEEEfnj53wHKof__3Q8Da7RZ03oJLlMCLCkp72I221447iAlQySRmLU3_xPoagQlX_9T0aiGDmAo4fmmvytZuc5UvNbLnVLbGVvCJctpwVjTvoZ-nWmQEqTdUZxbRsVt_kZSZIK2k1xmdObAfW5esi-NudYDFzgaa_1NRous_ZRl_PoFiP_UE_xGv3iiZzuixn35Eio5MLgzrZQ4VSm9J3ncdXNJX3uNJELwQOAm-lBlKnyZ4HXyEsaC2Y",
      region: "north",
      experience: "spiritual",
      verified: true
    },
    {
      id: 3,
      name: "South Goa",
      description: "Coastal • Relaxation",
      price: "₹7,800",
      carbon: "110kg",
      duration: "4D / 3N",
      safety: "Green Flag 97%",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDa05nNJcZ62ljkblHa6o6OKicX1sEM-52UpCbbzw7VkLvfE6pXor74aDN0CPh8bLYl7Nuvk0A-eIGAXtJl5vIM36HXhqPVB50fFuZmvFAfGFuzqbYa6lYgCgLqYmcBZ8TeqIm8-_Jt0lL69obYTjkG-IqjL9TlyI7rRbe_FDz4Z-lM79A_SCYGID01Ze5SGiOGUpBzrrBac0pL_n4ZRrg3I-YHqoB1LtzIRKNf_BjtxvCrcDkc-eButGs5RM1Quh1KoQDdOA4fU40",
      region: "south",
      experience: "coastal",
      verified: true
    },
    {
      id: 4,
      name: "Jaipur",
      description: "Heritage • Architecture",
      price: "₹5,500",
      carbon: "92kg",
      duration: "3D / 2N",
      safety: "Green Flag 99%",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz9tWPwrvdb4OZCpnxqYPTW_4nqvdLzm8768FsMEsV9Ul_Mdz6l2mHEIwfprF0OE-gOMtIBxmyQKYcyzq7YHo8CR_hEcreDbonMyOcqvfUJu5Yw2e05xSbGV6H5vGfpkxG8FvNs0JuJR0xrqFGmTFi58-W6wqK8c757_Y93KxFtg8oklZSi7UdaV_DnaE3AeQwvz9afT8DlqZ0Y4S29ECQzR6lrmmgY8PTE_emdrUvgF273OCKV9VR0vaueycgDavDnNvFs-cOhE4",
      region: "north",
      experience: "heritage",
      verified: true
    },
    {
      id: 5,
      name: "Munnar",
      description: "Nature • Wellness",
      price: "₹6,200",
      carbon: "70kg",
      duration: "4D / 3N",
      safety: "Green Flag 96%",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHIv1tHQ9GNgBetABxByRu0mwsYtV1IMmMgu1InwoaruxF1WfKI2MJTgkTPY2FSpaFkaKj3zaqr7fw8MB3zfC8JWw-5EA1JVuaNtLBlMu1brdi-mXbxWm9VCcT-6NlRlvvUjiMQl7gWKowA86MMu5fMFQ8qMB0d8LrKf4Qj1cNzowh1NcFPg9OH4IPkVmMvCQ5JeBISPCB8W4aQ3zXwRXnyFp8VKwoVndYq8WlgK6Wun7TB4rkpN3BLhdv1BJNSsfxAricpF2WN4A",
      region: "south",
      experience: "nature",
      verified: true
    },
    {
      id: 6,
      name: "Ayodhya",
      description: "Sacred • Heritage",
      price: "₹4,599",
      carbon: "65kg",
      duration: "2D / 1N",
      safety: "Green Flag 98%",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8UtIld7-dVlmut9feA6fVPcx4XxjexPO5XJvezaHbTtVE1fXMjbXN4fseCEsukiZFxjdYLQIbCxQuPf690O4sesMZtklYRiO92425yk-cmGU0aNYB9o3sDPjxNy7A0purOdx1FaJytKEwb68R4L0-JCUiehd7SRvzlO0aP_YQxTwV_uxKPb3MPIv1HLoc1FO8r_tQcTujYaxfAeupfYRnTOx8JKe6I4kLlK53P1sme1QEXxxZeIoBy9ZyjVz3eJgZekSgK2nsHvk",
      region: "north",
      experience: "spiritual",
      verified: true
    }
  ];

  const handleCompare = (destinationId) => {
    if (compareList.includes(destinationId)) {
      setCompareList(compareList.filter(id => id !== destinationId));
    } else if (compareList.length < 4) {
      setCompareList([...compareList, destinationId]);
    }
  };

  const filteredDestinations = destinations.filter(dest => {
    if (selectedRegion !== 'all' && dest.region !== selectedRegion) return false;
    if (selectedSafety !== 'all' && dest.safety !== selectedSafety) return false;
    if (selectedExperience !== 'all' && dest.experience !== selectedExperience) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pt-20">
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            Discover Your Next Adventure
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
            FIND YOUR NEXT{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              ESCAPE
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            AI-Driven Exploration with Immutable Verification. Discover India's most loved destinations.
          </p>
        </div>
      </section>

      {/* Filter Panel */}
      <section className="px-6 md:px-12 mb-16">
        <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-amber-600 mb-2">
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              >
                <option value="all">All Regions</option>
                <option value="north">North India</option>
                <option value="south">South India</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-amber-600 mb-2">
                Safety Level
              </label>
              <select
                value={selectedSafety}
                onChange={(e) => setSelectedSafety(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              >
                <option value="all">Any Level</option>
                <option value="Green Flag 99%">Green Flag (Safe)</option>
                <option value="Green Flag 98%">Yellow Flag (Caution)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-amber-600 mb-2">
                Experience
              </label>
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
              >
                <option value="all">All Experiences</option>
                <option value="spiritual">Spiritual</option>
                <option value="adventure">Adventure</option>
                <option value="heritage">Heritage</option>
                <option value="nature">Nature</option>
                <option value="coastal">Coastal</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="px-6 md:px-12 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Results Count */}
          <div className="mb-8 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing <span className="font-bold text-amber-600">{filteredDestinations.length}</span> destinations
            </p>
            {compareList.length > 0 && (
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors">
                Compare ({compareList.length}) Items
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    alt={dest.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={dest.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  {/* Safety Badge */}
                  <div className="absolute top-2 left-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                      <span>{dest.safety}</span>
                    </div>
                  </div>

                  {/* Blockchain Verified Badge */}
                  {dest.verified && (
                    <div className="absolute bottom-2 right-2">
                      <div className="bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                        Blockchain Verified
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-black uppercase tracking-tight mb-1 text-gray-900">
                        {dest.name}
                      </h3>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                        {dest.description}
                      </p>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer group/check">
                      <input
                        type="checkbox"
                        checked={compareList.includes(dest.id)}
                        onChange={() => handleCompare(dest.id)}
                        className="w-5 h-5 rounded border-2 border-gray-300 text-amber-500 focus:ring-amber-500 cursor-pointer"
                      />
                      <span className="text-[10px] font-black uppercase text-gray-400 group-hover/check:text-amber-600">
                        Compare
                      </span>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <span className="text-[10px] font-black text-gray-400 block uppercase mb-1">Price</span>
                      <span className="font-extrabold text-lg text-gray-900">{dest.price}</span>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <span className="text-[10px] font-black text-gray-400 block uppercase mb-1">Carbon</span>
                      <span className="font-extrabold text-lg text-emerald-600">{dest.carbon}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      {dest.duration}
                    </span>
                    <button className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg text-xs uppercase tracking-wider hover:shadow-lg transition-all duration-300">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
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

export default DestinationsPage;
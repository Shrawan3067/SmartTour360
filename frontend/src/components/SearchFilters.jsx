import React from 'react';

/**
 * Search Filters Component
 * Provides filtering and sorting options for booking results
 */
const SearchFilters = ({ filters, onFilterChange, onSortChange, onReset }) => {
  const filterOptions = {
    price: [
      { label: 'All Prices', value: 'all' },
      { label: 'Under ₹5,000', value: '0-5000' },
      { label: '₹5,000 - ₹10,000', value: '5000-10000' },
      { label: '₹10,000 - ₹20,000', value: '10000-20000' },
      { label: 'Above ₹20,000', value: '20000+' },
    ],
    duration: [
      { label: 'All Durations', value: 'all' },
      { label: '1-3 Days', value: '1-3' },
      { label: '4-7 Days', value: '4-7' },
      { label: '8+ Days', value: '8+' },
    ],
    rating: [
      { label: 'All Ratings', value: 'all' },
      { label: '4.5+ Stars', value: '4.5' },
      { label: '4.0+ Stars', value: '4.0' },
      { label: '3.5+ Stars', value: '3.5' },
    ],
    stops: [
      { label: 'All', value: 'all' },
      { label: 'Non-stop', value: '0' },
      { label: '1 Stop', value: '1' },
      { label: '2+ Stops', value: '2+' },
    ],
    departure: [
      { label: 'Any Time', value: 'all' },
      { label: 'Morning (6AM-12PM)', value: 'morning' },
      { label: 'Afternoon (12PM-6PM)', value: 'afternoon' },
      { label: 'Evening (6PM-12AM)', value: 'evening' },
      { label: 'Night (12AM-6AM)', value: 'night' },
    ],
  };

  const sortOptions = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Duration: Shortest First', value: 'duration-asc' },
    { label: 'Duration: Longest First', value: 'duration-desc' },
    { label: 'Rating: Highest First', value: 'rating-desc' },
    { label: 'Departure: Earliest First', value: 'departure-asc' },
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange({ ...filters, [filterType]: value });
  };

  const handleSortChange = (value) => {
    onSortChange(value);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-900">Filters</h3>
        <button
          onClick={onReset}
          className="text-sm text-orange-600 hover:text-orange-700 font-semibold"
        >
          Reset All
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Price Range</label>
        <select
          value={filters.price || 'all'}
          onChange={(e) => handleFilterChange('price', e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        >
          {filterOptions.price.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Duration */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
        <select
          value={filters.duration || 'all'}
          onChange={(e) => handleFilterChange('duration', e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        >
          {filterOptions.duration.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Rating</label>
        <select
          value={filters.rating || 'all'}
          onChange={(e) => handleFilterChange('rating', e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        >
          {filterOptions.rating.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Stops (for flights) */}
      {filters.type === 'flight' && (
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Stops</label>
          <select
            value={filters.stops || 'all'}
            onChange={(e) => handleFilterChange('stops', e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          >
            {filterOptions.stops.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      )}

      {/* Departure Time */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Time</label>
        <select
          value={filters.departure || 'all'}
          onChange={(e) => handleFilterChange('departure', e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        >
          {filterOptions.departure.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div className="pt-4 border-t border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
        <select
          value={filters.sortBy || 'recommended'}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchFilters;

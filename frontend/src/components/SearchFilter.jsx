import React, { useState } from 'react';

// Search Component
export const SearchBar = ({ onSearch, placeholder = 'Search destinations...' }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
      />
      <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
};

// Filter Component
export const FilterPanel = ({ onFilterChange, filters = {} }) => {
  const [selectedFilters, setSelectedFilters] = useState(filters);

  const handleFilterChange = (category, value) => {
    const newFilters = { ...selectedFilters, [category]: value };
    setSelectedFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleMultiSelect = (category, value) => {
    const currentValues = selectedFilters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    handleFilterChange(category, newValues);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    if (onFilterChange) {
      onFilterChange({});
    }
  };

  const filterCategories = [
    {
      id: 'priceRange',
      title: 'Price Range',
      type: 'range',
      options: [
        { label: 'Under ₹5,000', value: '0-5000' },
        { label: '₹5,000 - ₹10,000', value: '5000-10000' },
        { label: '₹10,000 - ₹20,000', value: '10000-20000' },
        { label: '₹20,000+', value: '20000+' }
      ]
    },
    {
      id: 'duration',
      title: 'Duration',
      type: 'select',
      options: [
        { label: '1-3 Days', value: '1-3' },
        { label: '4-7 Days', value: '4-7' },
        { label: '8-14 Days', value: '8-14' },
        { label: '15+ Days', value: '15+' }
      ]
    },
    {
      id: 'category',
      title: 'Category',
      type: 'multi',
      options: [
        { label: 'Heritage Sites', value: 'heritage' },
        { label: 'Adventure', value: 'adventure' },
        { label: 'Cultural Tours', value: 'cultural' },
        { label: 'Nature', value: 'nature' },
        { label: 'Spiritual', value: 'spiritual' }
      ]
    },
    {
      id: 'rating',
      title: 'Rating',
      type: 'select',
      options: [
        { label: '4+ Stars', value: '4' },
        { label: '3+ Stars', value: '3' },
        { label: '2+ Stars', value: '2' }
      ]
    },
    {
      id: 'ecoFriendly',
      title: 'Sustainability',
      type: 'toggle',
      options: [
        { label: 'Eco-Friendly Only', value: 'eco' }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-amber-600 hover:text-amber-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {filterCategories.map((category) => (
          <div key={category.id}>
            <h4 className="font-medium text-gray-900 mb-3">{category.title}</h4>
            
            {category.type === 'range' && (
              <div className="space-y-2">
                {category.options.map((option) => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={category.id}
                      value={option.value}
                      checked={selectedFilters[category.id] === option.value}
                      onChange={() => handleFilterChange(category.id, option.value)}
                      className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-sm text-gray-600">{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {category.type === 'select' && (
              <div className="space-y-2">
                {category.options.map((option) => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={category.id}
                      value={option.value}
                      checked={selectedFilters[category.id] === option.value}
                      onChange={() => handleFilterChange(category.id, option.value)}
                      className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-sm text-gray-600">{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {category.type === 'multi' && (
              <div className="space-y-2">
                {category.options.map((option) => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(selectedFilters[category.id] || []).includes(option.value)}
                      onChange={() => handleMultiSelect(category.id, option.value)}
                      className="w-4 h-4 text-amber-600 focus:ring-amber-500 rounded"
                    />
                    <span className="text-sm text-gray-600">{option.label}</span>
                  </label>
                ))}
              </div>
            )}

            {category.type === 'toggle' && (
              <div className="space-y-2">
                {category.options.map((option) => (
                  <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters[category.id] === option.value}
                      onChange={(e) => handleFilterChange(category.id, e.target.checked ? option.value : null)}
                      className="w-4 h-4 text-amber-600 focus:ring-amber-500 rounded"
                    />
                    <span className="text-sm text-gray-600">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => onFilterChange && onFilterChange(selectedFilters)}
        className="w-full mt-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
      >
        Apply Filters
      </button>
    </div>
  );
};

// Sort Component
export const SortOptions = ({ onSortChange, currentSort }) => {
  const sortOptions = [
    { label: 'Recommended', value: 'recommended' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Rating: High to Low', value: 'rating-desc' },
    { label: 'Duration: Short to Long', value: 'duration-asc' },
    { label: 'Duration: Long to Short', value: 'duration-desc' }
  ];

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-gray-700">Sort by:</span>
      <select
        value={currentSort || 'recommended'}
        onChange={(e) => onSortChange && onSortChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

// Active Filters Display
export const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  const activeFiltersCount = Object.keys(filters).filter(key => filters[key]).length;

  if (activeFiltersCount === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {Object.entries(filters).map(([category, value]) => {
        if (!value) return null;

        const getCategoryLabel = (cat) => {
          const labels = {
            priceRange: 'Price',
            duration: 'Duration',
            category: 'Category',
            rating: 'Rating',
            ecoFriendly: 'Eco-Friendly'
          };
          return labels[cat] || cat;
        };

        const getValueLabel = (val) => {
          if (Array.isArray(val)) {
            return val.join(', ');
          }
          return val;
        };

        return (
          <div
            key={category}
            className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm"
          >
            <span>{getCategoryLabel(category)}: {getValueLabel(value)}</span>
            <button
              onClick={() => onRemoveFilter && onRemoveFilter(category)}
              className="hover:text-amber-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        );
      })}
      
      {onClearAll && (
        <button
          onClick={onClearAll}
          className="text-sm text-gray-600 hover:text-gray-900 font-medium"
        >
          Clear All
        </button>
      )}
    </div>
  );
};

// Combined Search and Filter Component
export const SearchFilterSection = ({ onSearch, onFilter, onSort }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('recommended');

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query, filters, sort);
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    if (onFilter) {
      onFilter(searchQuery, newFilters, sort);
    }
  };

  const handleSort = (newSort) => {
    setSort(newSort);
    if (onSort) {
      onSort(searchQuery, filters, newSort);
    }
  };

  return (
    <div className="space-y-6">
      <SearchBar onSearch={handleSearch} placeholder="Search destinations, experiences, or activities..." />
      
      <div className="flex items-center justify-between">
        <ActiveFilters
          filters={filters}
          onRemoveFilter={(category) => {
            const newFilters = { ...filters };
            delete newFilters[category];
            handleFilter(newFilters);
          }}
          onClearAll={() => handleFilter({})}
        />
        <SortOptions currentSort={sort} onSortChange={handleSort} />
      </div>
    </div>
  );
};

export default SearchFilterSection;

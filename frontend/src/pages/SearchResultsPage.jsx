import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FilterPanel, SortOptions, ActiveFilters } from '../components/SearchFilter';
import apiService from '../services/api';
import { WishlistButton } from '../components/Wishlist';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const searchType = searchParams.get('type') || 'destinations';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';
  const passengers = parseInt(searchParams.get('passengers')) || 1;
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState('recommended');

  useEffect(() => {
    loadResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, searchType, from, to, date, passengers]);

  const loadResults = async () => {
    setIsLoading(true);
    try {
      console.log('Loading results with params:', { searchType, from, to, date, passengers, query });
      let data;
      if (searchType === 'flights') {
        data = await apiService.searchFlights({ from, to, date, passengers });
        console.log('Flights API response:', data);
        setResults(data.flights || []);
      } else if (searchType === 'trains') {
        data = await apiService.searchTrains({ from, to, date, passengers });
        console.log('Trains API response:', data);
        setResults(data.trains || []);
      } else if (searchType === 'buses') {
        data = await apiService.searchBuses({ from, to, date, passengers });
        console.log('Buses API response:', data);
        setResults(data.buses || []);
      } else {
        data = await apiService.searchDestinations(query, filters);
        console.log('Destinations API response:', data);
        setResults(data.destinations || []);
      }
      console.log('Results set:', data);
    } catch (error) {
      console.error('Error loading search results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {searchType === 'flights' ? 'Flight Search Results' : 
                 searchType === 'trains' ? 'Train Search Results' : 
                 searchType === 'buses' ? 'Bus Search Results' : 
                 'Search Results'}
              </h1>
              <p className="text-gray-600">
                {searchType !== 'destinations' ? `${from} → ${to} | ${date} | ${passengers} passenger(s)` : 
                 `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel
              filters={filters}
              onFilterChange={(newFilters) => {
                setFilters(newFilters);
                loadResults();
              }}
            />
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <ActiveFilters
                filters={filters}
                onRemoveFilter={(category) => {
                  const newFilters = { ...filters };
                  delete newFilters[category];
                  setFilters(newFilters);
                  loadResults();
                }}
                onClearAll={() => {
                  setFilters({});
                  loadResults();
                }}
              />
              <SortOptions
                currentSort={sort}
                onSortChange={(newSort) => {
                  setSort(newSort);
                  // Apply sorting logic
                }}
              />
            </div>

            {results.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <button
                  onClick={() => {
                    if (searchType === 'flights') navigate('/flight-booking');
                    else if (searchType === 'trains') navigate('/train-booking');
                    else if (searchType === 'buses') navigate('/bus-booking');
                    else navigate('/destinations');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  {searchType === 'flights' ? 'Search Flights' : 
                   searchType === 'trains' ? 'Search Trains' : 
                   searchType === 'buses' ? 'Search Buses' : 
                   'Browse All Destinations'}
                </button>
              </div>
            ) : searchType === 'flights' ? (
              <div className="space-y-4">
                {results.map((flight) => (
                  <div
                    key={flight.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="text-3xl">✈️</div>
                        <div>
                          <h3 className="font-bold text-gray-900">{flight.airline}</h3>
                          <p className="text-sm text-gray-600">{flight.flightNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{flight.departureTime}</p>
                          <p className="text-sm text-gray-600">{flight.from}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">{flight.duration}</p>
                          <div className="w-32 h-0.5 bg-gray-300 relative">
                            <div className="absolute inset-0 bg-amber-500"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-500">✈</div>
                          </div>
                          <p className="text-sm text-gray-500">{flight.stops}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{flight.arrivalTime}</p>
                          <p className="text-sm text-gray-600">{flight.to}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-amber-600">₹{flight.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{flight.class}</p>
                        <p className="text-xs text-gray-400">{flight.availableSeats} seats available</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>🛫 {flight.aircraft}</span>
                      </div>
                      <button
                        onClick={() => navigate('/flight-booking', {
                          state: {
                            selectedFlight: flight,
                            searchParams: { from, to, date, passengers }
                          }
                        })}
                        className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
                      >
                        Select Flight
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchType === 'trains' ? (
              <div className="space-y-4">
                {results.map((train) => (
                  <div
                    key={train.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="text-3xl">🚂</div>
                        <div>
                          <h3 className="font-bold text-gray-900">{train.trainName}</h3>
                          <p className="text-sm text-gray-600">{train.trainNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{train.departureTime}</p>
                          <p className="text-sm text-gray-600">{train.from}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">{train.duration}</p>
                          <div className="w-32 h-0.5 bg-gray-300 relative">
                            <div className="absolute inset-0 bg-amber-500"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-500">🚂</div>
                          </div>
                          <p className="text-sm text-gray-500">{train.type}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{train.arrivalTime}</p>
                          <p className="text-sm text-gray-600">{train.to}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-amber-600">₹{train.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{train.class}</p>
                        <p className="text-xs text-gray-400">{train.availableSeats} seats available</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>📅 {train.days.join(', ')}</span>
                      </div>
                      <button
                        onClick={() => navigate('/train-booking', {
                          state: {
                            selectedTrain: train,
                            searchParams: { from, to, date, passengers }
                          }
                        })}
                        className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
                      >
                        Select Train
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchType === 'buses' ? (
              <div className="space-y-4">
                {results.map((bus) => (
                  <div
                    key={bus.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="text-3xl">🚌</div>
                        <div>
                          <h3 className="font-bold text-gray-900">{bus.operator}</h3>
                          <p className="text-sm text-gray-600">{bus.busType}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{bus.departureTime}</p>
                          <p className="text-sm text-gray-600">{bus.from}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">{bus.duration}</p>
                          <div className="w-32 h-0.5 bg-gray-300 relative">
                            <div className="absolute inset-0 bg-amber-500"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amber-500">🚌</div>
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{bus.arrivalTime}</p>
                          <p className="text-sm text-gray-600">{bus.to}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl font-bold text-amber-600">₹{bus.price.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{bus.class}</p>
                        <p className="text-xs text-gray-400">{bus.availableSeats} seats available</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 flex-wrap">
                          {bus.amenities.map((amenity, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                              {amenity}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => navigate('/bus-booking', {
                            state: {
                              selectedBus: bus,
                              searchParams: { from, to, date, passengers }
                            }
                          })}
                          className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
                        >
                          Select Bus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((destination) => (
                  <div
                    key={destination.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center text-6xl">
                        🗺️
                      </div>
                      <div className="absolute top-4 right-4">
                        <WishlistButton destinationId={destination.id} size="md" />
                      </div>
                      <div className="absolute bottom-4 left-4 px-3 py-1 bg-white rounded-full text-sm font-medium">
                        {destination.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2">{destination.name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{destination.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span>📅 {destination.duration}</span>
                        <span>🌱 {destination.carbon}</span>
                        <span>⭐ {destination.rating}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-600">{destination.price}</span>
                        <button
                          onClick={() => navigate(`/booking/${destination.id}`)}
                          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:shadow-lg transition-all"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;

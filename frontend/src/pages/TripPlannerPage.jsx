import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';

const TripPlannerPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    budget: '',
    interests: []
  });
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [itinerary, setItinerary] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  const interests = [
    { id: 'heritage', label: 'Heritage Sites', icon: '🏛️' },
    { id: 'adventure', label: 'Adventure', icon: '🏔️' },
    { id: 'cultural', label: 'Cultural', icon: '🎭' },
    { id: 'nature', label: 'Nature', icon: '🌿' },
    { id: 'spiritual', label: 'Spiritual', icon: '🙏' },
    { id: 'food', label: 'Food & Cuisine', icon: '🍜' },
    { id: 'photography', label: 'Photography', icon: '📷' },
    { id: 'relaxation', label: 'Relaxation', icon: '🧘' }
  ];

  const sampleDestinations = [
    { id: 1, name: 'Taj Mahal', location: 'Agra', duration: '1 day', price: '₹5,000', category: 'heritage' },
    { id: 2, name: 'Jaipur City Tour', location: 'Jaipur', duration: '2 days', price: '₹8,000', category: 'cultural' },
    { id: 3, name: 'Varanasi Spiritual', location: 'Varanasi', duration: '2 days', price: '₹7,000', category: 'spiritual' },
    { id: 4, name: 'Kerala Backwaters', location: 'Kerala', duration: '3 days', price: '₹15,000', category: 'nature' },
    { id: 5, name: 'Goa Beach', location: 'Goa', duration: '3 days', price: '₹12,000', category: 'relaxation' },
    { id: 6, name: 'Himalayan Trek', location: 'Manali', duration: '4 days', price: '₹18,000', category: 'adventure' }
  ];

  const handleInterestToggle = (interestId) => {
    setTripData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleDestinationToggle = (destination) => {
    setSelectedDestinations(prev => {
      const exists = prev.find(d => d.id === destination.id);
      if (exists) {
        return prev.filter(d => d.id !== destination.id);
      }
      return [...prev, destination];
    });
  };

  const calculateTotal = () => {
    return selectedDestinations.reduce((sum, dest) => {
      const price = parseInt(dest.price.replace(/[^0-9]/g, ''));
      return sum + (price * tripData.travelers);
    }, 0);
  };

  const generateItinerary = () => {
    const generated = selectedDestinations.map((dest, index) => ({
      day: index + 1,
      destination: dest.name,
      location: dest.location,
      duration: dest.duration,
      activities: ['Morning exploration', 'Local lunch', 'Evening sightseeing']
    }));
    setItinerary(generated);
    setStep(4);
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === dropIndex) return;

    const newItinerary = [...itinerary];
    const [removed] = newItinerary.splice(draggedItem, 1);
    newItinerary.splice(dropIndex, 0, removed);
    
    setItinerary(newItinerary);
    setDraggedItem(null);
  };

  const handleAddActivity = (dayIndex, activity) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].activities.push(activity);
    setItinerary(newItinerary);
  };

  const handleRemoveActivity = (dayIndex, activityIndex) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].activities.splice(activityIndex, 1);
    setItinerary(newItinerary);
  };

  const handleSaveTrip = async () => {
    if (!isAuthenticated) {
      navigate('/signin');
      return;
    }

    setIsSaving(true);
    try {
      const result = await apiService.saveItinerary({
        userId: user.id,
        ...tripData,
        destinations: selectedDestinations,
        itinerary,
        totalPrice: calculateTotal()
      });

      if (result.success) {
        alert('Trip saved successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error saving trip:', error);
      alert('Failed to save trip. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Trip Planner</h1>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Create your perfect itinerary with our intelligent trip planner
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3, 4].map((stepNum) => (
            <React.Fragment key={stepNum}>
              <div className={`flex items-center ${stepNum < 4 ? 'flex-1' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= stepNum
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNum ? '✓' : stepNum}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step >= stepNum ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {stepNum === 1 ? 'Basics' : stepNum === 2 ? 'Interests' : stepNum === 3 ? 'Destinations' : 'Itinerary'}
                </span>
              </div>
              {stepNum < 4 && (
                <div className={`flex-1 h-1 mx-4 ${
                  step > stepNum ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              {step === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Trip Basics</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Trip Name *</label>
                      <input
                        type="text"
                        value={tripData.name}
                        onChange={(e) => setTripData({ ...tripData, name: e.target.value })}
                        placeholder="My Dream Vacation"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                        <input
                          type="date"
                          value={tripData.startDate}
                          onChange={(e) => setTripData({ ...tripData, startDate: e.target.value })}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                        <input
                          type="date"
                          value={tripData.endDate}
                          onChange={(e) => setTripData({ ...tripData, endDate: e.target.value })}
                          min={tripData.startDate}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travelers *</label>
                        <select
                          value={tripData.travelers}
                          onChange={(e) => setTripData({ ...tripData, travelers: parseInt(e.target.value) })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          required
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget (Optional)</label>
                        <input
                          type="number"
                          value={tripData.budget}
                          onChange={(e) => setTripData({ ...tripData, budget: e.target.value })}
                          placeholder="50000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    Continue to Interests
                  </button>
                </form>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Select Your Interests</h2>
                  <p className="text-gray-600 mb-6">Choose what you are interested in to help us recommend the best destinations</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {interests.map((interest) => (
                      <button
                        key={interest.id}
                        onClick={() => handleInterestToggle(interest.id)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          tripData.interests.includes(interest.id)
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{interest.icon}</div>
                        <span className="text-sm font-medium">{interest.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={tripData.interests.length === 0}
                      className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue to Destinations
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Select Destinations</h2>
                  <p className="text-gray-600 mb-6">Choose destinations that match your interests</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {sampleDestinations.map((destination) => (
                      <div
                        key={destination.id}
                        onClick={() => handleDestinationToggle(destination)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedDestinations.find(d => d.id === destination.id)
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900">{destination.name}</h3>
                            <p className="text-sm text-gray-600">{destination.location}</p>
                            <div className="flex items-center gap-2 mt-2 text-sm">
                              <span className="text-gray-500">📅 {destination.duration}</span>
                              <span className="font-bold text-amber-600">{destination.price}</span>
                            </div>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedDestinations.find(d => d.id === destination.id)
                              ? 'border-amber-500 bg-amber-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedDestinations.find(d => d.id === destination.id) && (
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 py-4 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={generateItinerary}
                      disabled={selectedDestinations.length === 0}
                      className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Generate Itinerary
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Your Itinerary</h2>
                  <p className="text-gray-600 mb-6">Drag and drop to reorder your itinerary days</p>
                  
                  <div className="space-y-4 mb-6">
                    {itinerary.map((day, index) => (
                      <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, index)}
                        className={`bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200 cursor-move transition-all ${
                          draggedItem === index ? 'opacity-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-center font-bold">
                            {day.day}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900">{day.destination}</h3>
                            <p className="text-sm text-gray-600">{day.location}</p>
                            <div className="flex items-center gap-2 mt-2 text-sm">
                              <span className="text-gray-500">📅 {day.duration}</span>
                            </div>
                            <div className="mt-2 text-sm text-gray-600">
                              {day.activities.map((activity, actIndex) => (
                                <div key={actIndex} className="flex items-center justify-between group">
                                  <p>• {activity}</p>
                                  <button
                                    onClick={() => handleRemoveActivity(index, actIndex)}
                                    className="text-red-500 opacity-0 group-hover:opacity-100 text-xs"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={() => {
                                const activity = prompt('Add activity:');
                                if (activity) handleAddActivity(index, activity);
                              }}
                              className="mt-2 text-xs text-amber-600 hover:text-amber-700 font-medium"
                            >
                              + Add activity
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-4 border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSaveTrip}
                      disabled={isSaving}
                      className="flex-1 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? 'Saving...' : 'Save Trip'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
              <h3 className="font-bold text-gray-900 mb-4">Trip Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Trip Name</span>
                  <span className="font-medium">{tripData.name || 'Not set'}</span>
                </div>
                {tripData.startDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Dates</span>
                    <span className="font-medium">{tripData.startDate} - {tripData.endDate}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Travelers</span>
                  <span className="font-medium">{tripData.travelers}</span>
                </div>
                {tripData.budget && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium">₹{parseInt(tripData.budget).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Destinations</span>
                  <span className="font-medium">{selectedDestinations.length}</span>
                </div>
              </div>

              {selectedDestinations.length > 0 && (
                <>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Estimated Total</span>
                      <span className="font-bold text-amber-600 text-lg">
                        ₹{calculateTotal().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-green-50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">💡</div>
                      <div>
                        <p className="font-medium text-green-900 text-sm">Smart Suggestions</p>
                        <p className="text-xs text-green-700 mt-1">
                          Based on your interests, we recommend adding a cultural experience in Jaipur.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlannerPage;

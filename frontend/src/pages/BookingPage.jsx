import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { Button, Card, StepIndicator, Input, Select } from '../components/UI';

const STEPS = ['Details', 'Review', 'Payment'];

const BookingPage = () => {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    travelers: 1,
    date: '',
    specialRequests: '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDestination = async () => {
      setLoading(true);
      try {
        const data = await apiService.getDestinationById(destinationId);
        setDestination(data);
      } catch (err) {
        setError('Failed to load destination details.');
      } finally {
        setLoading(false);
      }
    };
    loadDestination();
  }, [destinationId]);

  const handleInputChange = (name, value) => {
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    if (!destination) return 0;
    const basePrice = parseInt(destination.price.replace(/[^0-9]/g, ''));
    return basePrice * bookingData.travelers + 500 + Math.round(basePrice * bookingData.travelers * 0.18);
  };

  const handleDetailsNext = (e) => {
    e.preventDefault();
    if (!bookingData.date) {
      setError('Please select a travel date.');
      return;
    }
    setError('');
    setStep(1);
  };

  const handleBook = async () => {
    if (!isAuthenticated) { navigate('/signin'); return; }
    setLoading(true);
    try {
      const result = await apiService.createBooking({
        destinationId: destination.id,
        destinationName: destination.name,
        ...bookingData,
        totalPrice: calculateTotal(),
        userId: user.id
      });

      if (result.success) {
        navigate('/payment', { state: { booking: result.booking, destination } });
      }
    } catch {
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-68px)] bg-stone-50 flex items-center justify-center">
        <div className="text-stone-500">Loading booking details...</div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-[calc(100vh-68px)] bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🗺️</div>
          <p className="text-stone-600">Destination not found</p>
          <Button variant="primary" onClick={() => navigate('/destinations')} className="mt-4">
            Browse Destinations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-68px)] bg-stone-50 pb-20 md:pb-8">
      {/* Header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-[1000px] mx-auto px-5 md:px-10 py-6">
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>🗺️ Book Your Trip</h1>
          <p className="text-stone-500 text-sm mt-1">Complete your booking for {destination.name}</p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-5 md:px-10 py-8">
        <StepIndicator steps={STEPS} current={step} />

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* ── Step 0: Details ── */}
        {step === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card padding>
                <h2 className="font-bold text-stone-900 mb-5" style={{ fontFamily: 'var(--font-display)' }}>Trip Details</h2>
                <form onSubmit={handleDetailsNext} className="space-y-4">
                  <div className="bg-stone-50 rounded-xl p-4 mb-4">
                    <div className="flex gap-4">
                      <div className="w-24 h-20 rounded-lg bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center text-3xl">
                        🗺️
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-stone-900">{destination.name}</h3>
                        <p className="text-sm text-stone-600">{destination.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="text-stone-600">📅 {destination.duration}</span>
                          <span className="text-stone-600">🌱 {destination.carbon} CO2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Select label="Number of Travelers" value={bookingData.travelers} onChange={e => handleInputChange('travelers', +e.target.value)}>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Traveler{n > 1 ? 's' : ''}</option>)}
                  </Select>
                  <Input label="Travel Date" type="date" value={bookingData.date} onChange={e => handleInputChange('date', e.target.value)} min={new Date().toISOString().split('T')[0]} />
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Special Requests</label>
                    <textarea
                      value={bookingData.specialRequests}
                      onChange={e => handleInputChange('specialRequests', e.target.value)}
                      rows={3}
                      placeholder="Any dietary requirements, accessibility needs, or special requests..."
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <Button type="submit" variant="primary" size="lg" className="w-full">Continue to Review</Button>
                </form>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card padding>
                <h3 className="font-bold text-stone-900 mb-4">Price Breakdown</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-stone-600">Base Price</span><span className="font-medium">{destination.price}</span></div>
                  <div className="flex justify-between"><span className="text-stone-600">× {bookingData.travelers} Traveler{bookingData.travelers > 1 ? 's' : ''}</span><span className="font-medium">₹{(parseInt(destination.price.replace(/[^0-9]/g, '')) * bookingData.travelers).toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-stone-600">Service Fee</span><span className="font-medium">₹500</span></div>
                  <div className="flex justify-between"><span className="text-stone-600">Taxes</span><span className="font-medium">₹{Math.round(parseInt(destination.price.replace(/[^0-9]/g, '')) * bookingData.travelers * 0.18).toLocaleString()}</span></div>
                  <div className="border-t border-stone-100 pt-3 flex justify-between">
                    <span className="font-bold text-stone-900">Total</span>
                    <span className="font-black text-orange-600 text-lg" style={{ fontFamily: 'var(--font-display)' }}>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🌱</div>
                    <div>
                      <p className="font-medium text-green-900 text-sm">Eco-Friendly Choice</p>
                      <p className="text-xs text-green-700 mt-1">This trip generates {destination.carbon} of CO2. We offset 100% of emissions.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🛡️</div>
                    <div>
                      <p className="font-medium text-blue-900 text-sm">Safe & Secure</p>
                      <p className="text-xs text-blue-700 mt-1">{destination.safety} safety rating. Verified by SmartTour360.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ── Step 1: Review ── */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card padding>
                <h2 className="font-bold text-stone-900 mb-5" style={{ fontFamily: 'var(--font-display)' }}>Contact Information</h2>
                <div className="space-y-4 max-w-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="First Name" value={bookingData.firstName} onChange={e => handleInputChange('firstName', e.target.value)} />
                    <Input label="Last Name" value={bookingData.lastName} onChange={e => handleInputChange('lastName', e.target.value)} />
                  </div>
                  <Input label="Email" type="email" value={bookingData.email} onChange={e => handleInputChange('email', e.target.value)} />
                  <Input label="Phone" type="tel" value={bookingData.phone} onChange={e => handleInputChange('phone', e.target.value)} />
                </div>
                <div className="mt-6 bg-stone-50 rounded-xl p-4">
                  <h3 className="font-bold text-stone-900 mb-4">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-stone-600">Destination</span><span className="font-medium">{destination.name}</span></div>
                    <div className="flex justify-between"><span className="text-stone-600">Duration</span><span className="font-medium">{destination.duration}</span></div>
                    <div className="flex justify-between"><span className="text-stone-600">Travelers</span><span className="font-medium">{bookingData.travelers}</span></div>
                    <div className="flex justify-between"><span className="text-stone-600">Date</span><span className="font-medium">{bookingData.date || 'Not selected'}</span></div>
                    <div className="border-t border-stone-100 pt-2 mt-2 flex justify-between">
                      <span className="font-bold text-stone-900">Total</span>
                      <span className="font-bold text-orange-600" style={{ fontFamily: 'var(--font-display)' }}>₹{calculateTotal().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="ghost" size="md" onClick={() => setStep(0)}>Back</Button>
                  <Button variant="primary" size="lg" loading={loading} onClick={handleBook}>
                    {!loading && '💳 Proceed to Payment'}
                  </Button>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-1">
              <Card padding>
                <h3 className="font-bold text-stone-900 mb-4">Price Breakdown</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-stone-600">Base Price</span><span className="font-medium">{destination.price}</span></div>
                  <div className="flex justify-between"><span className="text-stone-600">× {bookingData.travelers} Traveler{bookingData.travelers > 1 ? 's' : ''}</span><span className="font-medium">₹{(parseInt(destination.price.replace(/[^0-9]/g, '')) * bookingData.travelers).toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-stone-600">Service Fee</span><span className="font-medium">₹500</span></div>
                  <div className="flex justify-between"><span className="text-stone-600">Taxes</span><span className="font-medium">₹{Math.round(parseInt(destination.price.replace(/[^0-9]/g, '')) * bookingData.travelers * 0.18).toLocaleString()}</span></div>
                  <div className="border-t border-stone-100 pt-3 flex justify-between">
                    <span className="font-bold text-stone-900">Total</span>
                    <span className="font-black text-orange-600 text-lg" style={{ fontFamily: 'var(--font-display)' }}>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🌱</div>
                    <div>
                      <p className="font-medium text-green-900 text-sm">Eco-Friendly Choice</p>
                      <p className="text-xs text-green-700 mt-1">This trip generates {destination.carbon} of CO2. We offset 100% of emissions.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🛡️</div>
                    <div>
                      <p className="font-medium text-blue-900 text-sm">Safe & Secure</p>
                      <p className="text-xs text-blue-700 mt-1">{destination.safety} safety rating. Verified by SmartTour360.</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;

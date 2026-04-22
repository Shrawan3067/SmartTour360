import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { Button, Card, Spinner, StepIndicator, Input, Select } from '../components/UI';

const STEPS = ['Search', 'Select Tour', 'Details', 'Review'];

const DESTINATIONS = ['Jaipur','Goa','Munnar','Ladakh','Varanasi','Ayodhya','Udaipur','Kerala','Rishikesh','Manali','Shimla','Ooty'];

/* ── Tour result card ───────────────────────────────────── */
const TourCard = ({ tour, selected, onSelect }) => (
  <button
    onClick={() => onSelect(tour)}
    className={[
      'w-full text-left p-5 rounded-2xl border-2 transition-all duration-200',
      selected ? 'border-orange-500 bg-orange-50' : 'border-stone-100 bg-white hover:border-orange-200 hover:bg-orange-50/30',
    ].join(' ')}
  >
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-6">
        {/* Tour icon placeholder */}
        <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-lg">
          🗺️
        </div>
        <div>
          <div className="font-black text-stone-900 text-sm" style={{ fontFamily: 'var(--font-display)' }}>{tour.name}</div>
          <div className="text-xs text-stone-400">{tour.operator}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xl font-black text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>{tour.duration}</div>
            <div className="text-xs text-stone-400">{tour.destination}</div>
          </div>
          <div className="flex flex-col items-center px-3">
            <div className="text-[10px] text-stone-400 mb-1">{tour.type}</div>
            <div className="flex items-center gap-1">
              <div className="w-12 h-px bg-stone-300" />
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <div className="w-12 h-px bg-stone-300" />
            </div>
            <div className="text-[10px] text-stone-400 mt-1">{tour.rating}★</div>
          </div>
          <div>
            <div className="text-xl font-black text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>{tour.inclusions}</div>
            <div className="text-xs text-stone-400">Inclusions</div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-black text-orange-600" style={{ fontFamily: 'var(--font-display)' }}>
          ₹{tour.price.toLocaleString('en-IN')}
        </div>
        <div className="text-xs text-stone-400">per person</div>
        <div className="text-xs text-stone-400 mt-0.5">{tour.availableSlots} slots left</div>
      </div>
    </div>
  </button>
);

/* ── Main Page ─────────────────────────────────────────────── */
const TourBookingPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(0);
  const [search, setSearch] = useState({
    destination: location.state?.searchParams?.destination || 'Goa',
    date: location.state?.searchParams?.departure || '',
    travelers: location.state?.searchParams?.travelers || 1,
    type: location.state?.searchParams?.type || 'Adventure',
  });
  const [tours, setTours] = useState([]);
  const [selected, setSelected] = useState(null);
  const [details, setDetails] = useState({ firstName:'', lastName:'', email: user?.email||'', phone: user?.phone||'', dob:'', nationality:'India', specialRequests:'' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /* Auto-search if params passed from hero */
  useEffect(() => {
    if (location.state?.searchParams) handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e) => {
    e?.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await apiService.searchTours(search);
      if (res.success) { setTours(res.tours); setStep(1); }
    } catch { setError('Failed to search tours. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleSelectTour = (tour) => {
    setSelected(tour);
    setStep(2);
  };

  const handleDetailsNext = (e) => {
    e.preventDefault();
    if (!details.firstName || !details.lastName || !details.email) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setStep(3);
  };

  const handleBook = async () => {
    if (!isAuthenticated) { navigate('/signin'); return; }
    setLoading(true);
    try {
      const res = await apiService.createBooking({
        type: 'tour',
        tourId: selected.id,
        passengers: search.travelers,
        totalPrice: selected.price * search.travelers,
        destinationName: selected.name,
        date: search.date,
        travelers: search.travelers,
        details,
      });
      if (res.success) {
        navigate('/payment', { state: { booking: res.booking, destination: { name: selected.name } } });
      }
    } catch { setError('Booking failed. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] bg-stone-50 pb-20 md:pb-8 page-enter">
      {/* Page header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-[1000px] mx-auto px-5 md:px-10 py-6">
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>🗺️ Tour Booking</h1>
          <p className="text-stone-500 text-sm mt-1">Search and book curated tour packages across India</p>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-5 md:px-10 py-8">
        <StepIndicator steps={STEPS} current={step} />

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        {/* ── Step 0: Search ── */}
        {step === 0 && (
          <Card padding>
            <h2 className="font-bold text-stone-900 mb-5" style={{ fontFamily: 'var(--font-display)' }}>Search Tours</h2>
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <Select label="Destination" value={search.destination} onChange={e => setSearch(p => ({...p,destination:e.target.value}))}>
                  {DESTINATIONS.map(c => <option key={c}>{c}</option>)}
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input label="Start Date" type="date" value={search.date} onChange={e => setSearch(p=>({...p,date:e.target.value}))} min={new Date().toISOString().split('T')[0]} />
                <Select label="Travelers" value={search.travelers} onChange={e => setSearch(p=>({...p,travelers:+e.target.value}))}>
                  {[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n} {n===1?'Adult':'Adults'}</option>)}
                </Select>
                <Select label="Tour Type" value={search.type} onChange={e => setSearch(p=>({...p,type:e.target.value}))}>
                  {['Adventure','Heritage','Nature','Spiritual','Beach','Wildlife'].map(c=><option key={c}>{c}</option>)}
                </Select>
              </div>
              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full md:w-auto justify-center">
                {!loading && <>🔍 Search Tours</>}
              </Button>
            </form>
          </Card>
        )}

        {/* ── Step 1: Select ── */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>
                {tours.length} tours found · {search.destination}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setStep(0)}>← Edit Search</Button>
            </div>
            {tours.map(t => (
              <TourCard key={t.id} tour={t} selected={selected?.id === t.id} onSelect={handleSelectTour} />
            ))}
          </div>
        )}

        {/* ── Step 2: Traveler details ── */}
        {step === 2 && (
          <Card padding>
            <h2 className="font-bold text-stone-900 mb-5" style={{ fontFamily: 'var(--font-display)' }}>Traveler Details</h2>
            <form onSubmit={handleDetailsNext} className="space-y-4 max-w-lg">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" value={details.firstName} onChange={e=>setDetails(p=>({...p,firstName:e.target.value}))} placeholder="Priya" />
                <Input label="Last Name" value={details.lastName} onChange={e=>setDetails(p=>({...p,lastName:e.target.value}))} placeholder="Sharma" />
              </div>
              <Input label="Email" type="email" value={details.email} onChange={e=>setDetails(p=>({...p,email:e.target.value}))} />
              <Input label="Phone" type="tel" value={details.phone} onChange={e=>setDetails(p=>({...p,phone:e.target.value}))} />
              <Input label="Date of Birth" type="date" value={details.dob} onChange={e=>setDetails(p=>({...p,dob:e.target.value}))} />
              <div className="grid grid-cols-2 gap-4">
                <Select label="Nationality" value={details.nationality} onChange={e=>setDetails(p=>({...p,nationality:e.target.value}))}>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Australia">Australia</option>
                  <option value="Other">Other</option>
                </Select>
              </div>
              <Input label="Special Requests (Optional)" value={details.specialRequests} onChange={e=>setDetails(p=>({...p,specialRequests:e.target.value}))} placeholder="Any dietary requirements, accessibility needs, etc." />
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="ghost" size="md" onClick={() => setStep(1)}>Back</Button>
                <Button type="submit" variant="primary" size="md">Review Booking</Button>
              </div>
            </form>
          </Card>
        )}

        {/* ── Step 3: Review ── */}
        {step === 3 && selected && (
          <div className="space-y-5">
            <h2 className="font-bold text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>Review Your Booking</h2>
            <Card padding>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-stone-500">Tour</span><span className="font-semibold">{selected.name} · {selected.operator}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Destination</span><span className="font-semibold">{selected.destination}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Duration</span><span className="font-semibold">{selected.duration}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Start Date</span><span className="font-semibold">{search.date}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Travelers</span><span className="font-semibold">{search.travelers}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Type</span><span className="font-semibold">{selected.type}</span></div>
                <div className="border-t border-stone-100 pt-3 flex justify-between">
                  <span className="font-bold text-stone-900">Total Amount</span>
                  <span className="font-black text-orange-600 text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                    ₹{(selected.price * search.travelers).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </Card>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" size="md" onClick={() => setStep(2)}>Back</Button>
              <Button variant="primary" size="lg" loading={loading} onClick={handleBook}>
                {!loading && '💳 Proceed to Payment'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourBookingPage;

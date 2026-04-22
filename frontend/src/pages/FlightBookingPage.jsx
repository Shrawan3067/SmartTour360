import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { Button, Card, Badge, Spinner, StepIndicator, Input, Select } from '../components/UI';

const STEPS = ['Search', 'Select Flight', 'Seats', 'Details', 'Review'];

const CITIES = ['Delhi','Mumbai','Bangalore','Chennai','Kolkata','Hyderabad','Ahmedabad','Pune','Goa','Jaipur','Lucknow','Kochi','Varanasi','Chandigarh','Guwahati'];

/* ── Flight result card ───────────────────────────────────── */
const FlightCard = ({ flight, selected, onSelect }) => (
  <button
    onClick={() => onSelect(flight)}
    className={[
      'w-full text-left p-5 rounded-2xl border-2 transition-all duration-200',
      selected ? 'border-orange-500 bg-orange-50' : 'border-stone-100 bg-white hover:border-orange-200 hover:bg-orange-50/30',
    ].join(' ')}
  >
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-6">
        {/* Airline logo placeholder */}
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-xs font-black text-blue-700"
          style={{ fontFamily: 'var(--font-display)' }}>
          {flight.airline.slice(0,2)}
        </div>
        <div>
          <div className="font-black text-stone-900 text-sm" style={{ fontFamily: 'var(--font-display)' }}>{flight.airline}</div>
          <div className="text-xs text-stone-400">{flight.flightNo}</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xl font-black text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>{flight.departure}</div>
            <div className="text-xs text-stone-400">{flight.from}</div>
          </div>
          <div className="flex flex-col items-center px-3">
            <div className="text-[10px] text-stone-400 mb-1">{flight.duration}</div>
            <div className="flex items-center gap-1">
              <div className="w-12 h-px bg-stone-300" />
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <div className="w-12 h-px bg-stone-300" />
            </div>
            <div className="text-[10px] text-stone-400 mt-1">{flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}</div>
          </div>
          <div>
            <div className="text-xl font-black text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>{flight.arrival}</div>
            <div className="text-xs text-stone-400">{flight.to}</div>
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-black text-orange-600" style={{ fontFamily: 'var(--font-display)' }}>
          ₹{flight.price.toLocaleString('en-IN')}
        </div>
        <div className="text-xs text-stone-400">{flight.class}</div>
        <div className="text-xs text-stone-400 mt-0.5">{flight.seats} seats left</div>
      </div>
    </div>
  </button>
);

/* ── Seat map ─────────────────────────────────────────────── */
const SeatMap = ({ maxSeats, selected, onToggle }) => {
  const rows = 10;
  const cols = ['A','B','C','','D','E','F'];
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[320px]">
        {/* Legend */}
        <div className="flex gap-4 mb-4 justify-center text-xs font-medium text-stone-500">
          {[['bg-stone-100','Available'],['bg-orange-500 text-white','Selected'],['bg-stone-300','Occupied']].map(([c,l]) => (
            <div key={l} className="flex items-center gap-1.5">
              <div className={`w-5 h-5 rounded-md ${c}`} />
              <span>{l}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1 mb-2">
          {cols.map((c,i) => <div key={i} className={`w-8 text-center text-[10px] font-bold text-stone-400 ${!c && 'invisible'}`}>{c}</div>)}
        </div>
        {Array.from({ length: rows }, (_, row) => (
          <div key={row} className="flex items-center justify-center gap-1 mb-1">
            {cols.map((col, ci) => {
              if (!col) return <div key={ci} className="w-8" />;
              const seat = `${row + 1}${col}`;
              const occupied = ['1A','2C','3F','4B','5E','6A'].includes(seat);
              const isSelected = selected.includes(seat);
              return (
                <button
                  key={ci}
                  disabled={occupied}
                  onClick={() => !occupied && onToggle(seat)}
                  className={[
                    'w-8 h-8 rounded-md text-[11px] font-bold transition-all',
                    occupied   ? 'bg-stone-300 cursor-not-allowed text-stone-500' : '',
                    isSelected ? 'bg-orange-500 text-white scale-110 shadow-md' : '',
                    !occupied && !isSelected ? 'bg-stone-100 hover:bg-orange-200 text-stone-600' : '',
                  ].join(' ')}
                >
                  {isSelected ? '✓' : seat}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Main Page ─────────────────────────────────────────────── */
const FlightBookingPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState(0);
  const [search, setSearch] = useState({
    from: location.state?.searchParams?.origin || 'Delhi',
    to: location.state?.searchParams?.destination || 'Mumbai',
    date: location.state?.searchParams?.departure || '',
    passengers: location.state?.searchParams?.travelers || 1,
    class: location.state?.searchParams?.class || 'Economy',
  });
  const [flights, setFlights] = useState([]);
  const [selected, setSelected] = useState(null);
  const [seats, setSeats] = useState([]);
  const [details, setDetails] = useState({ firstName:'', lastName:'', email: user?.email||'', phone: user?.phone||'', dob:'', nationality:'India' });
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
      const res = await apiService.searchFlights(search);
      if (res.success) { setFlights(res.flights); setStep(1); }
    } catch { setError('Failed to search flights. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleSelectFlight = (flight) => {
    setSelected(flight);
    setStep(2);
  };

  const handleSeatsNext = () => {
    if (seats.length !== search.passengers) {
      setError(`Please select ${search.passengers} seat(s).`);
      return;
    }
    setError('');
    setStep(3);
  };

  const handleDetailsNext = (e) => {
    e.preventDefault();
    if (!details.firstName || !details.lastName || !details.email) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setStep(4);
  };

  const handleBook = async () => {
    if (!isAuthenticated) { navigate('/signin'); return; }
    setLoading(true);
    try {
      const res = await apiService.createBooking({
        type: 'flight',
        flightId: selected.id,
        seats,
        passengers: search.passengers,
        totalPrice: selected.price * search.passengers,
        destinationName: `${search.from} → ${search.to}`,
        date: search.date,
        travelers: search.passengers,
        details,
      });
      if (res.success) {
        navigate('/payment', { state: { booking: res.booking, destination: { name: `${search.from} → ${search.to}` } } });
      }
    } catch { setError('Booking failed. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-[calc(100vh-68px)] bg-stone-50 pb-20 md:pb-8 page-enter">
      {/* Page header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-[1000px] mx-auto px-5 md:px-10 py-6">
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>✈️ Flight Booking</h1>
          <p className="text-stone-500 text-sm mt-1">Search and book domestic & international flights</p>
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
            <h2 className="font-bold text-stone-900 mb-5" style={{ fontFamily: 'var(--font-display)' }}>Search Flights</h2>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select label="From" value={search.from} onChange={e => setSearch(p => ({...p,from:e.target.value}))}>
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </Select>
                <Select label="To" value={search.to} onChange={e => setSearch(p => ({...p,to:e.target.value}))}>
                  {CITIES.map(c => <option key={c}>{c}</option>)}
                </Select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input label="Departure Date" type="date" value={search.date} onChange={e => setSearch(p=>({...p,date:e.target.value}))} min={new Date().toISOString().split('T')[0]} />
                <Select label="Passengers" value={search.passengers} onChange={e => setSearch(p=>({...p,passengers:+e.target.value}))}>
                  {[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n} {n===1?'Adult':'Adults'}</option>)}
                </Select>
                <Select label="Class" value={search.class} onChange={e => setSearch(p=>({...p,class:e.target.value}))}>
                  {['Economy','Premium Economy','Business','First'].map(c=><option key={c}>{c}</option>)}
                </Select>
              </div>
              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full md:w-auto justify-center">
                {!loading && <>🔍 Search Flights</>}
              </Button>
            </form>
          </Card>
        )}

        {/* ── Step 1: Select ── */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>
                {flights.length} flights found · {search.from} → {search.to}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setStep(0)}>← Edit Search</Button>
            </div>
            {flights.map(f => (
              <FlightCard key={f.id} flight={f} selected={selected?.id === f.id} onSelect={handleSelectFlight} />
            ))}
          </div>
        )}

        {/* ── Step 2: Seats ── */}
        {step === 2 && selected && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>
                Select {search.passengers} Seat{search.passengers > 1 ? 's' : ''}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setStep(1)}>← Back</Button>
            </div>
            <Card padding>
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="font-black text-stone-700" style={{ fontFamily: 'var(--font-display)' }}>{search.from}</span>
                  <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  <span className="font-black text-stone-700" style={{ fontFamily: 'var(--font-display)' }}>{search.to}</span>
                </div>
                <p className="text-sm text-stone-500 mt-2">Selected: {seats.join(', ') || 'None'}</p>
              </div>
              <SeatMap maxSeats={search.passengers} selected={seats} onToggle={(seat) => {
                setSeats(prev => prev.includes(seat)
                  ? prev.filter(s => s !== seat)
                  : prev.length < search.passengers ? [...prev, seat] : prev
                );
              }} />
            </Card>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" size="md" onClick={() => setStep(1)}>Back</Button>
              <Button variant="primary" size="md" onClick={handleSeatsNext}>Continue to Details</Button>
            </div>
          </div>
        )}

        {/* ── Step 3: Passenger details ── */}
        {step === 3 && (
          <Card padding>
            <h2 className="font-bold text-stone-900 mb-5" style={{ fontFamily: 'var(--font-display)' }}>Passenger Details</h2>
            <form onSubmit={handleDetailsNext} className="space-y-4 max-w-lg">
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" value={details.firstName} onChange={e=>setDetails(p=>({...p,firstName:e.target.value}))} placeholder="Priya" />
                <Input label="Last Name" value={details.lastName} onChange={e=>setDetails(p=>({...p,lastName:e.target.value}))} placeholder="Sharma" />
              </div>
              <Input label="Email" type="email" value={details.email} onChange={e=>setDetails(p=>({...p,email:e.target.value}))} />
              <Input label="Phone" type="tel" value={details.phone} onChange={e=>setDetails(p=>({...p,phone:e.target.value}))} />
              <Input label="Date of Birth" type="date" value={details.dob} onChange={e=>setDetails(p=>({...p,dob:e.target.value}))} />
              <div className="flex gap-3 pt-2">
                <Button type="button" variant="ghost" size="md" onClick={() => setStep(2)}>Back</Button>
                <Button type="submit" variant="primary" size="md">Review Booking</Button>
              </div>
            </form>
          </Card>
        )}

        {/* ── Step 4: Review ── */}
        {step === 4 && selected && (
          <div className="space-y-5">
            <h2 className="font-bold text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>Review Your Booking</h2>
            <Card padding>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-stone-500">Flight</span><span className="font-semibold">{selected.airline} · {selected.flightNo}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Route</span><span className="font-semibold">{search.from} → {search.to}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Date</span><span className="font-semibold">{search.date}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Seats</span><span className="font-semibold">{seats.join(', ')}</span></div>
                <div className="flex justify-between"><span className="text-stone-500">Passengers</span><span className="font-semibold">{search.passengers}</span></div>
                <div className="border-t border-stone-100 pt-3 flex justify-between">
                  <span className="font-bold text-stone-900">Total Amount</span>
                  <span className="font-black text-orange-600 text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                    ₹{(selected.price * search.passengers).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </Card>
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" size="md" onClick={() => setStep(3)}>Back</Button>
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

export default FlightBookingPage;

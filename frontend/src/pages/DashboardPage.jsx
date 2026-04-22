import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { Button, Card, Badge, Spinner, EmptyState, Skeleton } from '../components/UI';

const TABS = ['Overview', 'Bookings', 'Wishlist', 'Profile'];

/* ── Stat card ─────────────────────────────────────────────── */
const StatCard = ({ icon, label, value, sub, accent }) => (
  <Card padding className="flex items-start gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${accent}`}>
      {icon}
    </div>
    <div>
      <div className="text-2xl font-black text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>{value}</div>
      <div className="text-sm font-semibold text-stone-600">{label}</div>
      {sub && <div className="text-xs text-stone-400 mt-0.5">{sub}</div>}
    </div>
  </Card>
);

/* ── Booking row ───────────────────────────────────────────── */
const BookingRow = ({ booking, onCancel, onDownload, onReschedule }) => {
  const statusColor = {
    confirmed:  'green',
    completed:  'blue',
    cancelled:  'red',
    pending_payment: 'gold',
  }[booking.status] || 'gray';

  const handleDownload = () => {
    const ticketData = {
      bookingId: booking.id,
      destination: booking.destinationName,
      date: booking.date,
      travelers: booking.travelers,
      price: booking.totalPrice,
      status: booking.status,
    };
    const blob = new Blob([JSON.stringify(ticketData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket_${booking.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onDownload && onDownload(booking.id);
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-xl border border-stone-100 hover:bg-stone-50 transition-colors">
      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-xl shrink-0">
        {booking.type === 'flight' ? '✈️' : booking.type === 'train' ? '🚂' : booking.type === 'bus' ? '🚌' : booking.type === 'tour' ? '🗺️' : '🎫'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-stone-900 text-sm truncate" style={{ fontFamily: 'var(--font-display)' }}>
          {booking.destinationName}
        </div>
        <div className="text-xs text-stone-400 mt-0.5">
          {new Date(booking.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          {' · '}{booking.travelers} {booking.travelers === 1 ? 'traveller' : 'travellers'}
        </div>
      </div>
      <div className="text-right shrink-0">
        <Badge variant={statusColor} className="mb-1">
          {booking.status.replace('_', ' ')}
        </Badge>
        <div className="text-sm font-bold text-stone-800" style={{ fontFamily: 'var(--font-display)' }}>
          ₹{booking.totalPrice?.toLocaleString('en-IN')}
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        {(booking.status === 'confirmed' || booking.status === 'completed') && (
          <button
            onClick={handleDownload}
            className="text-xs text-blue-500 hover:text-blue-700 font-semibold transition-colors"
            title="Download Ticket"
          >
            📥
          </button>
        )}
        {booking.status === 'confirmed' && (
          <>
            <button
              onClick={() => onReschedule && onReschedule(booking.id)}
              className="text-xs text-amber-500 hover:text-amber-700 font-semibold transition-colors"
              title="Reschedule"
            >
              📅
            </button>
            <button
              onClick={() => onCancel(booking.id)}
              className="text-xs text-red-400 hover:text-red-600 font-semibold transition-colors"
              title="Cancel"
            >
              ✕
            </button>
          </>
        )}
      </div>
    </div>
  );
};

/* ── Profile form ──────────────────────────────────────────── */
const ProfileTab = ({ user, onUpdate }) => {
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await apiService.updateProfile(user.id, form);
      if (res.success) { onUpdate(form); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } finally { setSaving(false); }
  };

  return (
    <Card padding>
      <h3 className="font-bold text-stone-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>Personal Information</h3>
      <form onSubmit={handleSave} className="space-y-4 max-w-md">
        {[
          { k: 'name',    label: 'Full Name',      type: 'text' },
          { k: 'email',   label: 'Email Address',  type: 'email' },
          { k: 'phone',   label: 'Mobile Number',  type: 'tel' },
          { k: 'address', label: 'Address',        type: 'text' },
        ].map(f => (
          <div key={f.k}>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wide mb-1.5"
              style={{ fontFamily: 'var(--font-display)' }}>{f.label}</label>
            <input
              type={f.type}
              value={form[f.k]}
              onChange={e => setForm(p => ({ ...p, [f.k]: e.target.value }))}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>
        ))}
        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" variant="primary" size="md" loading={saving}>
            {!saving && 'Save Changes'}
          </Button>
          {saved && <span className="text-sm text-green-600 font-semibold">✓ Saved!</span>}
        </div>
      </form>
    </Card>
  );
};

/* ── Main Dashboard ────────────────────────────────────────── */
const DashboardPage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [bookings, setBookings] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const loadData = async () => {
      setLoading(true);
      try {
        const [bRes, wRes] = await Promise.all([
          apiService.getUserBookings(user.id),
          apiService.getWishlist(user.id),
        ]);
        setBookings(bRes.bookings || []);
        setWishlist(wRes.items || []);
      } finally { setLoading(false); }
    };
    loadData();
  }, [user]);

  const cancelBooking = async (id) => {
    if (!window.confirm('Cancel this booking?')) return;
    try {
      const res = await apiService.cancelBooking(id);
      if (res.success) setBookings(prev => prev.filter(b => b.id !== id));
    } catch { /* handle error */ }
  };

  const rescheduleBooking = async (id) => {
    const newDate = prompt('Enter new date (YYYY-MM-DD):');
    if (!newDate) return;
    try {
      const booking = bookings.find(b => b.id === id);
      if (booking) {
        setBookings(prev => prev.map(b => b.id === id ? { ...b, date: newDate } : b));
      }
    } catch { /* handle error */ }
  };

  if (!user) return null;

  const initials = user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const totalSpend = bookings.reduce((s, b) => s + (b.totalPrice || 0), 0);

  return (
    <div className="min-h-[calc(100vh-68px)] bg-stone-50 pb-20 md:pb-0 page-enter">
      {/* ── Top banner ── */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white">
        <div className="max-w-[1248px] mx-auto px-5 md:px-10 py-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white text-2xl font-black shrink-0"
              style={{ fontFamily: 'var(--font-display)' }}>
              {initials}
            </div>
            <div>
              <h1 className="text-2xl font-black" style={{ fontFamily: 'var(--font-display)' }}>
                Hello, {user.name.split(' ')[0]} 👋
              </h1>
              <p className="text-stone-400 text-sm mt-0.5">{user.email}</p>
              <p className="text-stone-500 text-xs mt-0.5">Member since {user.memberSince}</p>
            </div>
            <div className="ml-auto flex gap-3">
              <Button variant="ghost" size="sm"
                className="!text-stone-300 !border-stone-700 hover:!bg-stone-700"
                onClick={() => { logout(); navigate('/'); }}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tab nav ── */}
      <div className="bg-white border-b border-stone-100 sticky top-[68px] z-10">
        <div className="max-w-[1248px] mx-auto px-5 md:px-10">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={[
                  'px-5 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all',
                  activeTab === tab
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-stone-500 hover:text-stone-800',
                ].join(' ')}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-[1248px] mx-auto px-5 md:px-10 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-28" />)}
          </div>
        ) : (
          <>
            {activeTab === 'Overview' && (
              <div className="space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <StatCard icon="🎫" label="Total Bookings" value={bookings.length} accent="bg-orange-50" />
                  <StatCard icon="💰" label="Total Spent" value={`₹${totalSpend.toLocaleString('en-IN')}`} accent="bg-green-50" />
                  <StatCard icon="❤️" label="Wishlist" value={wishlist.length} sub="saved destinations" accent="bg-red-50" />
                  <StatCard icon="✈️" label="Trips Completed" value={bookings.filter(b => b.status === 'completed').length} accent="bg-blue-50" />
                </div>

                {/* Recent bookings */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>Recent Bookings</h2>
                    <Button variant="ghost" size="xs" onClick={() => setActiveTab('Bookings')}>View all</Button>
                  </div>
                  {bookings.length === 0 ? (
                    <EmptyState icon="🎫" title="No bookings yet" description="Your bookings will appear here."
                      action={<Button variant="primary" size="md" onClick={() => navigate('/destinations')}>Explore Destinations</Button>} />
                  ) : (
                    <Card padding={false} className="divide-y divide-stone-100">
                      {bookings.slice(0, 3).map(b => (
                        <div key={b.id} className="p-1"><BookingRow booking={b} onCancel={cancelBooking} onReschedule={rescheduleBooking} /></div>
                      ))}
                    </Card>
                  )}
                </div>

                {/* Quick links */}
                <div>
                  <h2 className="text-lg font-bold text-stone-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>Quick Actions</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { icon: '✈️', label: 'Book Flight',   path: '/flight-booking' },
                      { icon: '🚂', label: 'Book Train',    path: '/train-booking' },
                      { icon: '🚌', label: 'Book Bus',      path: '/bus-booking' },
                      { icon: '🗺️', label: 'Plan a Trip',  path: '/trip-planner' },
                    ].map(q => (
                      <button key={q.path} onClick={() => navigate(q.path)}
                        className="flex flex-col items-center gap-2 p-4 bg-white border border-stone-100 rounded-2xl hover:border-orange-200 hover:bg-orange-50 transition-all group">
                        <span className="text-2xl group-hover:scale-110 transition-transform">{q.icon}</span>
                        <span className="text-xs font-bold text-stone-700" style={{ fontFamily: 'var(--font-display)' }}>{q.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Bookings' && (
              <div>
                <h2 className="text-lg font-bold text-stone-900 mb-5" style={{ fontFamily: 'var(--font-display)' }}>All Bookings</h2>
                {bookings.length === 0 ? (
                  <EmptyState icon="🎫" title="No bookings found"
                    action={<Button variant="primary" size="md" onClick={() => navigate('/destinations')}>Explore Destinations</Button>} />
                ) : (
                  <Card padding={false} className="divide-y divide-stone-100">
                    {bookings.map(b => (
                      <div key={b.id} className="p-1"><BookingRow booking={b} onCancel={cancelBooking} onReschedule={rescheduleBooking} /></div>
                    ))}
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'Wishlist' && (
              <div>
                <h2 className="text-lg font-bold text-stone-900 mb-5" style={{ fontFamily: 'var(--font-display)' }}>My Wishlist</h2>
                {wishlist.length === 0 ? (
                  <EmptyState icon="❤️" title="No saved destinations"
                    action={<Button variant="primary" size="md" onClick={() => navigate('/destinations')}>Explore Destinations</Button>} />
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {wishlist.map(item => (
                      <Card key={item.id} padding={false} className="overflow-hidden">
                        <div className="aspect-video bg-stone-100 relative">
                          {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>{item.name}</h3>
                          <p className="text-sm text-stone-500">{item.state}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-sm font-bold text-orange-600">{item.price}</span>
                            <Button variant="primary" size="xs" onClick={() => navigate(`/booking/${item.id}`)}>Book Now</Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'Profile' && (
              <ProfileTab user={user} onUpdate={updateUser} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Card } from '../components/UI';

const BookingConfirmationPage = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { booking, payment } = location.state || {};

  if (!booking) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="text-5xl">📋</div>
        <p className="text-stone-600">No booking information found.</p>
        <Button variant="primary" size="md" onClick={() => navigate('/dashboard')}>Go to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-68px)] bg-stone-50 pb-20 md:pb-8 page-enter">
      <div className="max-w-[700px] mx-auto px-5 md:px-10 py-12">
        {/* Success animation */}
        <div className="text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center text-5xl mx-auto mb-5 animate-bounce" style={{ animationIterationCount: 2 }}>
            🎉
          </div>
          <h1 className="text-3xl font-black text-stone-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Booking Confirmed!
          </h1>
          <p className="text-stone-500">
            Your booking is confirmed. A confirmation email has been sent.
          </p>
        </div>

        {/* Confirmation card */}
        <Card padding className="mb-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>Booking Details</h2>
              <p className="text-xs text-stone-400 mt-0.5 font-mono">{booking.id}</p>
            </div>
            <div className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}>
              ✓ Confirmed
            </div>
          </div>

          <div className="space-y-3 text-sm">
            {[
              ['Destination', booking.destinationName],
              ['Date', booking.date ? new Date(booking.date).toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' }) : '—'],
              ['Travellers', booking.travelers],
              ['Booking Type', booking.type || 'Tour'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-stone-100 last:border-0">
                <span className="text-stone-500">{label}</span>
                <span className="font-semibold text-stone-900 text-right">{value}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2">
              <span className="font-bold text-stone-900">Total Paid</span>
              <span className="font-black text-orange-600 text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                ₹{booking.totalPrice?.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </Card>

        {payment && (
          <Card padding className="mb-8">
            <h3 className="font-bold text-stone-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>Payment Info</h3>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Transaction ID</span>
              <span className="font-mono text-xs text-stone-700">{payment.id}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-stone-500">Status</span>
              <span className="text-green-600 font-semibold">✓ Success</span>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" size="lg" onClick={() => navigate('/dashboard')}>
            View My Bookings
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/')}>
            Back to Home
          </Button>
          <Button variant="ghost" size="lg" onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'My SmartTour360 Booking', text: `Booked a trip to ${booking.destinationName}!`, url: window.location.href });
            }
          }}>
            Share
          </Button>
        </div>

        {/* Tips */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '📧', title: 'Check Email', desc: 'Confirmation sent to your inbox' },
            { icon: '🗺️', title: 'Plan More', desc: 'Use the trip planner for your itinerary' },
            { icon: '💬', title: 'Need Help?', desc: 'Our support team is available 24/7' },
          ].map(t => (
            <div key={t.title} className="text-center p-4 bg-white rounded-2xl border border-stone-100">
              <div className="text-2xl mb-2">{t.icon}</div>
              <div className="text-sm font-bold text-stone-800" style={{ fontFamily: 'var(--font-display)' }}>{t.title}</div>
              <div className="text-xs text-stone-400 mt-0.5">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';
import { Button, Card, Input, Spinner } from '../components/UI';

const METHODS = [
  { id: 'card',   label: 'Credit / Debit Card', icon: '💳' },
  { id: 'upi',    label: 'UPI',                 icon: '📱' },
  { id: 'netbank',label: 'Net Banking',          icon: '🏦' },
  { id: 'wallet', label: 'Wallets',              icon: '👜' },
];

const fmtCard = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 16);
  return d.replace(/(.{4})/g, '$1 ').trim();
};

const fmtExpiry = (v) => {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d;
};

const PaymentPage = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user }  = useAuth();
  const { booking, destination } = location.state || {};

  const [method, setMethod] = useState('card');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState('form'); // form | processing | success
  const [error, setError] = useState('');

  if (!booking || !destination) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="text-5xl">📋</div>
        <p className="text-stone-600 font-medium">No booking information found.</p>
        <Button variant="primary" size="md" onClick={() => navigate('/destinations')}>Browse Destinations</Button>
      </div>
    );
  }

  const handlePay = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (method === 'card') {
      if (card.number.replace(/\s/g,'').length < 16) { setError('Enter a valid 16-digit card number.'); return; }
      if (!card.name.trim()) { setError('Enter the card holder name.'); return; }
      if (card.expiry.length < 5) { setError('Enter a valid expiry date (MM/YY).'); return; }
      if (card.cvv.length < 3) { setError('Enter a valid CVV.'); return; }
    }
    if (method === 'upi' && !upiId.includes('@')) { setError('Enter a valid UPI ID (e.g. name@upi).'); return; }

    setLoading(true);
    setStage('processing');

    try {
      const payRes = await apiService.createPayment({
        bookingId: booking.id,
        amount: booking.totalPrice,
        method,
        userId: user?.id,
      });

      if (payRes.success) {
        const verifyRes = await apiService.verifyPayment(payRes.payment.id);
        if (verifyRes.success) {
          setStage('success');
          setTimeout(() => {
            navigate('/booking-confirmation', {
              state: { booking: { ...booking, status: 'confirmed' }, payment: verifyRes.payment },
            });
          }, 1500);
        }
      }
    } catch {
      setError('Payment failed. Please try again.');
      setStage('form');
    } finally {
      setLoading(false);
    }
  };

  if (stage === 'processing') {
    return (
      <div className="min-h-[calc(100vh-68px)] flex flex-col items-center justify-center gap-6 bg-stone-50">
        <Spinner size="xl" />
        <div className="text-center">
          <h2 className="text-xl font-black text-stone-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>Processing Payment</h2>
          <p className="text-stone-500 text-sm">Please wait, do not close this window…</p>
        </div>
      </div>
    );
  }

  if (stage === 'success') {
    return (
      <div className="min-h-[calc(100vh-68px)] flex flex-col items-center justify-center gap-4 bg-stone-50">
        <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-4xl">✓</div>
        <h2 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>Payment Successful!</h2>
        <p className="text-stone-500 text-sm">Redirecting to confirmation…</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-68px)] bg-stone-50 pb-20 md:pb-8 page-enter">
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-[900px] mx-auto px-5 md:px-10 py-6">
          <h1 className="text-2xl font-black text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>💳 Secure Payment</h1>
          <p className="text-stone-500 text-sm mt-1 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
            256-bit SSL encrypted · Your payment info is secure
          </p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-5 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Payment form */}
          <form onSubmit={handlePay} className="space-y-6">
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            {/* Method selector */}
            <Card padding>
              <h3 className="font-bold text-stone-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>Payment Method</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {METHODS.map(m => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    className={[
                      'flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-150 text-center',
                      method === m.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-stone-200 hover:border-orange-200',
                    ].join(' ')}
                  >
                    <span className="text-2xl">{m.icon}</span>
                    <span className="text-xs font-semibold text-stone-700 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Card form */}
            {method === 'card' && (
              <Card padding>
                <h3 className="font-bold text-stone-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>Card Details</h3>
                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    value={card.number}
                    onChange={e => setCard(p => ({...p, number: fmtCard(e.target.value)}))}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="1" y1="10" x2="23" y2="10" strokeWidth="2"/></svg>}
                  />
                  <Input
                    label="Card Holder Name"
                    value={card.name}
                    onChange={e => setCard(p => ({...p, name: e.target.value}))}
                    placeholder="As printed on card"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry (MM/YY)"
                      value={card.expiry}
                      onChange={e => setCard(p => ({...p, expiry: fmtExpiry(e.target.value)}))}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                    <Input
                      label="CVV"
                      type="password"
                      value={card.cvv}
                      onChange={e => setCard(p => ({...p, cvv: e.target.value.replace(/\D/g,'').slice(0,4)}))}
                      placeholder="•••"
                      maxLength={4}
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* UPI */}
            {method === 'upi' && (
              <Card padding>
                <h3 className="font-bold text-stone-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>UPI Payment</h3>
                <Input
                  label="UPI ID"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  placeholder="yourname@paytm"
                  hint="Enter your registered UPI ID"
                />
                <p className="text-xs text-stone-400 mt-3">
                  Supported: PhonePe, GPay, Paytm, BHIM, and more
                </p>
              </Card>
            )}

            {/* Net Banking / Wallet */}
            {(method === 'netbank' || method === 'wallet') && (
              <Card padding>
                <h3 className="font-bold text-stone-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  {method === 'netbank' ? 'Net Banking' : 'Wallets'}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {(method === 'netbank'
                    ? ['SBI','HDFC','ICICI','Axis','Kotak','PNB']
                    : ['Paytm','PhonePe','Amazon Pay','Freecharge']
                  ).map(b => (
                    <button key={b} type="button"
                      className="px-4 py-3 border border-stone-200 rounded-xl text-sm font-semibold text-stone-700 hover:border-orange-300 hover:bg-orange-50 transition-all text-left"
                      style={{ fontFamily: 'var(--font-display)' }}>
                      {b}
                    </button>
                  ))}
                </div>
              </Card>
            )}

            <Button type="submit" variant="primary" size="xl" className="w-full justify-center" loading={loading}>
              {!loading && `Pay ₹${booking.totalPrice?.toLocaleString('en-IN')}`}
            </Button>
          </form>

          {/* Order summary */}
          <div className="space-y-4">
            <Card padding>
              <h3 className="font-bold text-stone-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Destination</span>
                  <span className="font-semibold text-right max-w-[150px]">{destination.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Booking ID</span>
                  <span className="font-mono text-xs">{booking.id}</span>
                </div>
                {booking.travelers && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Travellers</span>
                    <span className="font-semibold">{booking.travelers}</span>
                  </div>
                )}
                {booking.date && (
                  <div className="flex justify-between">
                    <span className="text-stone-500">Date</span>
                    <span className="font-semibold">{booking.date}</span>
                  </div>
                )}
                <div className="border-t border-stone-100 pt-3 flex justify-between">
                  <span className="font-bold text-stone-900">Total</span>
                  <span className="font-black text-orange-600 text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                    ₹{booking.totalPrice?.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </Card>

            {/* Trust badges */}
            <div className="flex flex-col gap-2">
              {[
                { icon: '🔒', text: '256-bit SSL encryption' },
                { icon: '↩️', text: 'Free cancellation within 24h' },
                { icon: '🛡️', text: 'Fraud protection guaranteed' },
              ].map(t => (
                <div key={t.text} className="flex items-center gap-2.5 text-xs text-stone-500">
                  <span>{t.icon}</span>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;

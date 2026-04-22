import React, { useState } from 'react';
import { Button, Card, Input } from './UI';
import { validators } from '../utils/validation';

/**
 * Payment Gateway Placeholder Component
 * Provides a UI for payment processing with validation
 * In production, this would integrate with Razorpay, Stripe, or other payment gateways
 */
const PaymentGateway = ({ amount, bookingDetails, onPaymentSuccess, onPaymentFailure, onCancel }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    upiId: '',
  });
  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validatePaymentForm = () => {
    const newErrors = {};
    
    if (paymentMethod === 'card') {
      const cardError = validators.payment.cardNumber(formData.cardNumber);
      if (cardError) newErrors.cardNumber = cardError;
      
      const expiryError = validators.payment.expiryDate(formData.expiryDate);
      if (expiryError) newErrors.expiryDate = expiryError;
      
      const cvvError = validators.payment.cvv(formData.cvv);
      if (cvvError) newErrors.cvv = cvvError;
      
      const nameError = validators.payment.cardName(formData.cardName);
      if (nameError) newErrors.cardName = nameError;
    } else if (paymentMethod === 'upi') {
      if (!formData.upiId) newErrors.upiId = 'UPI ID is required';
      if (!formData.upiId.includes('@')) newErrors.upiId = 'Invalid UPI ID format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!validatePaymentForm()) {
      return;
    }
    
    setProcessing(true);
    
    // Simulate payment processing
    // In production, this would call actual payment gateway API
    setTimeout(() => {
      setProcessing(false);
      // Simulate success (90% success rate)
      if (Math.random() > 0.1) {
        onPaymentSuccess({
          paymentId: 'PAY' + Date.now(),
          method: paymentMethod,
          amount,
          timestamp: new Date().toISOString(),
        });
      } else {
        onPaymentFailure('Payment failed. Please try again.');
      }
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : v;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <Card padding>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Details</h2>
        <p className="text-sm text-gray-600">Complete your payment to confirm booking</p>
      </div>

      {/* Booking Summary */}
      {bookingDetails && (
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-2">Booking Summary</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Destination</span>
              <span className="font-medium">{bookingDetails.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date</span>
              <span className="font-medium">{bookingDetails.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Travelers</span>
              <span className="font-medium">{bookingDetails.travelers}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total Amount</span>
                <span className="text-orange-600">₹{amount?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Selection */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'card', label: 'Card', icon: '💳' },
            { id: 'upi', label: 'UPI', icon: '📱' },
            { id: 'netbanking', label: 'Net Banking', icon: '🏦' },
          ].map(method => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`p-3 rounded-xl border-2 transition-all ${
                paymentMethod === method.id
                  ? 'border-orange-500 bg-orange-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{method.icon}</div>
              <div className="text-xs font-medium">{method.label}</div>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handlePayment}>
        {/* Card Payment */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Card Number</label>
              <Input
                type="text"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                error={errors.cardNumber}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Expiry Date</label>
                <Input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  error={errors.expiryDate}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">CVV</label>
                <Input
                  type="password"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  placeholder="123"
                  maxLength={3}
                  error={errors.cvv}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cardholder Name</label>
              <Input
                type="text"
                value={formData.cardName}
                onChange={(e) => handleInputChange('cardName', e.target.value)}
                placeholder="Name on card"
                error={errors.cardName}
              />
            </div>
          </div>
        )}

        {/* UPI Payment */}
        {paymentMethod === 'upi' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">UPI ID</label>
            <Input
              type="text"
              value={formData.upiId}
              onChange={(e) => handleInputChange('upiId', e.target.value)}
              placeholder="yourname@upi"
              error={errors.upiId}
            />
            <p className="text-xs text-gray-500 mt-1">Enter your UPI ID (e.g., name@upi)</p>
          </div>
        )}

        {/* Net Banking */}
        {paymentMethod === 'netbanking' && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Bank</label>
            <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100">
              <option value="">Choose your bank</option>
              <option value="sbi">State Bank of India</option>
              <option value="hdfc">HDFC Bank</option>
              <option value="icici">ICICI Bank</option>
              <option value="axis">Axis Bank</option>
              <option value="kotak">Kotak Mahindra Bank</option>
              <option value="pnb">Punjab National Bank</option>
              <option value="other">Other Bank</option>
            </select>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-xl flex items-start gap-2">
          <span className="text-green-600">🔒</span>
          <p className="text-xs text-green-800">
            Your payment information is secure. We use industry-standard encryption to protect your data.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={onCancel}
            disabled={processing}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={processing}
            className="flex-1"
          >
            {processing ? 'Processing...' : `Pay ₹${amount?.toLocaleString('en-IN')}`}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default PaymentGateway;

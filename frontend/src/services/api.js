/**
 * SmartTour360 API Service
 * Production-ready API layer with proper error handling.
 * Mock implementations are clearly marked — swap with real fetch() calls when backend is ready.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token   = localStorage.getItem('st360_token') || null;
  }

  setToken(token) {
    this.token = token;
  }

  getHeaders(extra = {}) {
    return {
      'Content-Type': 'application/json',
      ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
      ...extra,
    };
  }

  async request(method, path, body = null) {
    const options = {
      method,
      headers: this.getHeaders(),
    };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${this.baseURL}${path}`, options);

    if (response.status === 401) {
      this.setToken(null);
      localStorage.removeItem('st360_token');
      window.location.href = '/signin';
      return;
    }

    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(err.message || 'API error');
    }

    return response.json();
  }

  /* ── Helpers ─────────────────────────────────────── */
  delay(ms = 800) { return new Promise(r => setTimeout(r, ms)); }

  /* ══════════════════════════════════════════════════
     AUTH
  ══════════════════════════════════════════════════ */
  async login(credentials) {
    // MOCK — replace with: return this.request('POST', '/auth/login', credentials);
    await this.delay(1000);
    const user = {
      id: 'user_' + Date.now(),
      name: credentials.name || 'Traveller',
      email: credentials.email,
      phone: credentials.phone || '+91 98765 43210',
      memberSince: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      avatar: null,
    };
    return { success: true, user, token: 'mock_jwt_' + Date.now() };
  }

  async signup(userData) {
    // MOCK — replace with: return this.request('POST', '/auth/signup', userData);
    await this.delay(1200);
    const user = {
      id: 'user_' + Date.now(),
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      memberSince: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      avatar: null,
    };
    return { success: true, user, token: 'mock_jwt_' + Date.now() };
  }

  async logout() {
    // MOCK — replace with: return this.request('POST', '/auth/logout');
    this.setToken(null);
    return { success: true };
  }

  async updateProfile(userId, profileData) {
    // MOCK — replace with: return this.request('PUT', `/users/${userId}`, profileData);
    await this.delay(800);
    return { success: true, user: { id: userId, ...profileData } };
  }

  /* ══════════════════════════════════════════════════
     DESTINATIONS
  ══════════════════════════════════════════════════ */
  async getDestinations(filters = {}) {
    // MOCK — replace with: return this.request('GET', '/destinations?' + new URLSearchParams(filters));
    await this.delay(600);
    return {
      success: true,
      destinations: MOCK_DESTINATIONS.filter(d => {
        if (filters.category && d.category !== filters.category) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          return d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q);
        }
        return true;
      }),
    };
  }

  async getDestinationById(id) {
    // MOCK — replace with: return this.request('GET', `/destinations/${id}`);
    await this.delay(500);
    return MOCK_DESTINATIONS.find(d => d.id === id) || MOCK_DESTINATIONS[0];
  }

  async searchDestinations(query) {
    // MOCK — replace with: return this.request('GET', `/destinations/search?q=${query}`);
    await this.delay(400);
    const q = query.toLowerCase();
    return {
      success: true,
      results: MOCK_DESTINATIONS.filter(d =>
        d.name.toLowerCase().includes(q) || d.state.toLowerCase().includes(q)
      ),
    };
  }

  /* ══════════════════════════════════════════════════
     FLIGHTS
  ══════════════════════════════════════════════════ */
  async searchFlights(params) {
    // MOCK — replace with: return this.request('POST', '/flights/search', params);
    await this.delay(1500);
    return { success: true, flights: MOCK_FLIGHTS };
  }

  async getFlightDetails(flightId) {
    // MOCK — replace with: return this.request('GET', `/flights/${flightId}`);
    await this.delay(400);
    return { success: true, flight: MOCK_FLIGHTS.find(f => f.id === flightId) };
  }

  /* ══════════════════════════════════════════════════
     TRAINS
  ══════════════════════════════════════════════════ */
  async searchTrains(params) {
    // MOCK — replace with: return this.request('POST', '/trains/search', params);
    await this.delay(1200);
    return { success: true, trains: MOCK_TRAINS };
  }

  /* ══════════════════════════════════════════════════
     BUSES
  ══════════════════════════════════════════════════ */
  async searchBuses(params) {
    // MOCK — replace with: return this.request('POST', '/buses/search', params);
    await this.delay(1000);
    return { success: true, buses: MOCK_BUSES };
  }

  /* ══════════════════════════════════════════════════
     TOURS
  ══════════════════════════════════════════════════ */
  async searchTours(params) {
    // MOCK — replace with: return this.request('POST', '/tours/search', params);
    await this.delay(1200);
    const filteredTours = MOCK_TOURS.filter(tour => {
      if (params.destination && tour.destination.toLowerCase() !== params.destination.toLowerCase()) return false;
      if (params.type && tour.type !== params.type) return false;
      return true;
    });
    return { success: true, tours: filteredTours };
  }

  /* ══════════════════════════════════════════════════
     BOOKINGS
  ══════════════════════════════════════════════════ */
  async createBooking(bookingData) {
    // MOCK — replace with: return this.request('POST', '/bookings', bookingData);
    await this.delay(1000);
    return {
      success: true,
      booking: {
        id: 'BK' + Date.now(),
        status: 'pending_payment',
        createdAt: new Date().toISOString(),
        ...bookingData,
      },
    };
  }

  async getUserBookings(userId) {
    // MOCK — replace with: return this.request('GET', `/users/${userId}/bookings`);
    await this.delay(700);
    return { success: true, bookings: MOCK_BOOKINGS };
  }

  async cancelBooking(bookingId) {
    // MOCK — replace with: return this.request('DELETE', `/bookings/${bookingId}`);
    await this.delay(800);
    return { success: true, bookingId };
  }

  async getBookingById(id) {
    // MOCK — replace with: return this.request('GET', `/bookings/${id}`);
    await this.delay(400);
    return { success: true, booking: MOCK_BOOKINGS.find(b => b.id === id) };
  }

  /* ══════════════════════════════════════════════════
     PAYMENTS
  ══════════════════════════════════════════════════ */
  async createPayment(paymentData) {
    // MOCK — replace with: return this.request('POST', '/payments', paymentData);
    await this.delay(1500);
    return {
      success: true,
      payment: { id: 'PAY' + Date.now(), status: 'processing', ...paymentData },
    };
  }

  async verifyPayment(paymentId) {
    // MOCK — replace with: return this.request('GET', `/payments/${paymentId}/verify`);
    await this.delay(2000);
    return {
      success: true,
      payment: { id: paymentId, status: 'success', verifiedAt: new Date().toISOString() },
    };
  }

  /* ══════════════════════════════════════════════════
     WISHLIST
  ══════════════════════════════════════════════════ */
  async getWishlist(userId) {
    // MOCK — replace with: return this.request('GET', `/users/${userId}/wishlist`);
    await this.delay(600);
    return { success: true, items: MOCK_WISHLIST };
  }

  async addToWishlist(userId, destinationId) {
    // MOCK — replace with: return this.request('POST', `/users/${userId}/wishlist`, { destinationId });
    await this.delay(400);
    return { success: true };
  }

  async removeFromWishlist(userId, destinationId) {
    // MOCK — replace with: return this.request('DELETE', `/users/${userId}/wishlist/${destinationId}`);
    await this.delay(400);
    return { success: true };
  }

  /* ══════════════════════════════════════════════════
     NOTIFICATIONS
  ══════════════════════════════════════════════════ */
  async getNotifications(userId) {
    // MOCK — replace with: return this.request('GET', `/users/${userId}/notifications`);
    await this.delay(500);
    return { success: true, notifications: MOCK_NOTIFICATIONS };
  }

  async markNotificationRead(notificationId) {
    // MOCK — replace with: return this.request('PATCH', `/notifications/${notificationId}`, { read: true });
    await this.delay(200);
    return { success: true };
  }

  /* ══════════════════════════════════════════════════
     REVIEWS
  ══════════════════════════════════════════════════ */
  async getReviews(destinationId) {
    // MOCK — replace with: return this.request('GET', `/destinations/${destinationId}/reviews`);
    await this.delay(500);
    return { success: true, reviews: MOCK_REVIEWS };
  }

  async submitReview(destinationId, reviewData) {
    // MOCK — replace with: return this.request('POST', `/destinations/${destinationId}/reviews`, reviewData);
    await this.delay(800);
    return { success: true, review: { id: 'REV' + Date.now(), ...reviewData } };
  }

  /* ══════════════════════════════════════════════════
     TRIP PLANNER
  ══════════════════════════════════════════════════ */
  async saveTripPlan(userId, planData) {
    // MOCK — replace with: return this.request('POST', `/users/${userId}/trips`, planData);
    await this.delay(800);
    return { success: true, trip: { id: 'TRIP' + Date.now(), ...planData } };
  }

  async getUserTrips(userId) {
    // MOCK — replace with: return this.request('GET', `/users/${userId}/trips`);
    await this.delay(600);
    return { success: true, trips: [] };
  }

  /* ══════════════════════════════════════════════════
     SUPPORT
  ══════════════════════════════════════════════════ */
  async submitContactForm(formData) {
    // MOCK — replace with: return this.request('POST', '/support/contact', formData);
    await this.delay(1000);
    return { success: true, ticketId: 'TKT' + Date.now() };
  }
}

/* ══════════════════════════════════════════════════════════════
   MOCK DATA
══════════════════════════════════════════════════════════════ */
const MOCK_DESTINATIONS = [
  { id: 'rajasthan', name: 'Jaipur', state: 'Rajasthan', category: 'heritage', price: '₹5,500', rating: 4.8, reviews: 2340, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&auto=format', highlights: ['Amber Fort', 'Hawa Mahal', 'City Palace'], duration: '3D/2N', safetyRating: 'green' },
  { id: 'kerala', name: 'Munnar', state: 'Kerala', category: 'nature', price: '₹6,200', rating: 4.9, reviews: 1890, image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&auto=format', highlights: ['Tea Gardens', 'Eravikulam NP', 'Mattupetty Dam'], duration: '4D/3N', safetyRating: 'green' },
  { id: 'goa', name: 'Goa', state: 'Goa', category: 'beach', price: '₹3,499', rating: 4.7, reviews: 4120, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format', highlights: ['Baga Beach', 'Old Goa Churches', 'Dudhsagar Falls'], duration: '3D/2N', safetyRating: 'green' },
  { id: 'ladakh', name: 'Ladakh', state: 'J&K', category: 'adventure', price: '₹12,999', rating: 4.9, reviews: 987, image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format', highlights: ['Pangong Lake', 'Nubra Valley', 'Khardung La'], duration: '7D/6N', safetyRating: 'yellow' },
  { id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', category: 'spiritual', price: '₹4,100', rating: 4.6, reviews: 3200, image: 'https://images.unsplash.com/photo-1561361058-c24e020f04f3?w=800&auto=format', highlights: ['Ganga Aarti', 'Kashi Vishwanath', 'Boat Ride'], duration: '2D/1N', safetyRating: 'green' },
  { id: 'ayodhya', name: 'Ayodhya', state: 'Uttar Pradesh', category: 'spiritual', price: '₹4,599', rating: 4.8, reviews: 1540, image: 'https://images.unsplash.com/photo-1585136917228-a7fc0a90a9af?w=800&auto=format', highlights: ['Ram Mandir', 'Kanak Bhawan', 'Saryu Ghat'], duration: '2D/1N', safetyRating: 'green' },
];

const MOCK_FLIGHTS = [
  { id: 'fl1', airline: 'IndiGo', flightNo: '6E 204', from: 'DEL', to: 'BOM', departure: '06:00', arrival: '08:15', duration: '2h 15m', price: 3299, class: 'Economy', stops: 0, seats: 12 },
  { id: 'fl2', airline: 'Air India', flightNo: 'AI 101', from: 'DEL', to: 'BOM', departure: '09:30', arrival: '11:50', duration: '2h 20m', price: 4199, class: 'Economy', stops: 0, seats: 5 },
  { id: 'fl3', airline: 'Vistara', flightNo: 'UK 955', from: 'DEL', to: 'BOM', departure: '14:00', arrival: '16:10', duration: '2h 10m', price: 5499, class: 'Business', stops: 0, seats: 3 },
];

const MOCK_TRAINS = [
  { id: 'tr1', name: 'Rajdhani Express', number: '12951', from: 'NDLS', to: 'MMCT', departure: '16:55', arrival: '08:35+1', duration: '15h 40m', price: 1850, class: 'AC 2T', seats: 24 },
  { id: 'tr2', name: 'Duronto Express', number: '12221', from: 'NDLS', to: 'MMCT', departure: '23:00', arrival: '15:40+1', duration: '16h 40m', price: 1450, class: 'AC 3T', seats: 48 },
];

const MOCK_BUSES = [
  { id: 'bs1', operator: 'MSRTC', type: 'AC Sleeper', from: 'Pune', to: 'Mumbai', departure: '22:00', arrival: '02:30', duration: '4h 30m', price: 450, seats: 18 },
  { id: 'bs2', operator: 'RedBus', type: 'Volvo AC', from: 'Pune', to: 'Mumbai', departure: '20:00', arrival: '00:00', duration: '4h 00m', price: 600, seats: 8 },
];

const MOCK_TOURS = [
  { id: 'tr1', name: 'Golden Triangle Tour', operator: 'India Trips', destination: 'Jaipur', duration: '5D/4N', type: 'Heritage', price: 15999, rating: 4.8, inclusions: 'Hotel+Meals+Guide', availableSlots: 12 },
  { id: 'tr2', name: 'Goa Beach Escape', operator: 'Coastal Tours', destination: 'Goa', duration: '3D/2N', type: 'Beach', price: 8999, rating: 4.7, inclusions: 'Hotel+Meals', availableSlots: 8 },
  { id: 'tr3', name: 'Kerala Backwaters', operator: 'Nature Trails', destination: 'Munnar', duration: '4D/3N', type: 'Nature', price: 12999, rating: 4.9, inclusions: 'Hotel+Meals+Houseboat', availableSlots: 6 },
  { id: 'tr4', name: 'Ladakh Adventure', operator: 'Himalayan Expeditions', destination: 'Ladakh', duration: '7D/6N', type: 'Adventure', price: 24999, rating: 4.9, inclusions: 'Hotel+Meals+Transport', availableSlots: 4 },
  { id: 'tr5', name: 'Varanasi Spiritual Journey', operator: 'Divine Tours', destination: 'Varanasi', duration: '3D/2N', type: 'Spiritual', price: 7999, rating: 4.6, inclusions: 'Hotel+Meals+Ganga Aarti', availableSlots: 15 },
];

const MOCK_BOOKINGS = [
  { id: 'BK001', type: 'destination', destinationName: 'Goa', date: '2025-02-14', travelers: 2, totalPrice: 6998, status: 'confirmed', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&auto=format' },
  { id: 'BK002', type: 'flight', destinationName: 'Mumbai', date: '2025-03-01', travelers: 1, totalPrice: 3299, status: 'completed', image: null },
];

const MOCK_WISHLIST = [
  { id: 'kerala', name: 'Munnar', state: 'Kerala', price: '₹6,200', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&auto=format' },
  { id: 'ladakh', name: 'Ladakh', state: 'J&K', price: '₹12,999', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&auto=format' },
];

const MOCK_NOTIFICATIONS = [
  { id: 'n1', type: 'offer', title: 'New offer!', message: 'Get 15% off on Munnar packages this weekend.', createdAt: new Date(Date.now() - 3600000).toISOString(), read: false },
  { id: 'n2', type: 'booking', title: 'Booking confirmed', message: 'Your Goa trip (BK001) is confirmed.', createdAt: new Date(Date.now() - 86400000).toISOString(), read: true },
];

const MOCK_REVIEWS = [
  { id: 'r1', userName: 'Priya S.', rating: 5, comment: 'Absolutely stunning! The tea gardens were breathtaking and the homestay was cosy.', createdAt: '2025-01-10', helpful: 24 },
  { id: 'r2', userName: 'Arjun M.', rating: 4, comment: 'Great destination for a relaxing getaway. Weather was perfect.', createdAt: '2025-01-05', helpful: 12 },
];

export const mockData = { MOCK_DESTINATIONS, MOCK_FLIGHTS, MOCK_TRAINS, MOCK_BUSES, MOCK_TOURS };

const apiService = new ApiService();
export default apiService;

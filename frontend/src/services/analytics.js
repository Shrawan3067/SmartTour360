/**
 * Analytics Service
 * Placeholder for analytics integration (Google Analytics, Mixpanel, etc.)
 * In production, this would integrate with real analytics services
 */

class AnalyticsService {
  constructor() {
    this.enabled = import.meta.env.VITE_ANALYTICS_ENABLED === 'true';
    this.trackingId = import.meta.env.VITE_GA_TRACKING_ID || '';
    this.mixpanelToken = import.meta.env.VITE_MIXPANEL_TOKEN || '';
    this.userId = null;
    this.userProperties = {};
  }

  // Initialize analytics
  init() {
    if (!this.enabled) return;

    console.log('Analytics initialized');
    // In production, this would initialize Google Analytics, Mixpanel, etc.
    // Example:
    // gtag('js', new Date());
    // gtag('config', this.trackingId);
    // mixpanel.init(this.mixpanelToken);
  }

  // Set user ID
  setUserId(userId) {
    if (!this.enabled) return;
    this.userId = userId;
    console.log('Analytics: User ID set', userId);
    // gtag('config', this.trackingId, { user_id: userId });
    // mixpanel.identify(userId);
  }

  // Set user properties
  setUserProperties(properties) {
    if (!this.enabled) return;
    this.userProperties = { ...this.userProperties, ...properties };
    console.log('Analytics: User properties set', properties);
    // gtag('set', 'user_properties', properties);
    // mixpanel.people.set(properties);
  }

  // Track page view
  trackPageView(pageName, properties = {}) {
    if (!this.enabled) return;
    console.log('Analytics: Page view tracked', pageName, properties);
    // gtag('event', 'page_view', {
    //   page_title: pageName,
    //   page_location: window.location.href,
    //   ...properties,
    // });
    // mixpanel.track('Page View', { page: pageName, ...properties });
  }

  // Track custom event
  trackEvent(eventName, properties = {}) {
    if (!this.enabled) return;
    console.log('Analytics: Event tracked', eventName, properties);
    // gtag('event', eventName, properties);
    // mixpanel.track(eventName, properties);
  }

  // Track booking events
  trackBookingStarted(bookingType, properties = {}) {
    this.trackEvent('booking_started', {
      booking_type: bookingType,
      ...properties,
    });
  }

  trackBookingCompleted(bookingType, properties = {}) {
    this.trackEvent('booking_completed', {
      booking_type: bookingType,
      ...properties,
    });
  }

  trackBookingCancelled(bookingType, bookingId) {
    this.trackEvent('booking_cancelled', {
      booking_type: bookingType,
      booking_id: bookingId,
    });
  }

  // Track search events
  trackSearch(searchType, properties = {}) {
    this.trackEvent('search', {
      search_type: searchType,
      ...properties,
    });
  }

  // Track wishlist events
  trackWishlistAdded(destinationId, destinationName) {
    this.trackEvent('wishlist_added', {
      destination_id: destinationId,
      destination_name: destinationName,
    });
  }

  trackWishlistRemoved(destinationId, destinationName) {
    this.trackEvent('wishlist_removed', {
      destination_id: destinationId,
      destination_name: destinationName,
    });
  }

  // Track review events
  trackReviewSubmitted(destinationId, rating) {
    this.trackEvent('review_submitted', {
      destination_id: destinationId,
      rating,
    });
  }

  // Track payment events
  trackPaymentInitiated(amount, paymentMethod) {
    this.trackEvent('payment_initiated', {
      amount,
      payment_method: paymentMethod,
    });
  }

  trackPaymentCompleted(amount, paymentMethod, bookingId) {
    this.trackEvent('payment_completed', {
      amount,
      payment_method: paymentMethod,
      booking_id: bookingId,
    });
  }

  trackPaymentFailed(amount, paymentMethod, error) {
    this.trackEvent('payment_failed', {
      amount,
      payment_method: paymentMethod,
      error,
    });
  }

  // Track error events
  trackError(error, context = {}) {
    this.trackEvent('error', {
      error_message: error.message,
      error_stack: error.stack,
      ...context,
    });
  }

  // Track user engagement
  trackTimeOnPage(pageName, duration) {
    this.trackEvent('time_on_page', {
      page: pageName,
      duration_seconds: duration,
    });
  }

  trackFeatureUsed(featureName, properties = {}) {
    this.trackEvent('feature_used', {
      feature: featureName,
      ...properties,
    });
  }

  // Track conversion funnel
  trackFunnelStep(funnelName, step, properties = {}) {
    this.trackEvent('funnel_step', {
      funnel: funnelName,
      step,
      ...properties,
    });
  }

  // E-commerce tracking
  trackProductView(productId, productName, properties = {}) {
    this.trackEvent('product_view', {
      product_id: productId,
      product_name: productName,
      ...properties,
    });
  }

  trackAddToCart(productId, productName, price, quantity = 1) {
    this.trackEvent('add_to_cart', {
      product_id: productId,
      product_name: productName,
      price,
      quantity,
    });
  }

  trackPurchase(orderId, total, items = []) {
    this.trackEvent('purchase', {
      transaction_id: orderId,
      value: total,
      items,
    });
  }

  // Session tracking
  trackSessionStart() {
    this.trackEvent('session_start', {
      timestamp: new Date().toISOString(),
    });
  }

  trackSessionEnd(duration) {
    this.trackEvent('session_end', {
      duration_seconds: duration,
    });
  }

  // Reset user data (on logout)
  reset() {
    if (!this.enabled) return;
    this.userId = null;
    this.userProperties = {};
    console.log('Analytics: User data reset');
    // gtag('config', this.trackingId, { user_id: null });
    // mixpanel.reset();
  }
}

// Create singleton instance
const analyticsService = new AnalyticsService();

// Initialize on load
if (typeof window !== 'undefined') {
  analyticsService.init();
}

export default analyticsService;

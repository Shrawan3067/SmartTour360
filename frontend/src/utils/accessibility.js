/**
 * Accessibility Utilities
 * Provides ARIA labels, roles, and accessibility helpers for components
 */

// ARIA label generators
export const ariaLabels = {
  // Navigation
  home: 'Navigate to home page',
  destinations: 'Browse destinations',
  flights: 'Book flights',
  trains: 'Book trains',
  buses: 'Book buses',
  tours: 'Browse tour packages',
  dashboard: 'View your dashboard',
  signIn: 'Sign in to your account',
  signOut: 'Sign out of your account',
  
  // Actions
  search: 'Search',
  filter: 'Filter results',
  sort: 'Sort results',
  book: 'Book now',
  cancel: 'Cancel booking',
  reschedule: 'Reschedule booking',
  download: 'Download ticket',
  save: 'Save to wishlist',
  remove: 'Remove from wishlist',
  share: 'Share',
  close: 'Close dialog',
  
  // Forms
  required: 'This field is required',
  optional: 'This field is optional',
  invalid: 'Invalid input',
  
  // Status
  loading: 'Loading content',
  error: 'An error occurred',
  success: 'Operation successful',
  
  // Booking
  passengers: 'Number of passengers',
  travelers: 'Number of travelers',
  departure: 'Departure date',
  return: 'Return date',
  origin: 'Origin city or station',
  destination: 'Destination city or station',
  class: 'Travel class',
  seats: 'Select seats',
  
  // Payment
  payment: 'Payment information',
  cardNumber: 'Card number',
  expiryDate: 'Card expiry date',
  cvv: 'Card security code',
  pay: 'Pay now',
};

// ARIA role assignments
export const ariaRoles = {
  navigation: 'navigation',
  main: 'main',
  complementary: 'complementary',
  contentinfo: 'contentinfo',
  banner: 'banner',
  search: 'search',
  dialog: 'dialog',
  alert: 'alert',
  status: 'status',
  tablist: 'tablist',
  tab: 'tab',
 tabpanel: 'tabpanel',
  button: 'button',
  link: 'link',
  menu: 'menu',
  menuitem: 'menuitem',
  checkbox: 'checkbox',
  radio: 'radio',
  combobox: 'combobox',
  listbox: 'listbox',
  option: 'option',
  slider: 'slider',
  spinbutton: 'spinbutton',
  textbox: 'textbox',
};

// Keyboard navigation helpers
export const keyboardHandlers = {
  // Common keyboard shortcuts
  escape: 'Escape',
  enter: 'Enter',
  space: ' ',
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  arrowLeft: 'ArrowLeft',
  arrowRight: 'ArrowRight',
  home: 'Home',
  end: 'End',
  pageUp: 'PageUp',
  pageDown: 'PageDown',
  tab: 'Tab',
  
  // Check if key matches
  matchesKey: (event, key) => event.key === key,
  
  // Handle enter or space for button-like elements
  handleButtonPress: (callback) => (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      callback(event);
    }
  },
  
  // Handle arrow keys for list navigation
  handleListNavigation: (currentIndex, maxIndex, callback) => (event) => {
    let newIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        newIndex = Math.min(currentIndex + 1, maxIndex);
        break;
      case 'ArrowUp':
        event.preventDefault();
        newIndex = Math.max(currentIndex - 1, 0);
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = maxIndex;
        break;
    }
    
    if (newIndex !== currentIndex) {
      callback(newIndex);
    }
  },
};

// Focus management
export const focusManagement = {
  // Trap focus within a container
  trapFocus: (container) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable.focus();
          }
        }
      }
    };
    
    container.addEventListener('keydown', handleKeyDown);
    firstFocusable?.focus();
    
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  },
  
  // Return focus to previous element
  returnFocus: (element) => {
    if (element) {
      element.focus();
    }
  },
};

// Screen reader announcements
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.style.cssText = `
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `;
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Skip link component helper
export const SkipLink = ({ targetId, children = 'Skip to main content' }) => (
  <a
    href={`#${targetId}`}
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-white focus:rounded-lg"
  >
    {children}
  </a>
);

// Visually hidden class for screen readers
export const visuallyHidden = {
  className: 'sr-only',
  style: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: '0',
  },
};

export default {
  ariaLabels,
  ariaRoles,
  keyboardHandlers,
  focusManagement,
  announceToScreenReader,
  SkipLink,
  visuallyHidden,
};

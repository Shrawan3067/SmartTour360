/**
 * Form validation utilities for SmartTour360
 * Comprehensive validation for all booking forms
 */

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Indian phone number regex (10 digits, optional +91)
const PHONE_REGEX = /^(\+91[-\s]?)?[0-9]{10}$/;

// Date validation - must be future date
const isFutureDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

// Age validation (must be at least 18 years old)
const isAdult = (dateString) => {
  const dob = new Date(dateString);
  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    return age - 1;
  }
  return age >= 18;
};

// Validation functions
export const validators = {
  email: (value) => {
    if (!value) return 'Email is required';
    if (!EMAIL_REGEX.test(value)) return 'Please enter a valid email address';
    return null;
  },

  phone: (value) => {
    if (!value) return 'Phone number is required';
    if (!PHONE_REGEX.test(value)) return 'Please enter a valid 10-digit phone number';
    return null;
  },

  required: (value, fieldName = 'This field') => {
    if (!value || value.trim() === '') return `${fieldName} is required`;
    return null;
  },

  minLength: (value, min, fieldName) => {
    if (!value) return null;
    if (value.length < min) return `${fieldName} must be at least ${min} characters`;
    return null;
  },

  maxLength: (value, max, fieldName) => {
    if (!value) return null;
    if (value.length > max) return `${fieldName} must not exceed ${max} characters`;
    return null;
  },

  futureDate: (value, fieldName = 'Date') => {
    if (!value) return `${fieldName} is required`;
    if (!isFutureDate(value)) return `${fieldName} must be in the future`;
    return null;
  },

  adultAge: (value) => {
    if (!value) return 'Date of birth is required';
    if (!isAdult(value)) return 'You must be at least 18 years old to book';
    return null;
  },

  positiveNumber: (value, fieldName = 'Value') => {
    if (!value) return `${fieldName} is required`;
    const num = Number(value);
    if (isNaN(num) || num <= 0) return `${fieldName} must be a positive number`;
    return null;
  },

  match: (value, compareValue, fieldName) => {
    if (value !== compareValue) return `${fieldName} does not match`;
    return null;
  },
};

// Form-specific validation schemas
export const validationSchemas = {
  // Flight booking validation
  flightBooking: {
    origin: (value) => validators.required(value, 'Origin city'),
    destination: (value) => validators.required(value, 'Destination city'),
    departure: (value) => validators.futureDate(value, 'Departure date'),
    returnDate: (value, formData) => {
      if (!value) return null;
      if (!isFutureDate(value)) return 'Return date must be in the future';
      if (formData.departure && new Date(value) <= new Date(formData.departure)) {
        return 'Return date must be after departure date';
      }
      return null;
    },
    passengers: (value) => {
      const num = Number(value);
      if (!num || num < 1) return 'At least 1 passenger is required';
      if (num > 9) return 'Maximum 9 passengers allowed';
      return null;
    },
    class: (value) => validators.required(value, 'Travel class'),
  },

  // Train booking validation
  trainBooking: {
    from: (value) => validators.required(value, 'Origin station'),
    to: (value) => validators.required(value, 'Destination station'),
    departure: (value) => validators.futureDate(value, 'Departure date'),
    passengers: (value) => {
      const num = Number(value);
      if (!num || num < 1) return 'At least 1 passenger is required';
      if (num > 6) return 'Maximum 6 passengers allowed';
      return null;
    },
    class: (value) => validators.required(value, 'Travel class'),
  },

  // Bus booking validation
  busBooking: {
    from: (value) => validators.required(value, 'Origin city'),
    to: (value) => validators.required(value, 'Destination city'),
    departure: (value) => validators.futureDate(value, 'Departure date'),
    passengers: (value) => {
      const num = Number(value);
      if (!num || num < 1) return 'At least 1 passenger is required';
      if (num > 10) return 'Maximum 10 passengers allowed';
      return null;
    },
    class: (value) => validators.required(value, 'Seat type'),
  },

  // Tour booking validation
  tourBooking: {
    destination: (value) => validators.required(value, 'Destination'),
    date: (value) => validators.futureDate(value, 'Start date'),
    travelers: (value) => {
      const num = Number(value);
      if (!num || num < 1) return 'At least 1 traveler is required';
      if (num > 20) return 'Maximum 20 travelers allowed';
      return null;
    },
    type: (value) => validators.required(value, 'Tour type'),
  },

  // Passenger details validation
  passengerDetails: {
    firstName: (value) => {
      const error = validators.required(value, 'First name');
      if (error) return error;
      return validators.minLength(value, 2, 'First name');
    },
    lastName: (value) => {
      const error = validators.required(value, 'Last name');
      if (error) return error;
      return validators.minLength(value, 2, 'Last name');
    },
    email: (value) => validators.email(value),
    phone: (value) => validators.phone(value),
    dob: (value) => validators.adultAge(value),
    nationality: (value) => validators.required(value, 'Nationality'),
  },

  // Payment validation
  payment: {
    cardNumber: (value) => {
      if (!value) return 'Card number is required';
      const cleaned = value.replace(/\s/g, '');
      if (cleaned.length !== 16) return 'Card number must be 16 digits';
      if (!/^\d+$/.test(cleaned)) return 'Card number must contain only digits';
      return null;
    },
    expiryDate: (value) => {
      if (!value) return 'Expiry date is required';
      const [month, year] = value.split('/').map(Number);
      if (!month || !year) return 'Invalid expiry date format (MM/YY)';
      if (month < 1 || month > 12) return 'Invalid month';
      const now = new Date();
      const expiry = new Date(2000 + year, month - 1);
      if (expiry < now) return 'Card has expired';
      return null;
    },
    cvv: (value) => {
      if (!value) return 'CVV is required';
      if (value.length !== 3) return 'CVV must be 3 digits';
      if (!/^\d+$/.test(value)) return 'CVV must contain only digits';
      return null;
    },
    cardName: (value) => validators.required(value, 'Cardholder name'),
  },

  // Sign up validation
  signUp: {
    name: (value) => {
      const error = validators.required(value, 'Full name');
      if (error) return error;
      return validators.minLength(value, 2, 'Name');
    },
    email: (value) => validators.email(value),
    phone: (value) => validators.phone(value),
    password: (value) => {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
      if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
      if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
      if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
      return null;
    },
    confirmPassword: (value, formData) => {
      if (!value) return 'Please confirm your password';
      return validators.match(value, formData.password, 'Passwords');
    },
  },

  // Contact form validation
  contact: {
    name: (value) => validators.required(value, 'Name'),
    email: (value) => validators.email(value),
    subject: (value) => validators.required(value, 'Subject'),
    message: (value) => {
      const error = validators.required(value, 'Message');
      if (error) return error;
      return validators.minLength(value, 10, 'Message');
    },
  },
};

// Validate entire form against a schema
export const validateForm = (formData, schema) => {
  const errors = {};
  let isValid = true;

  Object.keys(schema).forEach((field) => {
    const validator = schema[field];
    const error = validator(formData[field], formData);
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Validate single field
export const validateField = (value, schema, fieldName, formData = {}) => {
  const validator = schema[fieldName];
  if (!validator) return null;
  return validator(value, formData);
};

export default {
  validators,
  validationSchemas,
  validateForm,
  validateField,
};

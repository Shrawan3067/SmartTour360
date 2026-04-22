import React, { useState } from 'react';

// Validation rules
const validationRules = {
  required: (value) => {
    if (!value || value.trim() === '') {
      return 'This field is required';
    }
    return null;
  },
  
  email: (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },
  
  phone: (value) => {
    if (!value) return null;
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(value.replace(/\D/g, ''))) {
      return 'Please enter a valid phone number';
    }
    return null;
  },
  
  minLength: (min) => (value) => {
    if (!value) return null;
    if (value.length < min) {
      return `Minimum ${min} characters required`;
    }
    return null;
  },
  
  maxLength: (max) => (value) => {
    if (!value) return null;
    if (value.length > max) {
      return `Maximum ${max} characters allowed`;
    }
    return null;
  },
  
  pattern: (regex, message) => (value) => {
    if (!value) return null;
    if (!regex.test(value)) {
      return message || 'Invalid format';
    }
    return null;
  },
  
  match: (field, fieldName) => (value, allValues) => {
    if (!value) return null;
    if (value !== allValues[field]) {
      return `Must match ${fieldName}`;
    }
    return null;
  },
  
  date: (value) => {
    if (!value) return null;
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return 'Please enter a valid date';
    }
    return null;
  },
  
  minDate: (minDate) => (value) => {
    if (!value) return null;
    const date = new Date(value);
    const min = new Date(minDate);
    if (date < min) {
      return `Date must be after ${minDate}`;
    }
    return null;
  },
  
  cardNumber: (value) => {
    if (!value) return null;
    const cardNumber = value.replace(/\D/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      return 'Please enter a valid card number';
    }
    return null;
  },
  
  cvv: (value) => {
    if (!value) return null;
    const cvv = value.replace(/\D/g, '');
    if (cvv.length !== 3 && cvv.length !== 4) {
      return 'Please enter a valid CVV';
    }
    return null;
  }
};

// Form validation hook
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value, allValues) => {
    const fieldRules = validationRules[name];
    if (!fieldRules) return null;

    for (const rule of fieldRules) {
      const error = rule(value, allValues);
      if (error) return error;
    }
    return null;
  };

  const validateAll = () => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name], values);
      if (error) {
        newErrors[name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  };

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value, { ...values, [name]: value });
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, values[name], values);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (onSubmit) => {
    setIsSubmitting(true);
    const isValid = validateAll();
    
    if (isValid) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }
    
    setIsSubmitting(false);
    return isValid;
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isValid: Object.keys(errors).length === 0
  };
};

// Form field component with validation
export const ValidatedFormField = ({ 
  label, 
  name, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  onBlur, 
  error, 
  touched, 
  required = false,
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
          error && touched ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && touched && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Form select component with validation
export const ValidatedFormSelect = ({ 
  label, 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  touched, 
  options, 
  required = false,
  placeholder = "Select an option",
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
          error && touched ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && touched && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

// Form textarea component with validation
export const ValidatedFormTextarea = ({ 
  label, 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  touched, 
  required = false,
  placeholder,
  rows = 3,
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors ${
          error && touched ? 'border-red-500 bg-red-50' : 'border-gray-300'
        }`}
        {...props}
      />
      {error && touched && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export { validationRules };
export default useFormValidation;

import React from 'react';

/**
 * API Error Handler Component
 * Provides user-friendly error messages for API failures
 */
const ApiErrorHandler = ({ error, onRetry, onDismiss }) => {
  if (!error) return null;

  const getErrorMessage = (error) => {
    if (typeof error === 'string') return error;
    if (error.message) return error.message;
    if (error.response?.data?.message) return error.response.data.message;
    if (error.response?.status === 401) return 'Session expired. Please sign in again.';
    if (error.response?.status === 403) return 'You do not have permission to perform this action.';
    if (error.response?.status === 404) return 'The requested resource was not found.';
    if (error.response?.status === 500) return 'Server error. Please try again later.';
    if (error.response?.status >= 400) return 'An error occurred. Please try again.';
    return 'An unexpected error occurred. Please try again.';
  };

  const getErrorSeverity = (error) => {
    if (error.response?.status === 401) return 'warning';
    if (error.response?.status === 403) return 'warning';
    if (error.response?.status >= 500) return 'error';
    return 'info';
  };

  const severity = getErrorSeverity(error);
  const message = getErrorMessage(error);

  const severityStyles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-amber-50 border-amber-200 text-amber-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const icons = {
    error: '⚠️',
    warning: '⚡',
    info: 'ℹ️',
  };

  return (
    <div className={`p-4 rounded-xl border ${severityStyles[severity]} flex items-start gap-3`}>
      <span className="text-xl">{icons[severity]}</span>
      <div className="flex-1">
        <p className="font-semibold text-sm">{message}</p>
      </div>
      <div className="flex gap-2 shrink-0">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-3 py-1 text-xs font-semibold bg-white border border-current rounded-lg hover:bg-opacity-80 transition-colors"
          >
            Retry
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="px-2 py-1 text-xs font-semibold hover:opacity-70 transition-opacity"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default ApiErrorHandler;

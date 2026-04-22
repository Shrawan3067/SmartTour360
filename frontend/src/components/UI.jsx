import React, { forwardRef } from 'react';

/* ── Button ────────────────────────────────────────────────── */
export const Button = forwardRef(({
  children,
  variant = 'primary',   // primary | secondary | ghost | danger
  size    = 'md',        // sm | md | lg
  loading = false,
  disabled = false,
  icon,
  iconRight,
  className = '',
  type = 'button',
  ...props
}, ref) => {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold border rounded-xl transition-all duration-150 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2';

  const variants = {
    primary:   'bg-gradient-to-br from-orange-500 to-orange-600 text-white border-transparent shadow-[0_4px_14px_rgba(249,115,22,0.35)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.45)] hover:brightness-105 active:scale-[.98] focus-visible:outline-orange-500',
    secondary: 'bg-white text-orange-600 border-orange-300 hover:bg-orange-50 active:scale-[.98] focus-visible:outline-orange-500',
    ghost:     'bg-transparent text-stone-600 border-stone-200 hover:bg-stone-100 hover:text-stone-900 active:scale-[.98] focus-visible:outline-stone-400',
    danger:    'bg-red-600 text-white border-transparent shadow-sm hover:bg-red-700 active:scale-[.98] focus-visible:outline-red-500',
    link:      'bg-transparent border-transparent text-orange-600 hover:text-orange-700 p-0 gap-1',
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
    xl: 'px-8 py-4 text-lg',
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
        </svg>
      ) : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
});
Button.displayName = 'Button';

/* ── Input ─────────────────────────────────────────────────── */
export const Input = forwardRef(({
  label,
  hint,
  error,
  icon,
  iconRight,
  className = '',
  wrapperClassName = '',
  ...props
}, ref) => {
  return (
    <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
      {label && (
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide font-display">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={[
            'w-full px-4 py-3 bg-white border rounded-xl text-stone-900 text-sm placeholder:text-stone-400',
            'transition-all duration-150 outline-none',
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
              : 'border-stone-200 hover:border-stone-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100',
            icon && 'pl-10',
            iconRight && 'pr-10',
            className,
          ].join(' ')}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400">
            {iconRight}
          </div>
        )}
      </div>
      {error && <p className="text-xs text-red-500 flex items-center gap-1"><span>⚠</span>{error}</p>}
      {!error && hint && <p className="text-xs text-stone-400">{hint}</p>}
    </div>
  );
});
Input.displayName = 'Input';

/* ── Select ────────────────────────────────────────────────── */
export const Select = forwardRef(({
  label,
  hint,
  error,
  className = '',
  wrapperClassName = '',
  children,
  ...props
}, ref) => (
  <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
    {label && <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide font-display">{label}</label>}
    <div className="relative">
      <select
        ref={ref}
        className={[
          'w-full px-4 py-3 bg-white border rounded-xl text-stone-900 text-sm appearance-none',
          'transition-all duration-150 outline-none pr-9',
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
            : 'border-stone-200 hover:border-stone-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-100',
          className,
        ].join(' ')}
        {...props}
      >
        {children}
      </select>
      <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
    {error && <p className="text-xs text-red-500">{error}</p>}
    {!error && hint && <p className="text-xs text-stone-400">{hint}</p>}
  </div>
));
Select.displayName = 'Select';

/* ── Card ──────────────────────────────────────────────────── */
export const Card = ({ children, className = '', hover = true, padding = true, ...props }) => (
  <div
    className={[
      'bg-white border border-stone-100 rounded-2xl shadow-sm',
      hover && 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5',
      padding && 'p-6',
      className,
    ].filter(Boolean).join(' ')}
    {...props}
  >
    {children}
  </div>
);

/* ── Badge ─────────────────────────────────────────────────── */
export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-orange-50 border-orange-200 text-orange-700',
    green:   'bg-green-50 border-green-200 text-green-700',
    blue:    'bg-blue-50 border-blue-200 text-blue-700',
    red:     'bg-red-50 border-red-200 text-red-700',
    gray:    'bg-stone-100 border-stone-200 text-stone-600',
    gold:    'bg-amber-50 border-amber-200 text-amber-700',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold uppercase tracking-wide ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

/* ── Spinner ───────────────────────────────────────────────── */
export const Spinner = ({ size = 'md', className = '' }) => {
  const s = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-10 h-10', xl: 'w-16 h-16' };
  return (
    <svg className={`animate-spin text-orange-500 ${s[size]} ${className}`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
    </svg>
  );
};

/* ── LoadingPage ───────────────────────────────────────────── */
export const LoadingPage = ({ text = 'Loading...' }) => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
    <Spinner size="lg" />
    <p className="text-stone-500 text-sm font-medium">{text}</p>
  </div>
);

/* ── Skeleton ──────────────────────────────────────────────── */
export const Skeleton = ({ className = '', ...props }) => (
  <div className={`skeleton rounded-xl ${className}`} {...props} />
);

/* ── EmptyState ────────────────────────────────────────────── */
export const EmptyState = ({ icon = '🗺️', title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
    <div className="text-5xl mb-4">{icon}</div>
    {title && <h3 className="text-lg font-bold text-stone-800 mb-2 font-display">{title}</h3>}
    {description && <p className="text-stone-500 text-sm max-w-xs mb-6">{description}</p>}
    {action}
  </div>
);

/* ── Divider ───────────────────────────────────────────────── */
export const Divider = ({ label, className = '' }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="flex-1 h-px bg-stone-200" />
    {label && <span className="text-xs text-stone-400 font-medium px-1">{label}</span>}
    {label && <div className="flex-1 h-px bg-stone-200" />}
  </div>
);

/* ── StepIndicator ─────────────────────────────────────────── */
export const StepIndicator = ({ steps, current }) => (
  <div className="flex items-center gap-0 w-full max-w-sm mx-auto mb-8">
    {steps.map((step, i) => (
      <React.Fragment key={i}>
        <div className="flex flex-col items-center gap-1">
          <div className={[
            'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
            i < current  ? 'bg-orange-500 text-white' : '',
            i === current ? 'bg-orange-500 text-white ring-4 ring-orange-100 scale-110' : '',
            i > current  ? 'bg-stone-100 text-stone-400' : '',
          ].join(' ')}>
            {i < current ? '✓' : i + 1}
          </div>
          <span className={`text-[10px] font-semibold uppercase tracking-wide ${i === current ? 'text-orange-600' : 'text-stone-400'}`}>
            {step}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div className={`flex-1 h-0.5 mb-4 transition-all duration-300 ${i < current ? 'bg-orange-500' : 'bg-stone-200'}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

/* ── StarRating ────────────────────────────────────────────── */
export const StarRating = ({ value, max = 5, size = 'sm' }) => {
  const s = { sm: 'w-3.5 h-3.5', md: 'w-5 h-5', lg: 'w-6 h-6' };
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} className={`${s[size]} ${i < value ? 'text-amber-400' : 'text-stone-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
};

/* ── PageWrapper ───────────────────────────────────────────── */
export const PageWrapper = ({ children, className = '' }) => (
  <main className={`page-enter flex-1 ${className}`}>
    {children}
  </main>
);

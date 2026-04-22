import React from 'react';

/**
 * Loading Skeleton Components
 * Provides skeleton loading states for better UX during data fetching
 */

const shimmer = `relative overflow-hidden bg-gray-200 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white before:to-transparent`;

const LoadingSkeleton = ({ className }) => (
  <div className={`${shimmer} ${className}`} />
);

export default LoadingSkeleton;

// Card Skeleton
export const CardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
    <LoadingSkeleton className="aspect-[4/3] w-full" />
    <div className="p-4 space-y-3">
      <LoadingSkeleton className="h-6 w-3/4 rounded" />
      <LoadingSkeleton className="h-4 w-1/2 rounded" />
      <div className="flex gap-2">
        <LoadingSkeleton className="h-8 w-16 rounded-full" />
        <LoadingSkeleton className="h-8 w-16 rounded-full" />
      </div>
    </div>
  </div>
);

// Booking Row Skeleton
export const BookingRowSkeleton = () => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100">
    <LoadingSkeleton className="w-12 h-12 rounded-xl" />
    <div className="flex-1 space-y-2">
      <LoadingSkeleton className="h-5 w-48 rounded" />
      <LoadingSkeleton className="h-4 w-32 rounded" />
    </div>
    <div className="text-right space-y-2">
      <LoadingSkeleton className="h-5 w-20 rounded" />
      <LoadingSkeleton className="h-4 w-16 rounded" />
    </div>
  </div>
);

// Destination Card Skeleton
export const DestinationCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
    <LoadingSkeleton className="aspect-video w-full" />
    <div className="p-4 space-y-3">
      <LoadingSkeleton className="h-6 w-3/4 rounded" />
      <LoadingSkeleton className="h-4 w-full rounded" />
      <LoadingSkeleton className="h-4 w-2/3 rounded" />
      <div className="flex justify-between items-center pt-2">
        <LoadingSkeleton className="h-8 w-20 rounded" />
        <LoadingSkeleton className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  </div>
);

// Flight Card Skeleton
export const FlightCardSkeleton = () => (
  <div className="p-5 rounded-2xl border-2 border-gray-100">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <LoadingSkeleton className="w-10 h-10 rounded-xl" />
        <div className="space-y-2">
          <LoadingSkeleton className="h-5 w-24 rounded" />
          <LoadingSkeleton className="h-4 w-16 rounded" />
        </div>
        <div className="flex items-center gap-3">
          <div className="space-y-2">
            <LoadingSkeleton className="h-6 w-12 rounded" />
            <LoadingSkeleton className="h-4 w-8 rounded" />
          </div>
          <LoadingSkeleton className="w-12 h-px" />
          <div className="space-y-2">
            <LoadingSkeleton className="h-6 w-12 rounded" />
            <LoadingSkeleton className="h-4 w-8 rounded" />
          </div>
        </div>
      </div>
      <div className="text-right space-y-2">
        <LoadingSkeleton className="h-8 w-20 rounded" />
        <LoadingSkeleton className="h-4 w-16 rounded" />
      </div>
    </div>
  </div>
);

// Offer Card Skeleton
export const OfferCardSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 p-4">
    <div className="flex items-start gap-4 mb-4">
      <LoadingSkeleton className="w-12 h-12 rounded-xl" />
      <div className="space-y-2">
        <LoadingSkeleton className="h-6 w-24 rounded" />
        <LoadingSkeleton className="h-5 w-20 rounded" />
      </div>
    </div>
    <div className="space-y-3">
      <LoadingSkeleton className="h-5 w-3/4 rounded" />
      <LoadingSkeleton className="h-4 w-full rounded" />
      <LoadingSkeleton className="h-4 w-2/3 rounded" />
    </div>
    <LoadingSkeleton className="h-10 w-full mt-4 rounded-lg" />
  </div>
);

// Profile Skeleton
export const ProfileSkeleton = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <LoadingSkeleton className="w-20 h-20 rounded-full" />
      <div className="space-y-2">
        <LoadingSkeleton className="h-6 w-32 rounded" />
        <LoadingSkeleton className="h-4 w-48 rounded" />
      </div>
    </div>
    <div className="space-y-3">
      <LoadingSkeleton className="h-12 w-full rounded-lg" />
      <LoadingSkeleton className="h-12 w-full rounded-lg" />
      <LoadingSkeleton className="h-12 w-full rounded-lg" />
    </div>
  </div>
);

// Stat Card Skeleton
export const StatCardSkeleton = () => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-100">
    <LoadingSkeleton className="w-12 h-12 rounded-xl" />
    <div className="space-y-2">
      <LoadingSkeleton className="h-6 w-16 rounded" />
      <LoadingSkeleton className="h-4 w-24 rounded" />
    </div>
  </div>
);

// Table Skeleton
export const TableSkeleton = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100">
        <LoadingSkeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <LoadingSkeleton className="h-5 w-48 rounded" />
          <LoadingSkeleton className="h-4 w-32 rounded" />
        </div>
        <LoadingSkeleton className="h-8 w-20 rounded" />
      </div>
    ))}
  </div>
);

// Add shimmer animation to global styles
export const shimmerStyle = `
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

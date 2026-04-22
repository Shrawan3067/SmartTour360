import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

// Star Rating Component
export const StarRating = ({ rating, onRate, size = 'md', readonly = false }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const handleClick = (star) => {
    if (!readonly && onRate) {
      onRate(star);
    }
  };

  const handleMouseEnter = (star) => {
    if (!readonly) {
      setHoverRating(star);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
          disabled={readonly}
          className={`${sizeClasses[size]} transition-transform hover:scale-110 ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <svg
            className={`w-full h-full ${
              star <= (hoverRating || rating)
                ? 'text-amber-500'
                : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

// Review Form Component
export const ReviewForm = ({ destinationId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (!comment.trim()) {
      setError('Please write a review');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const result = await apiService.submitReview({
        destinationId,
        rating,
        comment
      });

      if (result.success) {
        setRating(0);
        setComment('');
        if (onReviewSubmitted) {
          onReviewSubmitted(result.review);
        }
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Review</h3>
      
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating *
          </label>
          <StarRating rating={rating} onRate={setRating} size="lg" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Share your experience with this destination..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

// Review List Component
export const ReviewList = ({ destinationId, limit = 5 }) => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationId]);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getReviews(destinationId);
      setReviews(data.reviews || []);
    } catch (err) {
      console.error('Error loading reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  const displayReviews = limit ? reviews.slice(0, limit) : reviews;

  if (displayReviews.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-2">📝</div>
        <p className="text-gray-600">No reviews yet. Be the first to review!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {displayReviews.map((review) => (
        <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center text-white text-xl font-bold">
              {review.avatar || review.user.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">{review.user}</h4>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <StarRating rating={review.rating} readonly size="sm" />
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Rating Summary Component
export const RatingSummary = ({ destinationId }) => {
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinationId]);

  const loadSummary = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getReviews(destinationId);
      const reviews = data.reviews || [];
      
      if (reviews.length === 0) {
        setSummary(null);
        return;
      }

      const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      const ratingCounts = [1, 2, 3, 4, 5].map(rating => ({
        rating,
        count: reviews.filter(r => r.rating === rating).length
      }));

      setSummary({
        averageRating: averageRating.toFixed(1),
        totalReviews: reviews.length,
        ratingCounts
      });
    } catch (err) {
      console.error('Failed to load rating summary:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-600">No ratings yet</p>
      </div>
    );
  }

  const getPercentage = (count) => {
    return (count / summary.totalReviews) * 100;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-6 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900">{summary.averageRating}</div>
          <StarRating rating={Math.round(summary.averageRating)} readonly size="md" />
          <p className="text-sm text-gray-500 mt-1">{summary.totalReviews} reviews</p>
        </div>
      </div>

      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = summary.ratingCounts.find(r => r.rating === rating)?.count || 0;
          const percentage = getPercentage(count);
          
          return (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm text-gray-600 w-8">{rating} ★</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Complete Review Section Component
export const ReviewSection = ({ destinationId }) => {
  const [showForm, setShowForm] = useState(false);

  const handleReviewSubmitted = () => {
    setShowForm(false);
    // Force re-render of review list
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
          >
            Write a Review
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RatingSummary destinationId={destinationId} />
        </div>
        <div className="lg:col-span-2">
          {showForm ? (
            <ReviewForm
              destinationId={destinationId}
              onReviewSubmitted={handleReviewSubmitted}
            />
          ) : (
            <ReviewList destinationId={destinationId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;

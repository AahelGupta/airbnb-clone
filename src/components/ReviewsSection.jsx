/**
 * ReviewsSection Component
 *
 * Displays a listing's rating breakdown, user reviews,
 * and a form to submit a new review.
 *
 * @component
 * @param {object} props
 * @param {object} props.listing - The listing object containing reviews and ratings.
 */
import React, { useState } from 'react';
import { Star, MessageSquarePlus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ReviewsSection({ listing }) {
  const { addReviewToListing, showToast } = useApp();
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setErrorMsg('Please fill in all fields.');
      return;
    }
    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await addReviewToListing(listing.id, {
        name,
        rating,
        comment,
      });
      setName('');
      setComment('');
      setRating(5);
      showToast('Your review has been posted! ⭐', 'success');
    } catch (err) {
      setErrorMsg('Failed to post review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!listing) return null;

  return (
    <div className="w-full">
      <h3 className="text-lg font-bold mb-5 flex items-center gap-2 text-gray-900 dark:text-white">
        <Star size={18} className="fill-yellow-500 stroke-yellow-500 text-yellow-500" />
        <span>{listing.rating.toFixed(2)} · {listing.reviewCount} reviews</span>
      </h3>

      {/* Rating Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3.5 mb-8">
        {Object.entries(listing.ratingBreakdown).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between text-xs md:text-sm">
            <span className="text-gray-600 dark:text-neutral-400 font-medium capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
            </span>
            <div className="flex items-center gap-3 w-1/2">
              <div className="w-full bg-gray-200 dark:bg-neutral-700 h-1.5 rounded-full overflow-hidden" aria-hidden="true">
                <div 
                  className="bg-rose-500 h-full rounded-full" 
                  style={{ width: `${(val / 5.0) * 100}%` }}
                />
              </div>
              <span className="font-semibold text-gray-800 dark:text-neutral-200">{val.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-5">
        {listing.reviews.map((rev, index) => (
          <div key={index} className="p-4 rounded-xl border border-gray-100 dark:border-neutral-800 bg-gray-50/30 dark:bg-neutral-800/10">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={rev.avatar} 
                alt={rev.name} 
                className="w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-neutral-700" 
              />
              <div>
                <h4 className="font-semibold text-sm text-gray-800 dark:text-neutral-200">{rev.name}</h4>
                <span className="text-xs text-gray-400 dark:text-neutral-500">{rev.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  className={i < Number(rev.rating || 5) ? 'fill-yellow-500 stroke-yellow-500 text-yellow-500' : 'text-gray-300 dark:text-neutral-700'} 
                />
              ))}
            </div>
            <p className="text-sm text-gray-700 dark:text-neutral-300 leading-relaxed">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>

      {/* Add Review Form */}
      <div className="mt-10 pt-8 border-t border-gray-200 dark:border-neutral-800 text-gray-900 dark:text-white">
        <h4 className="text-base md:text-lg font-bold mb-4 flex items-center gap-2">
          <MessageSquarePlus size={20} className="text-rose-500" />
          <span>Write a review</span>
        </h4>
        <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4">
          {errorMsg && (
            <div className="text-xs font-semibold text-rose-500 bg-rose-50 dark:bg-rose-950/20 p-2.5 rounded-lg border border-rose-100 dark:border-rose-900/50 animate-pulse">
              {errorMsg}
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 dark:text-white transition duration-150"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900 dark:text-white transition duration-150"
              >
                <option value={5}>★★★★★ (5 stars)</option>
                <option value={4}>★★★★☆ (4 stars)</option>
                <option value={3}>★★★☆☆ (3 stars)</option>
                <option value={2}>★★☆☆☆ (2 stars)</option>
                <option value={1}>★☆☆☆☆ (1 star)</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400">Comments</label>
            <textarea
              placeholder="What did you think of your stay? What was great or what can be improved?"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none dark:text-white transition duration-150"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto self-end bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white font-semibold px-6 py-2.5 rounded-xl transition duration-150 shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>{isSubmitting ? 'Posting...' : 'Submit Review'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}

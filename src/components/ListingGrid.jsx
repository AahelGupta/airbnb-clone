/**
 * ListingGrid Component
 *
 * Renders the main grid of property listing cards. Handles loading skeletons,
 * error states, empty-wishlist view, and no-results-found states.
 * Supports filtering by wishlist toggle and search filters via AppContext.
 *
 * @component
 */
import React from 'react';
import { useApp } from '../context/AppContext';
import ListingCard from './ListingCard';
import ErrorBoundary from './ErrorBoundary';
import { HelpCircle, RefreshCw } from 'lucide-react';

export default function ListingGrid() {
  const { listings, isLoading, error, loadListings, resetFilters, showWishlistOnly, setShowWishlistOnly, favorites } = useApp();

  const displayedListings = showWishlistOnly 
    ? listings.filter((l) => favorites.includes(l.id))
    : listings;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4 max-w-md mx-auto">
        <div className="w-16 h-16 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-full flex items-center justify-center mb-5" aria-hidden="true">
          <svg className="w-8 h-8 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Unable to Load Listings</h3>
        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-2 leading-relaxed">
          {error}
        </p>
        <button
          onClick={loadListings}
          className="mt-6 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-semibold rounded-xl transition duration-150 text-sm shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <RefreshCw size={14} />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, idx) => (
          <div key={idx} className="flex flex-col gap-3 animate-pulse" aria-hidden="true">
            <div className="aspect-square w-full bg-gray-200 dark:bg-neutral-800 rounded-xl" />
            <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded-md w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded-md w-1/2" />
            <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded-md w-1/3" />
            <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded-md w-1/4 mt-1" />
          </div>
        ))}
      </div>
    );
  }

  if (displayedListings.length === 0) {
    if (showWishlistOnly) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center px-4 max-w-md mx-auto">
          <div className="w-16 h-16 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-full flex items-center justify-center mb-5" aria-hidden="true">
            <svg className="w-8 h-8 stroke-[1.5] fill-rose-500/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create your first wishlist</h3>
          <p className="text-sm text-gray-500 dark:text-neutral-400 mt-2 leading-relaxed">
            As you search, click the heart icon on your favorite places to save them here.
          </p>
          <button
            onClick={() => setShowWishlistOnly(false)}
            className="mt-6 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-semibold rounded-xl transition duration-155 text-sm shadow-md"
          >
            Start browsing
          </button>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <HelpCircle size={48} className="text-gray-400 dark:text-neutral-500 mb-4 stroke-[1.5]" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">No homes found</h3>
        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-1 max-w-xs">
          Try changing or clearing your search filters to explore other luxury listings.
        </p>
        <button
          onClick={resetFilters}
          className="mt-5 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl hover:opacity-90 active:scale-95 transition text-sm"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {showWishlistOnly && (
        <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-neutral-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Wishlists</h2>
          <button
            onClick={() => setShowWishlistOnly(false)}
            className="text-xs font-semibold text-rose-500 hover:underline"
          >
            Show all homes
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
        {displayedListings.map((listing) => (
          <ErrorBoundary key={listing.id} mini>
            <ListingCard listing={listing} />
          </ErrorBoundary>
        ))}
      </div>
    </div>
  );
}

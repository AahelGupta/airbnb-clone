/**
 * ListingCard Component
 *
 * Displays a single property listing as a card with an image carousel,
 * wishlist toggle, rating, price, and availability date range.
 * Navigates to the listing detail page on click.
 *
 * @component
 * @param {object} props
 * @param {object} props.listing - The listing data object.
 */
import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ListingCard = memo(function ListingCard({ listing }) {
  const { favorites, toggleFavorite } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isFavorite = favorites.includes(listing.id);
  const isGuestFavorite = listing.rating >= 4.95;

  const nextImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  // Format a friendly date range from today + offset
  const formatDateRange = () => {
    const start = new Date();
    start.setDate(start.getDate() + (listing.id % 15) + 3);
    const end = new Date(start);
    end.setDate(end.getDate() + 5);
    const opts = { month: 'short', day: 'numeric' };
    return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', opts)}`;
  };

  return (
    <Link 
      to={`/listing/${listing.id}`}
      className="group cursor-pointer flex flex-col gap-3 w-full bg-white dark:bg-neutral-900 rounded-xl overflow-hidden transition duration-200 block text-left"
    >
      {/* Image Gallery Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800">
        
        {/* Guest Favorite Badge */}
        {isGuestFavorite && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
            <Award size={11} className="text-rose-500 fill-rose-500" />
            <span>Guest favorite</span>
          </div>
        )}

        {/* Heart Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            toggleFavorite(listing.id);
          }}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full hover:scale-110 active:scale-95 transition bg-transparent text-white drop-shadow-md"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={24} 
            className={`transition duration-150 ${isFavorite ? 'fill-rose-500 stroke-rose-500' : 'stroke-white fill-black/20'}`} 
          />
        </button>

        {/* Carousel Images */}
        <div className="relative w-full h-full flex transition-transform duration-300 ease-out" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
          {listing.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={listing.title}
              className="w-full h-full object-cover shrink-0 zoom-image"
              loading="lazy"
            />
          ))}
        </div>

        {/* Left Arrow Button */}
        {currentImageIndex > 0 && (
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-neutral-800/90 text-gray-800 dark:text-white p-1 rounded-full shadow-md hover:scale-105 transition opacity-0 group-hover:opacity-100 flex items-center justify-center"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
        )}

        {/* Right Arrow Button */}
        {currentImageIndex < listing.images.length - 1 && (
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-neutral-800/90 text-gray-800 dark:text-white p-1 rounded-full shadow-md hover:scale-105 transition opacity-0 group-hover:opacity-100 flex items-center justify-center"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>
        )}

        {/* Dot Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {listing.images.map((_, index) => (
            <span
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Listing Details */}
      <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-neutral-400">
        
        {/* Title and Rating */}
        <div className="flex justify-between items-start text-gray-900 dark:text-white font-semibold">
          <span className="truncate pr-2">{listing.title}</span>
          <div className="flex items-center gap-1 shrink-0 font-medium">
            <Star size={14} className="fill-yellow-500 stroke-yellow-500" />
            <span>{listing.rating.toFixed(2)}</span>
          </div>
        </div>

        {/* Type / Location */}
        <span className="text-gray-500 dark:text-neutral-400 leading-normal">{listing.location}</span>
        <span className="text-gray-400 dark:text-neutral-500 text-xs">{listing.type}</span>

        {/* Dynamic Date Range */}
        <span className="text-gray-400 dark:text-neutral-500 text-xs">{formatDateRange()}</span>

        {/* Price */}
        <div className="flex items-center gap-1 mt-1 text-gray-900 dark:text-white font-semibold">
          <span className="text-base">${listing.price}</span>
          <span className="text-gray-500 dark:text-neutral-400 font-normal">night</span>
        </div>

      </div>

    </Link>
  );
});

export default ListingCard;

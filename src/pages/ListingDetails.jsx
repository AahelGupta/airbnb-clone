import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { ArrowLeft, Star, Trophy, ShieldCheck, Check, Images, MapPin } from 'lucide-react';
import BookingWidget from '../components/BookingWidget';
import ReviewsSection from '../components/ReviewsSection';

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await api.getListingById(id);
        if (active) {
          setListing(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to load details.');
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };
    fetchDetails();
    return () => {
      active = false;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="h-6 bg-gray-200 dark:bg-neutral-800 rounded w-1/4 mb-4" />
        <div className="h-8 bg-gray-200 dark:bg-neutral-800 rounded w-1/2 mb-6" />
        <div className="aspect-video md:aspect-[2.2/1] w-full bg-gray-200 dark:bg-neutral-800 rounded-xl mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="h-20 bg-gray-200 dark:bg-neutral-800 rounded-xl w-full" />
            <div className="h-40 bg-gray-200 dark:bg-neutral-800 rounded-xl w-full" />
          </div>
          <div className="lg:col-span-1">
            <div className="h-80 bg-gray-200 dark:bg-neutral-800 rounded-xl w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4 max-w-md mx-auto">
        <div className="w-16 h-16 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-full flex items-center justify-center mb-5">
          <svg className="w-8 h-8 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Listing Not Found</h3>
        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-2">
          {error || 'The requested listing details could not be retrieved.'}
        </p>
        <Link
          to="/"
          className="mt-6 px-6 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl transition duration-150 text-sm shadow-md"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 text-gray-900 dark:text-white transition-colors duration-200">
      
      {/* Back Button */}
      <div className="flex items-center">
        <Link 
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition"
        >
          <ArrowLeft size={16} />
          <span>Back to all homes</span>
        </Link>
      </div>

      {/* Property Heading */}
      <div>
        <h1 className="text-xl md:text-3xl font-bold tracking-tight text-gray-950 dark:text-white mb-2 leading-snug">
          {listing.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-neutral-400 font-medium">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-500 stroke-yellow-500 text-yellow-500" />
            <span className="text-gray-900 dark:text-white font-semibold">{listing.rating.toFixed(2)}</span>
            <span>·</span>
            <span className="underline cursor-pointer">{listing.reviewCount} reviews</span>
          </div>
          <span>·</span>
          <span className="underline cursor-pointer">{listing.location}, {listing.country}</span>
        </div>
      </div>

      {/* Grid Image Gallery */}
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3 rounded-xl overflow-hidden aspect-video md:aspect-[2.2/1] bg-gray-100 dark:bg-neutral-800">
        <div className="md:col-span-2 h-full overflow-hidden">
          <img 
            src={listing.images[0]} 
            alt={listing.title}
            className="w-full h-full object-cover zoom-image hover:scale-100" 
          />
        </div>
        <div className="hidden md:flex flex-col gap-3 h-full">
          <div className="flex-1 overflow-hidden">
            <img 
              src={listing.images[1] || listing.images[0]} 
              alt={listing.title}
              className="w-full h-full object-cover zoom-image" 
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <img 
              src={listing.images[2] || listing.images[0]} 
              alt={listing.title}
              className="w-full h-full object-cover zoom-image" 
            />
          </div>
        </div>

        {/* Show all photos button */}
        <button
          onClick={() => setShowGallery(true)}
          className="absolute bottom-4 right-4 flex items-center gap-2 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white border border-gray-300 dark:border-neutral-700 text-xs font-semibold px-3 py-2 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 dark:hover:bg-neutral-800 transition duration-150"
        >
          <Images size={14} />
          Show all photos ({listing.images.length})
        </button>
      </div>

      {/* Full-screen Photo Gallery Modal */}
      {showGallery && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 animate-slide-up"
          onClick={() => setShowGallery(false)}
        >
          <button
            className="absolute top-5 right-5 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition"
            onClick={() => setShowGallery(false)}
            aria-label="Close gallery"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <p className="text-white/60 text-xs mb-4 font-medium">Click anywhere to close</p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl w-full overflow-y-auto max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {listing.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${listing.title} photo ${idx + 1}`}
                className="w-full rounded-xl object-cover aspect-video"
              />
            ))}
          </div>
        </div>
      )}

      {/* Body Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-2">
        
        {/* Left Column (Info, Host, Amenities, Reviews, Map) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Host and Rooms Info */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200 dark:border-neutral-800">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-1">
                Hosted by {listing.host.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-400">
                {listing.bedrooms} bedrooms · {listing.beds} beds · {listing.bathrooms} bathrooms · {listing.guests} guests max
              </p>
            </div>
            <img 
              src={listing.host.avatar} 
              alt={listing.host.name} 
              className="w-14 h-14 rounded-full object-cover border-2 border-rose-500"
            />
          </div>

          {/* Host highlights */}
          <div className="flex flex-col gap-4 pb-6 border-b border-gray-200 dark:border-neutral-800">
            {listing.host.isSuperhost && (
              <div className="flex gap-4">
                <Trophy className="text-rose-500 shrink-0 mt-0.5" size={24} />
                <div>
                  <h4 className="font-semibold text-sm md:text-base">{listing.host.name} is a Superhost</h4>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-neutral-400">Superhosts are experienced, highly rated hosts committed to providing great stays.</p>
                </div>
              </div>
            )}
            <div className="flex gap-4">
              <ShieldCheck className="text-rose-500 shrink-0 mt-0.5" size={24} />
              <div>
                <h4 className="font-semibold text-sm md:text-base">Free cancellation</h4>
                <p className="text-xs md:text-sm text-gray-500 dark:text-neutral-400">Cancel within 48 hours for a full refund.</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="pb-6 border-b border-gray-200 dark:border-neutral-800">
            <p className="text-sm md:text-base leading-relaxed text-gray-700 dark:text-neutral-300">
              {listing.description}
            </p>
          </div>

          {/* Amenities */}
          <div className="pb-6 border-b border-gray-200 dark:border-neutral-800">
            <h3 className="text-lg font-bold mb-4">What this place offers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {listing.amenities.map((amenity) => (
                <div key={amenity} className="flex items-center gap-3 text-sm text-gray-700 dark:text-neutral-300 font-medium">
                  <div className="p-1 rounded-md bg-gray-100 dark:bg-neutral-800 text-rose-500">
                    <Check size={16} />
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="pb-6 border-b border-gray-200 dark:border-neutral-800">
            <ReviewsSection listing={listing} />
          </div>

          {/* Where you'll be — Map placeholder */}
          <div className="pb-2">
            <h3 className="text-lg font-bold mb-1">Where you'll be</h3>
            <p className="text-sm text-gray-500 dark:text-neutral-400 mb-4 flex items-center gap-1.5">
              <MapPin size={14} className="text-rose-500" />
              {listing.location}, {listing.country}
            </p>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50 dark:from-neutral-800 dark:to-neutral-700 border border-gray-200 dark:border-neutral-700 flex items-center justify-center shadow-sm">
              {/* Decorative map-like grid */}
              <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-10" viewBox="0 0 600 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                {[...Array(12)].map((_, i) => (
                  <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="340" stroke="#94a3b8" strokeWidth="1" />
                ))}
                {[...Array(7)].map((_, i) => (
                  <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} stroke="#94a3b8" strokeWidth="1" />
                ))}
                <path d="M50 280 Q150 200 250 220 Q350 240 450 180 Q520 140 580 100" stroke="#64748b" strokeWidth="2.5" fill="none" />
                <path d="M0 150 Q100 130 200 160 Q300 190 400 140 Q500 90 600 110" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
                <rect x="220" y="140" width="80" height="50" rx="4" fill="#e2e8f0" stroke="#cbd5e1" />
                <rect x="320" y="180" width="60" height="40" rx="4" fill="#e2e8f0" stroke="#cbd5e1" />
                <rect x="140" y="190" width="55" height="35" rx="4" fill="#e2e8f0" stroke="#cbd5e1" />
              </svg>
              {/* Pin */}
              <div className="relative flex flex-col items-center gap-2 z-10">
                <div className="w-12 h-12 bg-white dark:bg-neutral-900 rounded-full shadow-xl flex items-center justify-center border-2 border-rose-500">
                  <MapPin size={22} className="text-rose-500 fill-rose-100" />
                </div>
                <div className="bg-white dark:bg-neutral-900 rounded-xl px-4 py-2 shadow-lg text-center border border-gray-100 dark:border-neutral-700">
                  <p className="text-xs font-bold text-gray-900 dark:text-white">{listing.location}</p>
                  <p className="text-[10px] text-gray-400 dark:text-neutral-500 mt-0.5">{listing.country}</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 dark:text-neutral-500 mt-3">
              Exact location provided after booking.
            </p>
          </div>

        </div>

        {/* Right Column (Booking Widget) */}
        <div className="lg:col-span-1">
          <BookingWidget listing={listing} />
        </div>

      </div>

    </div>
  );
}

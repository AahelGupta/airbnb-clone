/**
 * SearchModal Component
 *
 * A full-featured filter modal for searching listings. Allows the user to
 * specify destination, max price range, number of guests, bedrooms, bathrooms,
 * and required amenities. On submission, applies filters via AppContext.
 *
 * @component
 * @param {object} props
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {function} props.onClose - Callback to close the modal.
 */
import React, { useState, useEffect } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

const AMENITY_OPTIONS = [
  'Wifi',
  'Kitchen',
  'Pool',
  'Hot tub',
  'Air conditioning',
  'Gym',
  'Fireplace',
  'Free parking',
];

export default function SearchModal({ isOpen, onClose }) {
  const { searchFilters, applyFilters } = useApp();
  const [destination, setDestination] = useState(searchFilters.destination || '');
  const [maxPrice, setMaxPrice] = useState(searchFilters.maxPrice || 2000);
  const [guests, setGuests] = useState(searchFilters.guests || 1);
  const [bedrooms, setBedrooms] = useState(searchFilters.bedrooms || 0);
  const [bathrooms, setBathrooms] = useState(searchFilters.bathrooms || 0);
  const [selectedAmenities, setSelectedAmenities] = useState(searchFilters.amenities || []);

  // Keyboard handler for Esc to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleAmenityToggle = (amenity) => {
    setSelectedAmenities((prev) => 
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleReset = () => {
    setDestination('');
    setMaxPrice(2000);
    setGuests(1);
    setBedrooms(0);
    setBathrooms(0);
    setSelectedAmenities([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    applyFilters({
      destination,
      maxPrice,
      guests,
      bedrooms,
      bathrooms,
      amenities: selectedAmenities,
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      
      {/* Modal Box */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up flex flex-col text-gray-900 dark:text-white transition-colors duration-200"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-neutral-800">
          <h2 id="search-modal-title" className="text-xl font-bold">Filters</h2>
          <button 
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          >
            <X size={20} className="text-gray-500 dark:text-neutral-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-8 flex-1">
          
          {/* Destination */}
          <div className="flex flex-col gap-2.5">
            <label className="text-sm font-semibold tracking-wide uppercase text-gray-400 dark:text-neutral-500">
              Where to?
            </label>
            <input
              type="text"
              placeholder="Search destinations (e.g. France, California, Kyoto)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 dark:placeholder-neutral-500 transition duration-150"
            />
          </div>

          {/* Price Range */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold tracking-wide uppercase text-gray-400 dark:text-neutral-500">
                Price range
              </label>
              <span className="text-base font-semibold text-rose-500">
                Up to ${maxPrice}/night
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="2000"
              step="25"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-xs text-gray-400 dark:text-neutral-500 font-medium">
              <span>$50</span>
              <span>$2,000+</span>
            </div>
          </div>

          {/* Counters (Guests, Bedrooms, Bathrooms) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Guests */}
            <div className="flex flex-col justify-between p-4 rounded-xl border border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/30 gap-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-neutral-300">Guests</span>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="p-1.5 rounded-full border border-gray-300 dark:border-neutral-600 hover:border-gray-800 dark:hover:border-white transition flex items-center justify-center"
                >
                  <Minus size={14} />
                </button>
                <span className="font-semibold text-base">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => g + 1)}
                  className="p-1.5 rounded-full border border-gray-300 dark:border-neutral-600 hover:border-gray-800 dark:hover:border-white transition flex items-center justify-center"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Bedrooms */}
            <div className="flex flex-col justify-between p-4 rounded-xl border border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/30 gap-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-neutral-300">Bedrooms</span>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setBedrooms((b) => Math.max(0, b - 1))}
                  className="p-1.5 rounded-full border border-gray-300 dark:border-neutral-600 hover:border-gray-800 dark:hover:border-white transition flex items-center justify-center"
                >
                  <Minus size={14} />
                </button>
                <span className="font-semibold text-base">{bedrooms === 0 ? 'Any' : bedrooms}</span>
                <button
                  type="button"
                  onClick={() => setBedrooms((b) => b + 1)}
                  className="p-1.5 rounded-full border border-gray-300 dark:border-neutral-600 hover:border-gray-800 dark:hover:border-white transition flex items-center justify-center"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Bathrooms */}
            <div className="flex flex-col justify-between p-4 rounded-xl border border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/30 gap-3">
              <span className="text-sm font-semibold text-gray-700 dark:text-neutral-300">Bathrooms</span>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setBathrooms((b) => Math.max(0, b - 1))}
                  className="p-1.5 rounded-full border border-gray-300 dark:border-neutral-600 hover:border-gray-800 dark:hover:border-white transition flex items-center justify-center"
                >
                  <Minus size={14} />
                </button>
                <span className="font-semibold text-base">{bathrooms === 0 ? 'Any' : bathrooms}</span>
                <button
                  type="button"
                  onClick={() => setBathrooms((b) => b + 1)}
                  className="p-1.5 rounded-full border border-gray-300 dark:border-neutral-600 hover:border-gray-800 dark:hover:border-white transition flex items-center justify-center"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

          </div>

          {/* Amenities */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold tracking-wide uppercase text-gray-400 dark:text-neutral-500">
              Amenities
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {AMENITY_OPTIONS.map((amenity) => {
                const isSelected = selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    type="button"
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`px-4 py-2.5 rounded-full border text-xs font-semibold text-center transition duration-150 ${
                      isSelected
                        ? 'bg-rose-500 border-rose-500 text-white shadow-sm'
                        : 'border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-300 hover:border-gray-400 dark:hover:border-neutral-500 bg-transparent'
                    }`}
                  >
                    {amenity}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-neutral-800 mt-auto">
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-semibold underline text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition"
            >
              Clear all
            </button>
            <button
              type="submit"
              className="bg-rose-500 hover:bg-rose-600 active:scale-95 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition duration-150"
            >
              Show homes
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}

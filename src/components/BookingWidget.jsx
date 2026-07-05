/**
 * BookingWidget Component
 *
 * A sticky booking panel on the listing detail page. Allows the user
 * to select check-in/check-out dates and number of guests, calculates
 * nightly base price, cleaning fee, and Airbnb service fee, and
 * creates a booking via AppContext.
 *
 * @component
 * @param {object} props
 * @param {object} props.listing - The listing object with price, guests, etc.
 */
import React, { useState } from 'react';
import { Star, Check, Sparkles, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

// Helper: format date as YYYY-MM-DD
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

export default function BookingWidget({ listing }) {
  const { addBooking } = useApp();

  // Dynamic default dates: today + 7 days check-in, + 12 days checkout
  const today = new Date();
  const defaultCheckIn = new Date(today);
  defaultCheckIn.setDate(today.getDate() + 7);
  const defaultCheckOut = new Date(today);
  defaultCheckOut.setDate(today.getDate() + 12);

  const [checkIn, setCheckIn] = useState(formatDate(defaultCheckIn));
  const [checkOut, setCheckOut] = useState(formatDate(defaultCheckOut));
  const [guestsCount, setGuestsCount] = useState(2);
  const [isBooked, setIsBooked] = useState(false);
  const [dateError, setDateError] = useState('');

  if (!listing) return null;

  // Calculate nights
  const date1 = new Date(checkIn);
  const date2 = new Date(checkOut);
  const diffTime = date2 - date1;
  const nights = diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;

  const basePrice = listing.price * (nights || 1);
  const cleaningFee = 60;
  const serviceFee = Math.round(basePrice * 0.12);
  const totalPrice = basePrice + cleaningFee + serviceFee;

  const handleCheckInChange = (e) => {
    const val = e.target.value;
    setCheckIn(val);
    setDateError('');
    // Ensure checkout is after checkin
    if (checkOut && val >= checkOut) {
      const next = new Date(val);
      next.setDate(next.getDate() + 1);
      setCheckOut(formatDate(next));
    }
  };

  const handleCheckOutChange = (e) => {
    const val = e.target.value;
    if (val <= checkIn) {
      setDateError('Check-out must be after check-in.');
    } else {
      setDateError('');
      setCheckOut(val);
    }
  };

  const handleBook = (e) => {
    e.preventDefault();
    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setDateError('Please select valid check-in and check-out dates.');
      return;
    }
    const newBooking = {
      id: Date.now(),
      listingId: listing.id,
      title: listing.title,
      image: listing.images[0],
      location: listing.location,
      price: listing.price,
      checkIn,
      checkOut,
      nights,
      guestsCount,
      totalPrice
    };
    addBooking(newBooking);
    setIsBooked(true);
  };

  if (isBooked) {
    return (
      <div className="sticky top-24 border border-green-200 dark:border-green-800/50 rounded-2xl p-6 shadow-xl bg-green-50/70 dark:bg-green-950/20 flex flex-col gap-6 text-center animate-slide-up">
        <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
          <Check size={36} className="stroke-[3.5px]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-green-950 dark:text-green-200 flex items-center justify-center gap-1.5">
            Booking Confirmed! <Sparkles size={18} className="text-yellow-500 fill-yellow-500" />
          </h3>
          <p className="text-xs text-green-700 dark:text-green-400 mt-1">
            Your stay has been successfully reserved.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-green-100 dark:border-neutral-800/80 rounded-xl p-4 text-left flex flex-col gap-2.5 text-xs text-gray-600 dark:text-neutral-400">
          <div className="flex justify-between font-medium">
            <span>Destination:</span>
            <span className="font-semibold text-gray-900 dark:text-white">{listing.location}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Nights:</span>
            <span className="font-semibold text-gray-900 dark:text-white">{nights} nights</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Dates:</span>
            <span className="font-semibold text-gray-900 dark:text-white">{checkIn} → {checkOut}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Guests:</span>
            <span className="font-semibold text-gray-900 dark:text-white">{guestsCount} guests</span>
          </div>
          <div className="flex justify-between font-medium pt-2 border-t border-gray-100 dark:border-neutral-800 text-sm font-bold text-gray-900 dark:text-white">
            <span>Paid:</span>
            <span className="text-green-600 dark:text-green-400">${totalPrice}</span>
          </div>
        </div>

        <button
          onClick={() => { setIsBooked(false); setDateError(''); }}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-bold shadow-md transition duration-150 active:scale-95"
        >
          Modify Reservation
        </button>
      </div>
    );
  }

  return (
    <div className="sticky top-24 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 shadow-xl bg-white dark:bg-neutral-900 flex flex-col gap-5">
      
      {/* Title pricing */}
      <div className="flex justify-between items-end">
        <div className="flex items-baseline gap-1 font-bold text-gray-900 dark:text-white">
          <span className="text-2xl">${listing.price}</span>
          <span className="text-gray-500 dark:text-neutral-400 text-sm font-normal">night</span>
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold">
          <Star size={14} className="fill-yellow-500 stroke-yellow-500" />
          <span>{listing.rating.toFixed(2)}</span>
          <span className="text-gray-400 dark:text-neutral-500 font-normal text-xs">({listing.reviewCount})</span>
        </div>
      </div>

      <form onSubmit={handleBook} className="flex flex-col gap-4">
        
        {/* Dates Selection */}
        <div className="border border-gray-300 dark:border-neutral-700 rounded-xl overflow-hidden grid grid-cols-2">
          <div className="p-3 border-r border-gray-300 dark:border-neutral-700 flex flex-col gap-1">
            <label htmlFor="checkin-date" className="text-[9px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
              Check-in
            </label>
            <input
              id="checkin-date"
              type="date"
              value={checkIn}
              min={formatDate(today)}
              onChange={handleCheckInChange}
              className="text-xs font-semibold bg-transparent focus:outline-none w-full dark:text-white cursor-pointer"
              required
            />
          </div>
          <div className="p-3 flex flex-col gap-1">
            <label htmlFor="checkout-date" className="text-[9px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
              Checkout
            </label>
            <input
              id="checkout-date"
              type="date"
              value={checkOut}
              min={checkIn || formatDate(today)}
              onChange={handleCheckOutChange}
              className="text-xs font-semibold bg-transparent focus:outline-none w-full dark:text-white cursor-pointer"
              required
            />
          </div>
        </div>

        {/* Date error message */}
        {dateError && (
          <div className="flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 rounded-lg px-3 py-2">
            <AlertCircle size={13} className="shrink-0" />
            {dateError}
          </div>
        )}

        {/* Guests selection */}
        <div className="border border-gray-300 dark:border-neutral-700 rounded-xl p-3 flex flex-col gap-1">
          <label htmlFor="guests-select" className="text-[9px] font-bold uppercase tracking-wider text-gray-500 dark:text-neutral-400">
            Guests
          </label>
          <select
            id="guests-select"
            value={guestsCount}
            onChange={(e) => setGuestsCount(Number(e.target.value))}
            className="text-xs font-semibold bg-transparent focus:outline-none w-full text-gray-900 dark:text-white cursor-pointer"
          >
            {[...Array(listing.guests)].map((_, i) => (
              <option key={i+1} value={i+1} className="text-gray-950 dark:text-white bg-white dark:bg-neutral-800">{i+1} guest{i > 0 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg active:scale-95 transition duration-150"
        >
          Reserve
        </button>

      </form>

      <p className="text-center text-xs text-gray-500 dark:text-neutral-400">
        You won't be charged yet
      </p>

      {/* Calculations */}
      {nights > 0 && (
        <div className="flex flex-col gap-3.5 pt-3 border-t border-gray-100 dark:border-neutral-800 text-sm">
          <div className="flex justify-between text-gray-600 dark:text-neutral-400">
            <span className="underline">${listing.price} x {nights} nights</span>
            <span className="font-semibold text-gray-800 dark:text-neutral-200">${basePrice}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-neutral-400">
            <span className="underline">Cleaning fee</span>
            <span className="font-semibold text-gray-800 dark:text-neutral-200">${cleaningFee}</span>
          </div>
          <div className="flex justify-between text-gray-600 dark:text-neutral-400">
            <span className="underline">Airbnb service fee</span>
            <span className="font-semibold text-gray-800 dark:text-neutral-200">${serviceFee}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-3.5 border-t border-gray-100 dark:border-neutral-800 text-gray-900 dark:text-white">
            <span>Total before taxes</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      )}

    </div>
  );
}

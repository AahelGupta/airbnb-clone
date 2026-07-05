/**
 * TripsModal Component
 *
 * A modal dialog showing the user's booked trips with details
 * (dates, guests, cost) and the ability to cancel a reservation.
 * Uses toast notifications instead of browser alert/confirm dialogs.
 *
 * @component
 * @param {object} props
 * @param {boolean} props.isOpen - Whether the modal is open.
 * @param {function} props.onClose - Callback to close the modal.
 */
import React, { useEffect, useState } from 'react';
import { X, Calendar, Users, DollarSign, Trash2, Compass, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function TripsModal({ isOpen, onClose }) {
  const { bookings, cancelBooking, showToast } = useApp();
  // Track which booking ID is pending confirmation of cancellation
  const [pendingCancelId, setPendingCancelId] = useState(null);

  // Close on Escape key press
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

  /**
   * Initiates the cancel flow — shows an inline confirmation prompt.
   * @param {number} bookingId - The ID of the booking to cancel.
   */
  const handleCancelRequest = (bookingId) => {
    setPendingCancelId(bookingId);
  };

  /**
   * Confirms and executes the cancellation, then shows a toast.
   */
  const confirmCancel = () => {
    cancelBooking(pendingCancelId);
    setPendingCancelId(null);
    showToast('Reservation cancelled successfully.', 'info');
  };

  /**
   * Aborts the pending cancellation.
   */
  const abortCancel = () => setPendingCancelId(null);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      
      {/* Modal Box */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="trips-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl animate-slide-up flex flex-col text-gray-900 dark:text-white transition-colors duration-200"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-neutral-800">
          <h2 id="trips-modal-title" className="text-xl font-bold flex items-center gap-2">
            Your Trips
          </h2>
          <button 
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          >
            <X size={20} className="text-gray-500 dark:text-neutral-400" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-6 flex-1">
          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Compass size={48} className="text-gray-400 dark:text-neutral-500 mb-4 stroke-[1.5]" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">No trips booked yet</h3>
              <p className="text-sm text-gray-500 dark:text-neutral-400 mt-2 max-w-xs leading-relaxed">
                Time to dust off your bags and start planning your next getaway.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-2.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-semibold rounded-xl transition duration-155 text-sm shadow-md cursor-pointer"
              >
                Browse destinations
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {bookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-800/20 hover:shadow-xs transition duration-150"
                >
                  {/* Property Image */}
                  <img 
                    src={booking.image} 
                    alt={booking.title} 
                    className="w-full sm:w-28 sm:h-28 aspect-video sm:aspect-square rounded-lg object-cover bg-gray-100 dark:bg-neutral-800"
                  />
                  
                  {/* Booking Info */}
                  <div className="flex-1 flex flex-col justify-between gap-2.5">
                    <div>
                      <h4 className="font-bold text-gray-950 dark:text-white text-base truncate leading-snug">
                        {booking.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-neutral-400">{booking.location}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs text-gray-600 dark:text-neutral-300 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-rose-500" />
                        <span>{booking.checkIn} to {booking.checkOut}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-rose-500" />
                        <span>{booking.guestsCount} guest{booking.guestsCount > 1 ? 's' : ''} · {booking.nights} night{booking.nights > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-bold text-gray-900 dark:text-white">
                        <DollarSign size={14} className="text-green-600 dark:text-green-400" />
                        <span>Paid: ${booking.totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cancel Button */}
                  <button
                    onClick={() => handleCancelRequest(booking.id)}
                    className="sm:self-center p-2 rounded-xl text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-transparent hover:border-rose-100 dark:hover:border-rose-950 transition flex items-center justify-center gap-2 text-xs font-bold cursor-pointer"
                    title="Cancel reservation"
                  >
                    <Trash2 size={16} />
                    <span className="sm:hidden">Cancel Reservation</span>
                  </button>

                  {/* Inline confirmation prompt */}
                  {pendingCancelId === booking.id && (
                    <div className="sm:self-center flex flex-col items-center gap-2 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 rounded-xl p-3 text-xs animate-fade-in">
                      <div className="flex items-center gap-1.5 font-semibold text-rose-600 dark:text-rose-400">
                        <AlertTriangle size={13} />
                        Cancel this trip?
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={confirmCancel}
                          className="px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg transition active:scale-95"
                        >
                          Yes, cancel
                        </button>
                        <button
                          onClick={abortCancel}
                          className="px-3 py-1.5 border border-gray-300 dark:border-neutral-600 text-gray-600 dark:text-neutral-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition active:scale-95"
                        >
                          Keep it
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

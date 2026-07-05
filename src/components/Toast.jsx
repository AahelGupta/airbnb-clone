/**
 * Toast / ToastContainer Components
 *
 * A lightweight toast notification system that renders animated pop-up
 * messages at the bottom-center of the screen. Supports 'success',
 * 'error', and 'info' types. Each toast auto-dismisses after its
 * configured duration and can be manually dismissed.
 *
 * @module Toast
 */
import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ICONS = {
  success: <CheckCircle size={18} className="text-green-500 shrink-0" />,
  error: <AlertCircle size={18} className="text-rose-500 shrink-0" />,
  info: <Info size={18} className="text-blue-500 shrink-0" />,
};

function ToastItem({ toast, onDismiss }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const enterTimer = setTimeout(() => setVisible(true), 10);
    // Auto-dismiss
    const exitTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss(toast.id), 350);
    }, toast.duration || 3500);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [toast.id, toast.duration, onDismiss]);

  return (
    <div
      className={`flex items-start gap-3 bg-white dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 rounded-xl px-4 py-3 shadow-xl max-w-sm w-full text-sm text-gray-800 dark:text-neutral-100 transition-all duration-300 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {ICONS[toast.type] || ICONS.info}
      <span className="flex-1 leading-snug font-medium">{toast.message}</span>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => onDismiss(toast.id), 350);
        }}
        className="text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:hover:text-neutral-300 transition shrink-0 mt-0.5"
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center pointer-events-none"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full max-w-sm">
          <ToastItem toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}

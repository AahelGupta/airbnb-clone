/**
 * AuthModal Component
 *
 * A modal dialog for user authentication (Login / Sign Up).
 * Uses the AppContext for login logic and toast notifications.
 *
 * @component
 * @param {object} props
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {function} props.onClose - Callback to close the modal.
 */
import React, { useState, useEffect } from 'react';
import { X, Mail, Lock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthModal({ isOpen, onClose }) {
  const { loginUser, showToast } = useApp();
  const [email, setEmail] = useState('guest@example.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Alex Morgan');
  const [isSignUp, setIsSignUp] = useState(false);

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
   * Handles form submission for login or sign-up.
   * On success, shows a success toast and closes the modal.
   * On failure, shows an error toast.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password, isSignUp ? name : 'Alex Morgan');
      showToast(`Welcome back, ${user.name}! 🎉`, 'success');
      onClose();
    } catch (err) {
      showToast(`Login failed: ${err.message}`, 'error');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl w-full max-w-md shadow-2xl animate-slide-up flex flex-col text-gray-900 dark:text-white overflow-hidden transition-colors duration-200"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-neutral-800">
          <h3 id="auth-modal-title" className="font-bold text-base md:text-lg">
            {isSignUp ? 'Sign up' : 'Log in'}
          </h3>
          <button 
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
          >
            <X size={18} className="text-gray-500 dark:text-neutral-400" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          
          <h2 className="text-xl font-bold leading-tight">
            Welcome to Airbnb
          </h2>

          {isSignUp && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="email@example.com"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-neutral-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full mt-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:opacity-95 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition duration-150"
          >
            Continue
          </button>

          {/* Alternative login method */}
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-neutral-400 mt-2">
            <span>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-rose-500 font-semibold hover:underline"
            >
              {isSignUp ? 'Log in' : 'Sign up'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

/**
 * Header Component
 *
 * The main sticky navigation bar for the Airbnb clone.
 * Contains the logo, search bar, wishlist toggle, theme switcher,
 * language selector, and user profile menu with auth actions.
 *
 * @component
 */
import React, { useState, useEffect, useRef, memo } from 'react';
import { Search, Globe, Menu, User, Sun, Moon, LogOut, MessageSquare, Briefcase, Heart, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header = memo(function Header() {
  const {
    darkMode,
    setDarkMode,
    setIsSearchOpen,
    setIsAuthOpen,
    currentUser: user,
    logoutUser,
    favorites,
    searchFilters,
    showWishlistOnly,
    setShowWishlistOnly,
    setIsTripsOpen,
    resetFilters,
    showToast,
  } = useApp();

  const favoriteCount = favorites.length;
  const guestCount = searchFilters.guests;
  const searchQuery = searchFilters;
  const onOpenSearch = () => setIsSearchOpen(true);
  const onLoginClick = () => setIsAuthOpen(true);
  
  const onLogout = () => {
    logoutUser();
    showToast('You have been logged out successfully.', 'info');
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center cursor-pointer gap-1.5" onClick={() => { setShowWishlistOnly(false); resetFilters(); }}>
          <svg
            className="h-8 w-auto text-rose-500 fill-current"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.01.415v.232c0 4.026-2.99 7.474-6.864 7.474-2.553 0-5.702-1.99-6.59-2.89l-.046-.048c-.046-.048-.094-.099-.143-.15-.049.05-.097.102-.143.15l-.046.049c-.888.9-4.037 2.89-6.59 2.89-3.875 0-6.865-3.448-6.865-7.474v-.232c.039-.933.277-1.799.927-3.351l.178-.423c.96-2.247 5.093-10.9 7.098-14.836l.532-1.025C12.537 1.963 13.992 1 16 1zm0 2c-1.37 0-2.316.666-3.41 2.62l-.532 1.026c-1.929 3.774-6.043 12.385-7.017 14.662l-.178.423c-.569 1.356-.761 2.05-.794 2.766L4 24.732v.232c0 2.844 2.036 5.474 4.865 5.474 1.764 0 4.542-1.636 5.485-2.6l.044-.045a16.896 16.896 0 0 1 1.606-1.704 1 1 0 0 1 1.312 0 16.837 16.837 0 0 1 1.606 1.704l.044.045c.943.964 3.72 2.6 5.485 2.6 2.83 0 4.865-2.63 4.865-5.474v-.232c-.033-.717-.225-1.41-.782-2.738l-.157-.376c-.974-2.277-5.088-10.888-7.017-14.662l-.532-1.026C18.316 3.666 17.37 3 16 3zm0 6c2.761 0 5 2.239 5 5 0 2.272-1.517 4.19-3.585 4.793l-.415.107V15a1 1 0 0 0-2 0v3.9c-2.068-.603-3.585-2.521-3.585-4.793 0-2.761 2.239-5 5-5zm0 2c-1.657 0-3 1.343-3 3 0 1.258.77 2.336 1.865 2.764l.135.048V14a1 1 0 1 1 2 0v2.812c1.095-.428 1.865-1.506 1.865-2.764 0-1.657-1.343-3-3-3z" />
          </svg>
          <span className="hidden md:inline text-xl font-bold tracking-tight text-rose-500">
            airbnb
          </span>
        </div>

        {/* Search Bar */}
        <div
          onClick={onOpenSearch}
          className="flex items-center border border-gray-200 dark:border-neutral-800 rounded-full py-2 px-4 shadow-sm hover:shadow-md cursor-pointer transition duration-150 bg-white dark:bg-neutral-800 text-sm max-w-sm sm:max-w-md md:max-w-lg"
        >
          <button className="font-semibold text-gray-800 dark:text-neutral-200 px-3 border-r border-gray-200 dark:border-neutral-700 max-w-[120px] truncate">
            {searchQuery?.destination || 'Anywhere'}
          </button>
          <button className="font-semibold text-gray-800 dark:text-neutral-200 px-3 border-r border-gray-200 dark:border-neutral-700 hidden sm:inline">
            Any week
          </button>
          <div className="text-gray-500 dark:text-neutral-400 pl-3 pr-2 flex items-center gap-2">
            <span>{guestCount > 0 ? `${guestCount} guest${guestCount > 1 ? 's' : ''}` : 'Add guests'}</span>
            <div className="bg-rose-500 text-white p-2 rounded-full flex items-center justify-center">
              <Search size={14} className="stroke-[3px]" />
            </div>
          </div>
        </div>

        {/* Right Profile / Controls */}
        <div className="flex items-center gap-4 relative" ref={menuRef}>
          
          {/* Wishlist Toggle Heart Button */}
          <button
            onClick={() => setShowWishlistOnly(!showWishlistOnly)}
            className={`relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition duration-150 ${showWishlistOnly ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/20' : 'text-gray-600 dark:text-neutral-300'}`}
            title={showWishlistOnly ? "Show all homes" : "Show wishlist only"}
            aria-label="Toggle wishlist"
          >
            <Heart size={18} className={showWishlistOnly ? "fill-rose-500 stroke-rose-500" : ""} />
            {favoriteCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-xs">
                {favoriteCount}
              </span>
            )}
          </button>

          {/* Theme switcher */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-600 dark:text-neutral-300 transition duration-150"
            title="Toggle theme"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <div
            onClick={() => showToast('Airbnb your home feature coming soon!', 'info')}
            className="hidden md:flex items-center text-sm font-semibold text-gray-800 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-neutral-800 px-4 py-2.5 rounded-full cursor-pointer transition"
          >
            Airbnb your home
          </div>
          
          <button 
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 text-gray-600 dark:text-neutral-300 transition duration-150"
            aria-label="Change language or region"
            onClick={() => showToast('Language & region settings coming soon.', 'info')}
          >
            <Globe size={18} />
          </button>

          {/* User Menu Trigger */}
          <div 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 border border-gray-200 dark:border-neutral-700 rounded-full p-1.5 hover:shadow-md cursor-pointer transition bg-white dark:bg-neutral-800 select-none"
          >
            <Menu size={18} className="ml-2 text-gray-600 dark:text-neutral-300" />
            {user ? (
              <div className="relative">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-7 h-7 rounded-full object-cover border border-rose-500" 
                />
                {/* Online dot */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-neutral-800 rounded-full" />
              </div>
            ) : (
              <div className="bg-gray-500 text-white rounded-full p-1.5">
                <User size={16} />
              </div>
            )}
          </div>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-14 mt-2 w-60 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-xl shadow-xl z-50 py-2 flex flex-col text-sm text-gray-700 dark:text-neutral-300 animate-slide-up origin-top-right transition-colors duration-200">
              
              {user ? (
                // Logged In Options
                <>
                  <div className="px-4 py-2.5 border-b border-gray-100 dark:border-neutral-800 flex items-center gap-3">
                    <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border border-rose-400 shrink-0" />
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-semibold text-gray-900 dark:text-white truncate">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-neutral-500 truncate">
                        {user.email}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setIsMenuOpen(false); showToast('You have 2 unread messages.', 'info'); }}
                    className="px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-neutral-800 flex items-center gap-2.5 transition"
                  >
                    <MessageSquare size={16} className="text-gray-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">Messages</span>
                    <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-auto">
                      2
                    </span>
                  </button>

                  <button 
                    onClick={() => { setIsMenuOpen(false); setIsTripsOpen(true); }}
                    className="px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-neutral-800 flex items-center gap-2.5 transition"
                  >
                    <Briefcase size={16} className="text-gray-400" />
                    <span>Trips</span>
                  </button>

                  <button 
                    onClick={() => { setIsMenuOpen(false); setShowWishlistOnly(true); }}
                    className="px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-neutral-800 flex items-center gap-2.5 transition"
                  >
                    <Heart size={16} className="text-gray-400" />
                    <span>Wishlist ({favoriteCount})</span>
                  </button>

                  <hr className="border-gray-100 dark:border-neutral-800 my-1" />

                  <button 
                    onClick={() => { setIsMenuOpen(false); showToast('Airbnb your home feature coming soon!', 'info'); }}
                    className="px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                  >
                    Airbnb your home
                  </button>

                  <button 
                    onClick={() => { setIsMenuOpen(false); showToast('Account settings coming soon.', 'info'); }}
                    className="px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-neutral-800 flex items-center gap-2.5 transition"
                  >
                    <Settings size={16} className="text-gray-400" />
                    <span>Account</span>
                  </button>

                  <hr className="border-gray-100 dark:border-neutral-800 my-1" />

                  <button 
                    onClick={() => { setIsMenuOpen(false); onLogout(); }}
                    className="px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-neutral-800 flex items-center gap-2.5 text-rose-500 font-medium transition"
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </button>
                </>
              ) : (
                // Logged Out Options
                <>
                  <button 
                    onClick={() => { setIsMenuOpen(false); onLoginClick(); }}
                    className="px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-neutral-800 font-semibold text-gray-900 dark:text-white transition"
                  >
                    Sign up
                  </button>
                  <button 
                    onClick={() => { setIsMenuOpen(false); onLoginClick(); }}
                    className="px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                  >
                    Log in
                  </button>

                  <hr className="border-gray-100 dark:border-neutral-800 my-1" />

                  <button 
                    onClick={() => { setIsMenuOpen(false); showToast('Airbnb your home feature coming soon!', 'info'); }}
                    className="px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                  >
                    Airbnb your home
                  </button>
                  <button 
                    onClick={() => { setIsMenuOpen(false); showToast('Help Center coming soon.', 'info'); }}
                    className="px-4 py-2.5 text-left hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
                  >
                    Help Center
                  </button>
                </>
              )}

            </div>
          )}

        </div>

      </div>
    </header>
  );
});

export default Header;

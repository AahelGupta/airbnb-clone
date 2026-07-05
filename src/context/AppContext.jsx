import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // User auth state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Modal open states
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Filter and listing states
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchFilters, setSearchFilters] = useState({
    destination: '',
    maxPrice: 2000,
    guests: 1,
    bedrooms: 0,
    bathrooms: 0,
    amenities: [],
  });

  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Bookings state
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist only toggle and Trips modal state
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [isTripsOpen, setIsTripsOpen] = useState(false);

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  // Sync theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Sync favorites
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Sync user
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  // Sync bookings
  useEffect(() => {
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Fetch listings from simulated API
  const loadListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getListings({
        ...searchFilters,
        category: activeCategory,
      });
      setListings(data);
    } catch (err) {
      setError(err.message || 'An error occurred while loading listings.');
      setListings([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchFilters, activeCategory]);

  // Trigger load when filters or category changes
  useEffect(() => {
    let active = true;
    const fetch = async () => {
      if (active) {
        await loadListings();
      }
    };
    fetch();
    return () => {
      active = false;
    };
  }, [loadListings]);

  // Toast actions
  const showToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Actions
  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const loginUser = useCallback(async (email, password, name) => {
    const user = await api.login(email, password, name);
    setCurrentUser(user);
    return user;
  }, []);

  const logoutUser = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const addBooking = useCallback((booking) => {
    setBookings((prev) => [booking, ...prev]);
    setIsTripsOpen(true);
  }, []);

  const cancelBooking = useCallback((id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const addReviewToListing = useCallback(async (listingId, review) => {
    try {
      const updated = await api.addReview(listingId, review);
      // Reload listings to reflect new review and rating
      await loadListings();
      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, [loadListings]);

  const applyFilters = useCallback((newFilters) => {
    setSearchFilters(newFilters);
  }, []);

  const resetFilters = useCallback(() => {
    setSearchFilters({
      destination: '',
      maxPrice: 2000,
      guests: 1,
      bedrooms: 0,
      bathrooms: 0,
      amenities: [],
    });
    setActiveCategory('all');
  }, []);

  const contextValue = {
    darkMode,
    setDarkMode,
    currentUser,
    isSearchOpen,
    setIsSearchOpen,
    isAuthOpen,
    setIsAuthOpen,
    favorites,
    toggleFavorite,
    activeCategory,
    setActiveCategory,
    searchFilters,
    applyFilters,
    resetFilters,
    listings,
    isLoading,
    error,
    loadListings,
    loginUser,
    logoutUser,
    bookings,
    addBooking,
    cancelBooking,
    addReviewToListing,
    showWishlistOnly,
    setShowWishlistOnly,
    isTripsOpen,
    setIsTripsOpen,
    toasts,
    showToast,
    dismissToast,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

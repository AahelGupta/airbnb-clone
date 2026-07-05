import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ToastContainer from './components/Toast';

// Lazy loaded page components
const Home = lazy(() => import('./pages/Home'));
const ListingDetails = lazy(() => import('./pages/ListingDetails'));

// Lazy loaded modal components
const SearchModal = lazy(() => import('./components/SearchModal'));
const AuthModal = lazy(() => import('./components/AuthModal'));
const TripsModal = lazy(() => import('./components/TripsModal'));

function AppContent() {
  const { isSearchOpen, setIsSearchOpen, isAuthOpen, setIsAuthOpen, isTripsOpen, setIsTripsOpen, toasts, dismissToast } = useApp();

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 text-gray-900 dark:text-neutral-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* Persistent Header */}
      <Header />

      {/* Main Pages with Suspense Loader */}
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="w-10 h-10 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
        </Routes>
      </Suspense>

      {/* Persistent Footer */}
      <Footer />

      {/* Lazy Modals */}
      <Suspense fallback={null}>
        {isSearchOpen && (
          <SearchModal
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        )}
        {isAuthOpen && (
          <AuthModal
            isOpen={isAuthOpen}
            onClose={() => setIsAuthOpen(false)}
          />
        )}
        {isTripsOpen && (
          <TripsModal
            isOpen={isTripsOpen}
            onClose={() => setIsTripsOpen(false)}
          />
        )}
      </Suspense>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

/**
 * Home Page
 *
 * The main landing page of the Airbnb clone.
 * Includes:
 * - HeroBanner: eye-catching intro with animated gradient background
 * - PopularDestinations: a horizontally scrollable destination card row (creative enhancement)
 * - Categories: filter bar for listing types
 * - ListingGrid: the main grid of property cards
 * - BecomeHostBanner: a creative CTA section to encourage hosting (creative enhancement)
 * - ScrollToTopButton: a floating button that appears on scroll (creative enhancement)
 */

import React, { useEffect, useRef, useState } from 'react';
import Categories from '../components/Categories';
import ListingGrid from '../components/ListingGrid';
import { useApp } from '../context/AppContext';
import { Search, Star, Shield, Home as HomeIcon, ChevronUp, MapPin, Plane, TreePine, Waves, Mountain, Building2, ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Popular Destinations Data ──────────────────────────────────────────────
const POPULAR_DESTINATIONS = [
  {
    city: 'Paris',
    country: 'France',
    emoji: '🇫🇷',
    tag: 'City of Light',
    gradient: 'from-pink-400 to-rose-500',
    bgColor: 'bg-pink-50 dark:bg-pink-950/20',
  },
  {
    city: 'Bali',
    country: 'Indonesia',
    emoji: '🇮🇩',
    tag: 'Island Paradise',
    gradient: 'from-teal-400 to-emerald-500',
    bgColor: 'bg-teal-50 dark:bg-teal-950/20',
  },
  {
    city: 'New York',
    country: 'USA',
    emoji: '🇺🇸',
    tag: 'The Big Apple',
    gradient: 'from-blue-400 to-indigo-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    emoji: '🇯🇵',
    tag: 'Neon Dreams',
    gradient: 'from-violet-400 to-purple-500',
    bgColor: 'bg-violet-50 dark:bg-violet-950/20',
  },
  {
    city: 'Santorini',
    country: 'Greece',
    emoji: '🇬🇷',
    tag: 'White & Blue',
    gradient: 'from-sky-400 to-cyan-500',
    bgColor: 'bg-sky-50 dark:bg-sky-950/20',
  },
  {
    city: 'Dubai',
    country: 'UAE',
    emoji: '🇦🇪',
    tag: 'Golden City',
    gradient: 'from-amber-400 to-orange-500',
    bgColor: 'bg-amber-50 dark:bg-amber-950/20',
  },
  {
    city: 'Maldives',
    country: 'Maldives',
    emoji: '🇲🇻',
    tag: 'Ocean Bliss',
    gradient: 'from-cyan-400 to-blue-500',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/20',
  },
  {
    city: 'Tuscany',
    country: 'Italy',
    emoji: '🇮🇹',
    tag: 'Wine & Hills',
    gradient: 'from-orange-400 to-red-500',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
  },
];

// ─── Explore Types Data ──────────────────────────────────────────────────────
const EXPLORE_TYPES = [
  { icon: Building2, label: 'Cabins', count: '1,200+' },
  { icon: Waves, label: 'Beachfront', count: '3,500+' },
  { icon: Mountain, label: 'Mountain', count: '2,100+' },
  { icon: TreePine, label: 'Treehouses', count: '800+' },
  { icon: HomeIcon, label: 'Entire homes', count: '15k+' },
  { icon: Plane, label: 'Nearby', count: '4,000+' },
];

// ─── HeroBanner Component ─────────────────────────────────────────────────────
/**
 * HeroBanner
 *
 * Full-width animated gradient hero section with headline and search CTA.
 *
 * @param {{ onOpenSearch: () => void }} props
 */
function HeroBanner({ onOpenSearch }) {
  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-orange-400">
      {/* Animated floating blobs */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center gap-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/30">
          <Star size={12} className="fill-yellow-300 stroke-yellow-300" />
          Over 1 million unique homes worldwide
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-2xl drop-shadow-sm">
          Find your next<br />
          <span className="relative inline-block">
            <span className="relative z-10">extraordinary</span>
            <span className="absolute inset-x-0 bottom-0 h-3 bg-white/25 -skew-x-3 rounded" aria-hidden="true" />
          </span>{' '}
          stay
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-white/90 max-w-xl leading-relaxed">
          From cozy cabins to luxury villas — discover unique homes crafted for unforgettable experiences.
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-1">
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3.5 py-2 rounded-full border border-white/25">
            <Shield size={13} className="shrink-0" />
            AirCover protection
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3.5 py-2 rounded-full border border-white/25">
            <Star size={12} className="fill-yellow-300 stroke-yellow-300 shrink-0" />
            4.9 avg. rating · 10k+ stays
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3.5 py-2 rounded-full border border-white/25">
            <MapPin size={12} className="shrink-0" />
            190+ countries
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onOpenSearch}
          id="hero-search-btn"
          className="mt-2 inline-flex items-center gap-3 bg-white text-rose-500 hover:bg-rose-50 active:scale-95 px-8 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transition duration-200 text-base"
        >
          <Search size={18} />
          Start exploring
        </button>
      </div>
    </div>
  );
}

// ─── Popular Destinations Component ──────────────────────────────────────────
/**
 * PopularDestinations
 *
 * A horizontally scrollable row of popular travel destination cards with
 * circular / infinite-loop navigation via the arrow buttons.
 *
 * How it works:
 *  - `activeIndex` tracks which card is currently the "first visible" card.
 *  - Clicking ◀ / ▶ decrements / increments the index with modulo wrap-around
 *    so it loops: Paris → Bali → … → Tuscany → Paris (and reverse).
 *  - Each card has its own ref stored in `cardRefs`; on index change we call
 *    `scrollIntoView` on the target card so it always snaps into view.
 *
 * @param {{ onSelectDestination: (city: string) => void }} props
 */
function PopularDestinations({ onSelectDestination }) {
  const total = POPULAR_DESTINATIONS.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);
  const containerRef = useRef(null);

  /**
   * Advance the carousel by one step in the given direction with wrap-around.
   * @param {'left' | 'right'} dir
   */
  const navigate = (dir) => {
    setActiveIndex((prev) => {
      const next = dir === 'right'
        ? (prev + 1) % total
        : (prev - 1 + total) % total;
      return next;
    });
  };

  // Whenever activeIndex changes, scroll that card into view inside the container.
  useEffect(() => {
    const card = cardRefs.current[activeIndex];
    const container = containerRef.current;
    if (!card || !container) return;

    // Compute card's left offset relative to the container's scrollable area
    const cardLeft = card.offsetLeft;
    container.scrollTo({ left: cardLeft, behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10" aria-label="Popular destinations">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Popular destinations
          </h2>
          <p className="text-sm text-gray-500 dark:text-neutral-400 mt-0.5">
            Trending spots travelers are loving right now
          </p>
        </div>
        {/* Arrow controls — always visible, circular */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('left')}
            className="p-2 rounded-full border border-gray-200 dark:border-neutral-700 hover:shadow-md hover:scale-105 active:scale-95 transition bg-white dark:bg-neutral-800 text-gray-600 dark:text-neutral-300"
            aria-label="Previous destination"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => navigate('right')}
            className="p-2 rounded-full border border-gray-200 dark:border-neutral-700 hover:shadow-md hover:scale-105 active:scale-95 transition bg-white dark:bg-neutral-800 text-gray-600 dark:text-neutral-300"
            aria-label="Next destination"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Scrollable destination cards */}
      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
          style={{ scrollBehavior: 'smooth' }}
        >
          {POPULAR_DESTINATIONS.map((dest, i) => (
            <button
              key={dest.city}
              ref={(el) => { cardRefs.current[i] = el; }}
              id={`dest-${dest.city.toLowerCase().replace(/\s/g, '-')}`}
              onClick={() => onSelectDestination(dest.city)}
              className={`shrink-0 flex flex-col items-center gap-2 w-28 sm:w-32 p-4 rounded-2xl ${
                i === activeIndex
                  ? 'shadow-xl scale-105 border border-transparent'
                  : 'border border-gray-100 dark:border-neutral-800 opacity-75'
              } ${dest.bgColor} hover:shadow-lg hover:-translate-y-1 active:scale-95 transition duration-200 cursor-pointer group`}
              aria-label={`Search stays in ${dest.city}`}
              aria-current={i === activeIndex ? 'true' : undefined}
            >
              {/* Gradient circle */}
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${dest.gradient} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition duration-200`}>
                {dest.emoji}
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{dest.city}</p>
                <p className="text-[10px] text-gray-500 dark:text-neutral-400 mt-0.5">{dest.tag}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-4" role="tablist" aria-label="Destination indicators">
        {POPULAR_DESTINATIONS.map((dest, i) => (
          <button
            key={dest.city}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Go to ${dest.city}`}
            onClick={() => setActiveIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-5 h-2 bg-gray-500 dark:bg-neutral-300'
                : 'w-2 h-2 bg-gray-300 dark:bg-neutral-600 hover:bg-gray-400 dark:hover:bg-neutral-500'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Explore Types Component ──────────────────────────────────────────────────
/**
 * ExploreByType
 *
 * A grid of icons showing different property types with listing counts.
 * Creative enhancement to help users discover property categories visually.
 *
 * @param {{ onOpenSearch: () => void }} props
 */
function ExploreByType({ onOpenSearch }) {
  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 border-t border-gray-100 dark:border-neutral-800" aria-label="Explore by type">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-5">
        Explore by stay type
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {EXPLORE_TYPES.map(({ icon: Icon, label, count }) => (
          <button
            key={label}
            onClick={onOpenSearch}
            id={`type-${label.toLowerCase().replace(/\s/g, '-')}`}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border border-gray-100 dark:border-neutral-800 hover:border-rose-300 dark:hover:border-rose-700 hover:shadow-md hover:-translate-y-1 active:scale-95 transition duration-200 bg-white dark:bg-neutral-900 group cursor-pointer"
            aria-label={`Explore ${label}`}
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center group-hover:bg-rose-100 dark:group-hover:bg-rose-950/40 transition">
              <Icon size={20} className="text-rose-500" />
            </div>
            <span className="text-xs font-semibold text-gray-800 dark:text-neutral-200 text-center leading-tight">{label}</span>
            <span className="text-[10px] text-gray-400 dark:text-neutral-500">{count} stays</span>
          </button>
        ))}
      </div>
    </section>
  );
}

// ─── Become a Host Banner ─────────────────────────────────────────────────────
/**
 * BecomeHostBanner
 *
 * A creative full-width call-to-action section encouraging users to host
 * on Airbnb. Features a gradient background and bold copy.
 * This is a creative enhancement beyond the original Airbnb homepage.
 *
 * @param {{ onShowToast: () => void }} props
 */
function BecomeHostBanner({ onShowToast }) {
  return (
    <section
      className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6"
      aria-label="Become a host"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-neutral-800 to-gray-900 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-8 sm:p-12 flex flex-col sm:flex-row items-center justify-between gap-6 border border-neutral-700">
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col gap-3 text-center sm:text-left max-w-lg">
          <div className="inline-flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-widest self-center sm:self-start">
            <HomeIcon size={13} />
            Airbnb your home
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
            Earn extra income<br className="hidden sm:inline" /> by sharing your space
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Join over 4 million hosts worldwide. Earn money by renting out your
            spare room, apartment, or vacation home — on your own schedule.
          </p>
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-1">
            <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-medium">
              <Shield size={13} className="text-green-400" />
              AirCover insurance included
            </div>
            <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-medium">
              <Star size={12} className="fill-yellow-400 stroke-yellow-400" />
              24/7 host support
            </div>
          </div>
        </div>

        <button
          onClick={onShowToast}
          id="become-host-btn"
          className="relative shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-rose-500/30 active:scale-95 transition duration-200 text-base"
        >
          <HomeIcon size={16} />
          Learn more
        </button>
      </div>
    </section>
  );
}

// ─── Scroll To Top Button ─────────────────────────────────────────────────────
/**
 * ScrollToTopButton
 *
 * A floating action button that appears after the user scrolls down 300px.
 * Clicking it smoothly scrolls the page back to the top.
 * Creative enhancement for improved UX.
 */
function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    /**
     * Shows or hides the button based on scroll position.
     */
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      id="scroll-to-top-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-xl hover:shadow-rose-400/40 hover:scale-110 active:scale-95 transition duration-200 flex items-center justify-center animate-fade-in"
      aria-label="Scroll to top"
    >
      <ChevronUp size={20} />
    </button>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────
/**
 * Home Page Component
 *
 * Composes all sections of the Airbnb clone homepage.
 * Conditionally shows HeroBanner, PopularDestinations, and ExploreByType
 * only on the default landing view (no active filters or category).
 *
 * @component
 */
export default function Home() {
  const {
    activeCategory,
    setActiveCategory,
    searchFilters,
    setIsSearchOpen,
    applyFilters,
    showToast,
  } = useApp();

  // Show creative sections only on default landing view (no active filters)
  const isDefaultView =
    activeCategory === 'all' &&
    !searchFilters.destination &&
    searchFilters.guests <= 1;

  /**
   * Sets the destination search filter when a popular destination is clicked.
   * @param {string} city - The city name selected by the user.
   */
  const handleDestinationSelect = (city) => {
    applyFilters({ ...searchFilters, destination: city });
    showToast(`Showing stays in ${city} 📍`, 'info');
  };

  return (
    <div className="flex-1 flex flex-col">

      {/* Hero Banner — shown only on default landing view */}
      {isDefaultView && (
        <HeroBanner onOpenSearch={() => setIsSearchOpen(true)} />
      )}

      {/* Popular Destinations — creative enhancement */}
      {isDefaultView && (
        <PopularDestinations onSelectDestination={handleDestinationSelect} />
      )}

      {/* Explore by Type — creative enhancement */}
      {isDefaultView && (
        <ExploreByType onOpenSearch={() => setIsSearchOpen(true)} />
      )}

      {/* Categories Bar */}
      <Categories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Main Grid Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        <h1 className="sr-only">Airbnb Clone - Find your next luxury vacation home</h1>

        {/* Listings Grid */}
        <ListingGrid />

      </main>

      {/* Become a Host CTA — creative enhancement, shown on default view */}
      {isDefaultView && (
        <BecomeHostBanner
          onShowToast={() => showToast('Hosting feature coming soon! Stay tuned 🏠', 'info')}
        />
      )}

      {/* Floating Scroll To Top Button */}
      <ScrollToTopButton />
    </div>
  );
}

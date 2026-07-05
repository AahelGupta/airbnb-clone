/**
 * Categories Component
 *
 * A horizontally scrollable filter bar for property categories.
 * Arrow buttons allow keyboard/mouse-driven navigation through categories.
 * A Filters button opens the advanced search modal.
 *
 * @component
 */
import React, { useRef, memo } from 'react';
import * as Icons from 'lucide-react';
import { categoriesList } from '../data/listings';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Categories = memo(function Categories() {
  const { activeCategory, setActiveCategory, setIsSearchOpen } = useApp();
  const scrollRef = useRef(null);

  const handleArrowClick = (direction) => {
    const currentIndex = categoriesList.findIndex(item => item.id === activeCategory);
    let nextIndex = currentIndex;
    
    if (direction === 'left') {
      nextIndex = currentIndex - 1;
      if (nextIndex < 0) {
        nextIndex = categoriesList.length - 1;
      }
    } else {
      nextIndex = currentIndex + 1;
      if (nextIndex >= categoriesList.length) {
        nextIndex = 0;
      }
    }
    
    const nextCategory = categoriesList[nextIndex];
    setActiveCategory(nextCategory.id);

    // Scroll the selected category button into view
    setTimeout(() => {
      if (scrollRef.current) {
        const buttons = scrollRef.current.querySelectorAll('button');
        const activeEl = buttons[nextIndex];
        if (activeEl) {
          activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }
    }, 50);
  };

  return (
    <div className="relative border-b border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-4 select-none transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
        
        {/* Left Arrow */}
        <button 
          onClick={() => handleArrowClick('left')}
          className="shrink-0 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 p-1.5 rounded-full shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition hidden sm:flex items-center justify-center text-gray-600 dark:text-neutral-300"
          aria-label="Scroll categories left"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Categories Scroller */}
        <div 
          ref={scrollRef}
          className="flex items-center gap-8 overflow-x-auto no-scrollbar flex-1 scroll-smooth"
        >
          {categoriesList.map((item) => {
            const IconComponent = Icons[item.icon] || Icons.Home;
            const isActive = activeCategory === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.id)}
                className={`flex flex-col items-center gap-2 cursor-pointer pb-2.5 border-b-2 transition duration-200 focus:outline-none whitespace-nowrap group ${
                  isActive 
                    ? 'border-gray-800 dark:border-white text-gray-900 dark:text-white' 
                    : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-200 dark:hover:border-neutral-700'
                }`}
              >
                <IconComponent 
                  size={24} 
                  className={`transition-transform duration-200 group-hover:-translate-y-0.5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} 
                />
                <span className="text-xs font-semibold tracking-wide">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => handleArrowClick('right')}
          className="shrink-0 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 p-1.5 rounded-full shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition hidden sm:flex items-center justify-center text-gray-600 dark:text-neutral-300"
          aria-label="Scroll categories right"
        >
          <ChevronRight size={16} />
        </button>

        {/* Filters Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="shrink-0 flex items-center gap-2 border border-gray-200 dark:border-neutral-700 rounded-xl px-3 py-2 text-xs font-semibold text-gray-700 dark:text-neutral-300 hover:border-gray-400 dark:hover:border-neutral-500 hover:shadow-md transition duration-150 bg-white dark:bg-neutral-800 whitespace-nowrap"
          aria-label="Open filters"
        >
          <SlidersHorizontal size={14} />
          <span className="hidden sm:inline">Filters</span>
        </button>

      </div>
    </div>
  );
});

export default Categories;

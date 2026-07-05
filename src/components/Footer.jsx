/**
 * Footer Component
 *
 * The site-wide footer with links organized into Support, Community,
 * Hosting, and Airbnb sections, plus social media links, language
 * selector, and currency toggle.
 *
 * @component
 */
import React from 'react';
import { Globe } from 'lucide-react';

/** Inline Facebook SVG icon (lucide-react v1 no longer exports it). */
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

/** Inline Twitter/X SVG icon (lucide-react v1 no longer exports it). */
const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

/** Inline Instagram SVG icon (lucide-react v1 no longer exports it). */
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FOOTER_LINKS = {
  Support: ['Help Center', 'AirCover', 'Anti-discrimination', 'Disability support', 'Cancellation options', 'Report a concern'],
  Community: ['Airbnb.org: disaster relief', 'Support Afghan refugees', 'Celebrating diversity & belonging'],
  Hosting: ['Airbnb your home', 'AirCover for Hosts', 'Explore hosting resources', 'Community forum', 'How to host responsibly'],
  Airbnb: ['Newsroom', 'Learn about new features', 'Letter from our founders', 'Careers', 'Investors'],
};

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900/50 transition-colors duration-200">
      
      {/* Main links grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-3">
              <h4 className="text-xs font-bold tracking-wide uppercase text-gray-900 dark:text-white">
                {section}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white hover:underline transition duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-neutral-400">
          
          {/* Left: copyright + links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <span>© 2026 Airbnb Clone, Inc.</span>
            <span className="hidden sm:inline">·</span>
            <a href="#" className="hover:underline hover:text-gray-900 dark:hover:text-white transition">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:underline hover:text-gray-900 dark:hover:text-white transition">Terms</a>
            <span>·</span>
            <a href="#" className="hover:underline hover:text-gray-900 dark:hover:text-white transition">Sitemap</a>
            <span>·</span>
            <a href="#" className="hover:underline hover:text-gray-900 dark:hover:text-white transition">Company details</a>
          </div>

          {/* Right: language, currency, socials */}
          <div className="flex items-center gap-4 font-semibold text-gray-700 dark:text-neutral-300">
            <button className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-white transition text-sm">
              <Globe size={15} />
              <span>English (IN)</span>
            </button>
            <button className="hover:text-gray-900 dark:hover:text-white transition text-sm">
              ₹ INR
            </button>
            <div className="flex items-center gap-3 ml-1">
              <a href="#" aria-label="Facebook" className="hover:text-gray-900 dark:hover:text-white transition">
                <FacebookIcon />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-gray-900 dark:hover:text-white transition">
                <TwitterIcon />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-gray-900 dark:hover:text-white transition">
                <InstagramIcon />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}

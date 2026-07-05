import { mockListings } from '../data/listings';

const getPersistedListings = () => {
  const saved = localStorage.getItem('listings');
  if (saved) return JSON.parse(saved);
  localStorage.setItem('listings', JSON.stringify(mockListings));
  return mockListings;
};

const savePersistedListings = (listings) => {
  localStorage.setItem('listings', JSON.stringify(listings));
};

export const api = {
  async getListings(filters = {}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!navigator.onLine) {
          reject(new Error('No internet connection. Please verify your network connection and try again.'));
          return;
        }

        const { destination, maxPrice, guests, bedrooms, bathrooms, amenities, category } = filters;
        const currentListings = getPersistedListings();

        const filtered = currentListings.filter((listing) => {
          // Category check
          if (category && category !== 'all' && listing.category !== category) {
            return false;
          }
          // Destination check
          if (destination) {
            const dest = destination.toLowerCase();
            const matchCity = listing.location.toLowerCase().includes(dest);
            const matchCountry = listing.country.toLowerCase().includes(dest);
            if (!matchCity && !matchCountry) return false;
          }
          // Price check
          if (maxPrice && listing.price > maxPrice) {
            return false;
          }
          // Guest capacity
          if (guests && listing.guests < guests) {
            return false;
          }
          // Bedrooms check
          if (bedrooms > 0 && listing.bedrooms < bedrooms) {
            return false;
          }
          // Bathrooms check
          if (bathrooms > 0 && listing.bathrooms < bathrooms) {
            return false;
          }
          // Amenities check
          if (amenities && amenities.length > 0) {
            const hasAllAmenities = amenities.every((amenity) =>
              listing.amenities.includes(amenity)
            );
            if (!hasAllAmenities) return false;
          }
          return true;
        });

        resolve(filtered);
      }, 400); // 400ms fake network delay
    });
  },

  async getListingById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!navigator.onLine) {
          reject(new Error('No internet connection. Please verify your network connection and try again.'));
          return;
        }

        const currentListings = getPersistedListings();
        const listing = currentListings.find((l) => l.id === Number(id));
        if (listing) {
          resolve(listing);
        } else {
          reject(new Error(`Listing with ID ${id} not found.`));
        }
      }, 300);
    });
  },

  async login(email, password, name = 'Alex Morgan') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!navigator.onLine) {
          reject(new Error('No internet connection. Please verify your network connection and try again.'));
          return;
        }

        resolve({
          name,
          email,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
        });
      }, 500);
    });
  },

  async addReview(listingId, review) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!navigator.onLine) {
          reject(new Error('No internet connection. Please verify your network connection and try again.'));
          return;
        }

        const currentListings = getPersistedListings();
        const listing = currentListings.find((l) => l.id === Number(listingId));
        if (listing) {
          // Add review with dynamic date
          const newReview = {
            ...review,
            date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            avatar: review.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
          };
          listing.reviews = [newReview, ...listing.reviews];
          listing.reviewCount = listing.reviews.length;

          // Recompute rating average
          const sum = listing.reviews.reduce((acc, r) => acc + Number(r.rating || 5), 0);
          listing.rating = sum / listing.reviews.length;

          // Update rating breakdown slightly for visual variety
          if (review.rating) {
            const keys = Object.keys(listing.ratingBreakdown);
            keys.forEach((key) => {
              // Drift breakdown values towards the new rating
              const currentVal = listing.ratingBreakdown[key];
              listing.ratingBreakdown[key] = Number(((currentVal * 4 + review.rating) / 5).toFixed(2));
            });
          }

          savePersistedListings(currentListings);
          resolve(listing);
        } else {
          reject(new Error(`Listing with ID ${listingId} not found.`));
        }
      }, 300);
    });
  }
};

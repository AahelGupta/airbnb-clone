# 🏠 Airbnb Homepage Clone

A fully functional and responsive **Airbnb homepage clone** built with **React 19**, **Tailwind CSS v4**, and **Vite**. This project was created as part of the **Skillfied Mentor Frontend Development Internship**.

## 🌟 Live Features

| Feature | Description |
|--------|-------------|
| 🔍 **Smart Search** | Filter by destination, price range, guests, bedrooms, bathrooms & amenities |
| 🗂️ **Category Bar** | Horizontally scrollable property category filters |
| 🌍 **Popular Destinations** | Creative destination picker with gradient cards (custom enhancement) |
| 🏡 **Explore by Stay Type** | Visual type grid — Cabins, Beachfront, Mountain, Treehouse & more (custom) |
| 🖼️ **Image Carousel** | Swipeable multi-image gallery per listing card |
| ❤️ **Wishlist** | Persist favorite properties using localStorage |
| 🗓️ **Booking System** | Date picker, guest selector, fee breakdown, booking confirmation |
| ⭐ **Reviews** | Rating breakdown + inline review submission form |
| 🌙 **Dark Mode** | Full dark/light mode toggle with system preference detection |
| 🔐 **Auth Modal** | Login / Sign Up modal with simulated API |
| ✈️ **Trips Modal** | View and cancel bookings with inline confirmation flow |
| 🏠 **Become a Host Banner** | Creative CTA section (custom enhancement) |
| 🔔 **Toast Notifications** | Non-blocking toast system (replaces all `alert()` calls) |
| ⬆️ **Scroll to Top** | Floating button that appears after scrolling (custom enhancement) |

---

## 🛠️ Tech Stack

- **React 19** — Component-based UI architecture
- **Tailwind CSS v4** — Utility-first responsive styling
- **Vite 8** — Lightning-fast dev server & bundler
- **React Router v7** — Client-side routing
- **Lucide React** — Modern SVG icon library

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx         # Sticky navbar with logo, search, auth & theme toggle
│   ├── Footer.jsx         # Site-wide footer with links & social icons
│   ├── Categories.jsx     # Horizontally scrollable category filter bar
│   ├── ListingCard.jsx    # Individual property card with image carousel
│   ├── ListingGrid.jsx    # Responsive property grid with skeleton loading
│   ├── BookingWidget.jsx  # Sticky booking panel with date picker & pricing
│   ├── ReviewsSection.jsx # Rating breakdown + review submission form
│   ├── SearchModal.jsx    # Advanced search & filter modal
│   ├── AuthModal.jsx      # Login / Sign Up modal
│   ├── TripsModal.jsx     # Booked trips viewer with cancel flow
│   ├── Toast.jsx          # Toast notification system
│   └── ErrorBoundary.jsx  # React error boundary for graceful failure
├── pages/
│   ├── Home.jsx           # Landing page (hero, destinations, grid, host CTA)
│   └── ListingDetails.jsx # Full listing detail page with gallery & booking
├── context/
│   └── AppContext.jsx     # Global state: auth, favorites, filters, bookings
├── services/
│   └── api.js             # Simulated API layer with artificial delay
├── data/
│   └── listings.js        # Static listings data with categories
├── App.jsx                # Root component with routing
├── main.jsx               # Entry point
└── index.css              # Global styles + Tailwind imports + animations
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- **npm** 9+

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at **http://localhost:5173**.

---

## 🎨 Creative Enhancements

Beyond the standard Airbnb homepage clone, this project adds several original features:

1. **Popular Destinations Carousel** — Horizontally scrollable destination cards with gradient avatars and one-click destination filtering.
2. **Explore by Stay Type** — A visual grid of property type buttons with stay counts.
3. **Become a Host Banner** — A dark, premium-styled CTA section at the bottom of the landing page.
4. **Floating Scroll-to-Top Button** — Appears when the user scrolls past 300px for improved UX.
5. **Inline Cancellation Confirmation** — Replaces `window.confirm()` with an elegant in-UI confirmation prompt.
6. **Toast Notification System** — All `alert()` calls replaced with non-blocking toast messages.
7. **Dark Mode** — Full dark/light mode with localStorage persistence and system preference detection.

---

## 🧩 Component Documentation

All components are documented with **JSDoc** comments including `@component`, `@param`, and `@returns` tags. See individual component files for inline documentation.

---

## 📋 Evaluation Criteria Coverage

| Criterion | Implementation |
|-----------|---------------|
| Code quality & structure | Modular components, JSDoc docs, ESLint via oxlint |
| Airbnb clone accuracy | Header, search, categories, cards, details, booking, reviews, footer |
| Responsiveness | Tailwind responsive prefixes (sm/md/lg) throughout |
| Creativity & originality | Destinations carousel, type grid, host banner, scroll-to-top |
| Third-party library usage | React Router, Lucide React, Tailwind CSS, Vite |

---

## 📝 License

This project was created for educational purposes as part of the Skillfied Mentor Frontend Development Internship program.

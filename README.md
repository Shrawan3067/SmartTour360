# SmartTour360 — Improved Frontend

## 🚀 Getting Started

```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
frontend/src/
├── components/
│   ├── UI.jsx              # Shared design system: Button, Input, Card, Badge, Spinner etc.
│   ├── Header.jsx          # Sticky nav with scroll effect, mobile drawer, user dropdown
│   ├── HeroSection.jsx     # Search widget (flights/trains/buses/tours)
│   ├── TrendingSection.jsx # Filterable destination cards
│   ├── OfferSection.jsx    # Offers + AboutSection
│   ├── FooterAndNav.jsx    # Footer + BottomNavigation (mobile)
│   ├── ProtectedRoute.jsx  # Auth guard
│   └── ErrorBoundary.jsx   # Global error catch
├── pages/                  # One file per route
├── contexts/
│   └── AuthContext.jsx     # Unified auth with localStorage persistence
└── services/
    └── api.js              # API service layer (mock → real swap ready)
```

## 🔌 Backend Integration

All API calls are in `src/services/api.js`. Each method has:
1. A **mock implementation** (currently active) 
2. A **commented-out real implementation** ready to uncomment

To switch to real backend:
1. Set `VITE_API_URL` in `.env`
2. In `api.js`, uncomment the `return this.request(...)` line and delete the mock block

## 🎨 Design System

CSS variables are defined in `src/index.css`. Key tokens:
- `--primary`: Orange 500 (`#F97316`)
- `--font-display`: Sora  
- `--font-body`: DM Sans

Utility classes: `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.input-field`, `.card`, `.badge`

## 📱 Responsive

- Desktop: full navigation header
- Mobile: collapsible hamburger menu + bottom tab navigation
- Bottom nav auto-hides on auth pages (`/signin`, `/signup`)

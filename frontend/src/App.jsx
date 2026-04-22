import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import { Footer, BottomNavigation } from './components/FooterAndNav';
import { AboutSection, OfferSection } from './components/OfferSection';
import AIChatbot from './components/AIChatbot';

// Home sections
import HeroSection    from './components/HeroSection';
import TrendingSection from './components/TrendingSection';

// Auth
import SignInPage  from './pages/SignInPage';
import SignUpPage  from './pages/SignUpPage';

// Main pages
import HeritagePage      from './pages/HeritagePage';
import DestinationsPage  from './pages/DestinationsPage';
import OffersPage        from './pages/OffersPage';
import SupportPage       from './pages/SupportPage';

// Dashboard & protected
import DashboardPage  from './pages/DashboardPage';
import WishlistPage   from './components/Wishlist';
import TripPlannerPage from './pages/TripPlannerPage';

// Booking flow
import BookingPage             from './pages/BookingPage';
import FlightBookingPage       from './pages/FlightBookingPage';
import TrainBookingPage        from './pages/TrainBookingPage';
import BusBookingPage          from './pages/BusBookingPage';
import TourBookingPage         from './pages/TourBookingPage';
import PaymentPage             from './pages/PaymentPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';

// Search
import SearchResultsPage from './pages/SearchResultsPage';

// Informational
import AboutUsPage  from './pages/AboutUsPage';
import ContactPage  from './pages/ContactPage';
import FAQPage      from './pages/FAQPage';
import TermsPage    from './pages/TermsPage';
import PrivacyPage  from './pages/PrivacyPage';

/* ── Layout wrapper — adds Header + Footer to every route ────── */
const PageLayout = ({ children, noFooter = false }) => (
  <>
    <Header />
    {children}
    {!noFooter && <Footer />}
    <BottomNavigation />
  </>
);

/* ── Home page ───────────────────────────────────────────────── */
const HomePage = () => (
  <>
    <Header />
    <main>
      <HeroSection />
      <TrendingSection />
      <OfferSection />
      <AboutSection />
    </main>
    <Footer />
    <BottomNavigation />
  </>
);

/* ── Auth pages (no footer chrome) ──────────────────────────── */
const AuthLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <BottomNavigation />
  </>
);

/* ── App with routing ────────────────────────────────────────── */
function AppRoutes() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<HomePage />} />

      {/* Auth */}
      <Route path="/signin" element={<AuthLayout><SignInPage /></AuthLayout>} />
      <Route path="/signup" element={<AuthLayout><SignUpPage /></AuthLayout>} />

      {/* Main pages */}
      <Route path="/heritage"     element={<PageLayout><HeritagePage /></PageLayout>} />
      <Route path="/destinations" element={<PageLayout><DestinationsPage /></PageLayout>} />
      <Route path="/offers"       element={<PageLayout><OffersPage /></PageLayout>} />
      <Route path="/about"        element={<PageLayout><AboutSection /></PageLayout>} />
      <Route path="/support"      element={<PageLayout><SupportPage /></PageLayout>} />

      {/* Protected */}
      <Route path="/dashboard"    element={<ProtectedRoute><PageLayout><DashboardPage /></PageLayout></ProtectedRoute>} />
      <Route path="/wishlist"     element={<ProtectedRoute><PageLayout><WishlistPage /></PageLayout></ProtectedRoute>} />
      <Route path="/trip-planner" element={<ProtectedRoute><PageLayout><TripPlannerPage /></PageLayout></ProtectedRoute>} />

      {/* Booking flow */}
      <Route path="/booking/:destinationId" element={<PageLayout><BookingPage /></PageLayout>} />
      <Route path="/flight-booking"         element={<PageLayout><FlightBookingPage /></PageLayout>} />
      <Route path="/train-booking"          element={<PageLayout><TrainBookingPage /></PageLayout>} />
      <Route path="/bus-booking"            element={<PageLayout><BusBookingPage /></PageLayout>} />
      <Route path="/tour-booking"           element={<PageLayout><TourBookingPage /></PageLayout>} />
      <Route path="/payment"                element={<PageLayout><PaymentPage /></PageLayout>} />
      <Route path="/booking-confirmation"   element={<PageLayout><BookingConfirmationPage /></PageLayout>} />

      {/* Search */}
      <Route path="/search-results" element={<PageLayout><SearchResultsPage /></PageLayout>} />

      {/* Informational */}
      <Route path="/about-us" element={<PageLayout><AboutUsPage /></PageLayout>} />
      <Route path="/contact"  element={<PageLayout><ContactPage /></PageLayout>} />
      <Route path="/faq"      element={<PageLayout><FAQPage /></PageLayout>} />
      <Route path="/terms"    element={<PageLayout><TermsPage /></PageLayout>} />
      <Route path="/privacy"  element={<PageLayout><PrivacyPage /></PageLayout>} />

      {/* 404 */}
      <Route path="*" element={
        <PageLayout>
          <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-5">
            <div className="text-6xl">🗺️</div>
            <h1 className="text-3xl font-black text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>Page not found</h1>
            <p className="text-stone-500">The page you're looking for doesn't exist.</p>
            <a href="/" className="btn-primary">Back to Home</a>
          </div>
        </PageLayout>
      } />
    </Routes>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <AIChatbot />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

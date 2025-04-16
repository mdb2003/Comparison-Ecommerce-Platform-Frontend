import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Navbar, Footer } from './components';
import {
  Home,
  Login,
  SearchResults,
  Account,
  SavedItems,
  ProductComparison,
  CategoryProducts,
  ProductDetails,
  Cart,
  About,
  Contact,
  FAQ,
  NotFound,
  Admin,
  Deals,
  OrderTracking,
  Notifications,
  Referral,
  Reviews,
  Language,
  ForgotPassword,
  OTPVerification,
  PrivacyPolicy,
  TermsOfService
} from './pages';
import { ProtectedRoute, GuestRoute } from './components';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/category/:category" element={<CategoryProducts />} />
                <Route path="/compare" element={<ProductComparison />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/reviews/:productId" element={<Reviews />} />
                <Route path="/language" element={<Language />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />

                {/* Protected Routes */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
                <Route path="/saved-items" element={<ProtectedRoute><SavedItems /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><OrderTracking /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                <Route path="/referral" element={<ProtectedRoute><Referral /></ProtectedRoute>} />

                {/* Guest Routes */}
                <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/register" element={<GuestRoute><Login /></GuestRoute>} />
                <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
                <Route path="/verify" element={<GuestRoute><OTPVerification /></GuestRoute>} />

                {/* Fallback Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
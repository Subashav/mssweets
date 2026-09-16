import React, { useState, useEffect, useLayoutEffect } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

// Common & Transition Components
import Navbar from "./components/common/Navbar.jsx";
import Footer from "./components/common/Footer.jsx";
import PageProgressBar from "./components/common/PageProgressBar.jsx";
import PageTransition from "./components/common/PageTransition.jsx";

// Customer Components & Pages
import EnquiryDrawer from "./components/customer/EnquiryDrawer.jsx";
import SearchModal from "./components/customer/SearchModal.jsx";
import HomePage from "./pages/customer/HomePage.jsx";
import ProductsPage from "./pages/customer/ProductsPage.jsx";
import ProductDetailPage from "./pages/customer/ProductDetailPage.jsx";
import CollectionsPage from "./pages/customer/CollectionsPage.jsx";
import GiftingPage from "./pages/customer/GiftingPage.jsx";
import AboutPage from "./pages/customer/AboutPage.jsx";
import ContactPage from "./pages/customer/ContactPage.jsx";

// Admin Components & Pages
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminLoginPage from "./pages/admin/AdminLoginPage.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminStock from "./pages/admin/AdminStock.jsx";
import AdminCategories from "./pages/admin/AdminCategories.jsx";
import AdminCustomers from "./pages/admin/AdminCustomers.jsx";
import AdminCustomerDetail from "./pages/admin/AdminCustomerDetail.jsx";
import AdminEnquiries from "./pages/admin/AdminEnquiries.jsx";
import AdminEnquiryDetail from "./pages/admin/AdminEnquiryDetail.jsx";

// Ensure browser scroll restoration does not cause jumping
if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

// Scroll to Top immediately before paint so hero sections never glide from down to top
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    // Synchronous immediate reset
    window.scrollTo(0, 0);
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

// Protected Admin Route wrapper
function ProtectedAdminRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-amber-400 font-mono text-sm">
        Authenticating session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

// Customer Storefront Layout Wrapper
function StorefrontLayout() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { toastMessage } = useCart();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F2] text-[#1C1917]">
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#5B131A] text-[#FAF7F2] border border-[#C5A059] px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Enquiry Drawer */}
      <EnquiryDrawer />

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="flex-1 flex flex-col">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <PageProgressBar />
        <ScrollToTop />
        <Routes>
          {/* Customer Storefront Routes */}
          <Route element={<StorefrontLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/gifting" element={<GiftingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
                  <h1 className="font-serif text-4xl font-bold text-[#5B131A]">
                    404 — Page Not Found
                  </h1>
                  <p className="text-sm text-[#78716C]">
                    The sweet corner you are looking for does not exist or has been relocated.
                  </p>
                  <a
                    href="/"
                    className="inline-block mt-4 px-6 py-3 bg-[#5B131A] text-white text-xs uppercase tracking-widest font-bold rounded"
                  >
                    Return to Boutique Home
                  </a>
                </div>
              }
            />
          </Route>

          {/* Admin Authentication */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* Admin Protected Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="stock" element={<AdminStock />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="customers/:id" element={<AdminCustomerDetail />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="enquiries/:id" element={<AdminEnquiryDetail />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  );
}


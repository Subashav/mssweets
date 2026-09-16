import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { BRAND_CONFIG } from "../../config/brand.js";
import { useCart } from "../../context/CartContext.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Navbar({ onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, openDrawer } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Sweets", path: "/products?category=cat_sweets" },
    { name: "Snacks", path: "/products?category=cat_snacks" },
    { name: "Gift Boxes", path: "/products?category=cat_gifting" },
    { name: "Collections", path: "/collections" },
    { name: "Our Story", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const isNavActive = (link) => {
    if (link.path === "/") return location.pathname === "/";
    if (link.path.includes("?")) {
      const [p, query] = link.path.split("?");
      const paramCat = new URLSearchParams(query).get("category");
      const currentCat = new URLSearchParams(location.search).get("category");
      return location.pathname === p && currentCat === paramCat;
    }
    return location.pathname.startsWith(link.path);
  };

  const announcements = [
    "Freshly Prepared Daily",
    "Pure Ingredients",
    "Made with Care",
    "100% Shudh Desi Ghee",
    "Authentic Indian Mithai & Savoury Namkeen",
    "Bespoke Celebration Keepsake Gifting",
    "Pan-India Express Concierge"
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF8]/95 backdrop-blur-md border-b border-[#EFE5D5] transition-all duration-300">
      
      {/* Top Announcement Auto-Scrolling Ticker */}
      <div className="relative bg-[#5A171C] text-[#F8F2E8] text-[11px] py-1.5 overflow-hidden border-b border-[#741F24]/60 group">
        {/* Subtle left & right gradient fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-[#5A171C] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-[#5A171C] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee items-center text-[11px] tracking-wider uppercase font-medium">
          {/* Loop 1 */}
          <div className="flex items-center shrink-0 pr-6 sm:pr-8">
            {announcements.map((item, idx) => (
              <React.Fragment key={`top1-${idx}`}>
                <span className="whitespace-nowrap px-4">{item}</span>
                <span className="text-[#D9B66F] select-none text-[8px]">✦</span>
              </React.Fragment>
            ))}
          </div>

          {/* Loop 2 (seamless continuation) */}
          <div className="flex items-center shrink-0 pr-6 sm:pr-8" aria-hidden="true">
            {announcements.map((item, idx) => (
              <React.Fragment key={`top2-${idx}`}>
                <span className="whitespace-nowrap px-4">{item}</span>
                <span className="text-[#D9B66F] select-none text-[8px]">✦</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#5A171C] hover:text-[#3E0C10] focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* MS SWEETS Logo (Section 5) */}
          <div className="flex-1 lg:flex-none flex items-center justify-center lg:justify-start">
            <Link to="/" className="flex flex-col items-center lg:items-start group">
              <div className="flex items-center gap-1.5">
                {/* Subtle Traditional Motif SVG */}
                <svg className="w-4 h-4 text-[#C89B52] opacity-80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" opacity="0.85" />
                </svg>
                <span className="font-serif text-2xl sm:text-[26px] font-bold tracking-[0.16em] text-[#5A171C] group-hover:text-[#741F24] transition-colors leading-none">
                  MS SWEETS
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.24em] text-[#C89B52] font-semibold mt-1">
                SWEET MOMENTS, ALWAYS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const active = isNavActive(link);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-[14px] font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                    active
                      ? "text-[#5A171C] font-semibold"
                      : "text-[#423631] hover:text-[#5A171C]"
                  }`}
                >
                  {link.name}
                  {/* Subtle hover / active antique gold underline */}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C89B52] transition-transform duration-200 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Search, Account, Enquiry Cart */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search */}
            <button
              onClick={() => {
                if (onOpenSearch) onOpenSearch();
                else navigate("/products");
              }}
              className="p-2 text-[#423631] hover:text-[#5A171C] hover:bg-[#F8F2E8] rounded-full transition-colors"
              title="Search sweets & snacks"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Account / Admin */}
            <Link
              to={isAuthenticated ? "/admin" : "/admin/login"}
              className="p-2 text-[#423631] hover:text-[#5A171C] hover:bg-[#F8F2E8] rounded-full transition-colors hidden sm:flex items-center"
              title={isAuthenticated ? "Admin Portal" : "Staff Account"}
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Enquiry Cart */}
            <button
              onClick={openDrawer}
              className="relative py-2 px-3.5 bg-[#5A171C] text-[#FFFDF8] hover:bg-[#741F24] rounded-lg transition-all shadow-xs flex items-center gap-2 group"
              aria-label="Enquiry Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#D9B66F]" />
              <span className="hidden md:inline text-xs font-semibold tracking-wider uppercase">
                Enquiry Cart
              </span>
              {totalItems > 0 && (
                <span className="bg-[#C89B52] text-[#2A211D] text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[1.25rem] text-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF8] border-b border-[#EFE5D5] px-6 py-4 space-y-2.5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-1.5 text-sm font-medium ${
                isNavActive(link)
                  ? "text-[#5A171C] font-semibold border-l-2 border-[#C89B52] pl-2.5"
                  : "text-[#423631] hover:text-[#5A171C] pl-1"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-3 border-t border-[#EFE5D5] flex items-center justify-between text-xs text-[#7A6961]">
            <Link
              to={isAuthenticated ? "/admin" : "/admin/login"}
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#5A171C]"
            >
              {isAuthenticated ? "Admin Portal" : "Staff Login"}
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openDrawer();
              }}
              className="text-[#5A171C] font-semibold"
            >
              View Enquiry Cart ({totalItems})
            </button>
          </div>
        </div>
      )}

    </header>
  );
}

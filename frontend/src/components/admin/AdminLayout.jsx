import React, { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  Boxes, 
  Inbox, 
  Users, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ShieldCheck 
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import { BRAND_CONFIG } from "../../config/brand.js";
import PageTransition from "../common/PageTransition.jsx";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Section 23: Dashboard, Products, Categories, Stock, Customers, Enquiries
  const navItems = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Products", path: "/admin/products", icon: Package },
    { label: "Categories", path: "/admin/categories", icon: Layers },
    { label: "Stock", path: "/admin/stock", icon: Boxes },
    { label: "Customers", path: "/admin/customers", icon: Users },
    { label: "Enquiries", path: "/admin/enquiries", icon: Inbox }
  ];

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-[#F8F2E8] flex font-sans text-[#2A211D] antialiased">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Dark Burgundy Sidebar (Section 23) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#5A171C] text-[#FFFDF8] flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-[#741F24] bg-[#3E0C10]">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl font-bold tracking-widest text-[#D9B66F]">
                  MS SWEETS
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#D9B66F]/20 text-[#D9B66F] font-bold">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-[#E3D4BF] mt-0.5">
                Back-Office Operations
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 text-white/70 hover:text-white lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                    active
                      ? "bg-[#D9B66F] text-[#2A211D] font-bold shadow-xs"
                      : "text-[#F8F2E8] hover:bg-[#741F24] hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#741F24] space-y-2 bg-[#3E0C10]/60">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-[#E3D4BF] hover:bg-[#741F24] hover:text-[#D9B66F] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Storefront</span>
            </span>
            <span className="text-[10px] bg-[#5A171C] px-1.5 py-0.5 rounded text-[#D9B66F]">
              Demo
            </span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs text-rose-300 hover:bg-rose-950/40 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-[#EFE5D5] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-[#2A211D] hover:text-[#5A171C] lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 text-xs text-[#7A6961]">
              <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
              <span className="font-semibold text-[#2A211D]">MS Sweets Administrative Portal</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-[#2A211D]">
                {user?.name || "Administrator"}
              </div>
              <div className="text-[10px] text-[#7A6961]">
                @{user?.username || "admin"}
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#5A171C] text-[#D9B66F] font-serif font-bold flex items-center justify-center text-xs">
              M
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>

    </div>
  );
}

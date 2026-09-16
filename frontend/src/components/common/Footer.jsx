import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, MapPin, Clock, ShieldCheck } from "lucide-react";
import { BRAND_CONFIG } from "../../config/brand.js";
import { generateWhatsAppLink } from "../../utils/whatsapp.js";

export default function Footer() {
  const whatsappUrl = generateWhatsAppLink({
    customMessage: "Hello MS Sweets! I would like to enquire about your freshly prepared sweets, snacks, and celebration gift boxes."
  });

  return (
    <footer className="bg-[#5A171C] text-[#FFFDF8] border-t border-[#C89B52]/30 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-[#C89B52]/20">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-[#D9B66F]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" opacity="0.9" />
                </svg>
                <span className="font-serif text-2xl font-bold tracking-[0.16em] text-[#FFFDF8]">
                  MS SWEETS
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[#D9B66F] font-semibold mt-1">
                {BRAND_CONFIG.tagline}
              </p>
            </Link>
            <p className="text-xs text-[#F8F2E8]/80 leading-relaxed font-light">
              Crafting authentic Indian mithai, savoury snacks, and luxury gift boxes. Handcrafted with pure desi cow ghee, freshly roasted spices, and heirloom recipes since {BRAND_CONFIG.estYear}.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-[#D9B66F]">
              <ShieldCheck className="w-4 h-4 text-[#D9B66F]" />
              <span>100% Shudh Shakahari (Pure Vegetarian)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.18em] text-[#D9B66F] font-semibold mb-4">
              Explore Selections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F8F2E8]/85">
              <li>
                <Link to="/products?category=cat_sweets" className="hover:text-[#D9B66F] transition-colors">
                  Traditional Mithai
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat_snacks" className="hover:text-[#D9B66F] transition-colors">
                  Savoury Snacks & Namkeen
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat_kaju" className="hover:text-[#D9B66F] transition-colors">
                  Kaju Katli & Rolls
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat_laddu" className="hover:text-[#D9B66F] transition-colors">
                  Desi Ghee Laddus
                </Link>
              </li>
              <li>
                <Link to="/products?category=cat_gifting" className="hover:text-[#D9B66F] transition-colors">
                  Celebration Gift Boxes
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D9B66F] transition-colors">
                  Our Sweet Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Sweet Occasions */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.18em] text-[#D9B66F] font-semibold mb-4">
              Celebrations
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F8F2E8]/85">
              <li>
                <Link to="/gifting" className="hover:text-[#D9B66F] transition-colors">
                  Wedding Sweets & Hampers
                </Link>
              </li>
              <li>
                <Link to="/gifting" className="hover:text-[#D9B66F] transition-colors">
                  Diwali & Festive Pre-Orders
                </Link>
              </li>
              <li>
                <Link to="/gifting" className="hover:text-[#D9B66F] transition-colors">
                  Corporate Bulk Gifting
                </Link>
              </li>
              <li>
                <Link to="/gifting" className="hover:text-[#D9B66F] transition-colors">
                  Family Occasions & Birthdays
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D9B66F] transition-colors">
                  Custom Orders & Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge & Store Contact */}
          <div>
            <h4 className="font-serif text-sm uppercase tracking-[0.18em] text-[#D9B66F] font-semibold mb-4">
              Sweet Concierge
            </h4>
            <div className="space-y-3 text-xs text-[#F8F2E8]/85">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#D9B66F] hover:text-[#FFFDF8] transition-colors group"
              >
                <MessageCircle className="w-4 h-4 text-[#D9B66F] group-hover:scale-110 transition-transform" />
                <span className="font-medium">Direct WhatsApp Support</span>
              </a>

              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D9B66F]" />
                <span>{BRAND_CONFIG.phone}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D9B66F]" />
                <span className="truncate">{BRAND_CONFIG.email}</span>
              </div>

              <div className="flex items-start gap-2 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#D9B66F] mt-0.5 shrink-0" />
                <span className="leading-relaxed text-[#F8F2E8]/70">
                  {BRAND_CONFIG.address}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[#F8F2E8]/70 pt-0.5">
                <Clock className="w-3 h-3 text-[#D9B66F]" />
                <span>{BRAND_CONFIG.workingHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Subfooter */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#F8F2E8]/60">
          <p>© {new Date().getFullYear()} {BRAND_CONFIG.businessName}. All rights reserved. Handcrafted with care.</p>
          <div className="flex items-center space-x-5">
            <Link to="/admin/login" className="text-[#D9B66F]/80 hover:text-[#FFFDF8] transition-colors">
              Staff & Admin Portal
            </Link>
            <span>•</span>
            <span>Production Demo</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

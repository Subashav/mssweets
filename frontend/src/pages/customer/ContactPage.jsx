import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";
import { BRAND_CONFIG } from "../../config/brand.js";
import { generateWhatsAppLink } from "../../utils/whatsapp.js";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Celebration Inquiry",
    message: ""
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({
        name: "",
        phone: "",
        email: "",
        subject: "Celebration Inquiry",
        message: ""
      });
    }, 4000);
  };

  const whatsappUrl = generateWhatsAppLink({
    customMessage: "Hello! I would like to enquire about your boutique sweet shop collections and bespoke services."
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.26em] text-[#C5A059] font-bold">
          Boutique Concierge
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917]">
          Connect With Our Confectioners
        </h1>
        <p className="text-sm sm:text-base text-[#78716C] font-light">
          Whether you are planning wedding favors, corporate gifting suites, or festive celebrations, our concierge team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Contact Info Card */}
        <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-[#EADBB6] shadow-sm space-y-6">
          <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
            Flagship Atelier & Lounge
          </h2>
          
          <div className="space-y-4 text-sm text-[#57534E]">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#5B131A] mt-0.5 shrink-0" />
              <div>
                <strong className="block text-[#1C1917]">Boutique Address:</strong>
                <span>{BRAND_CONFIG.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#5B131A] shrink-0" />
              <div>
                <strong className="block text-[#1C1917]">Concierge Telephone:</strong>
                <span>{BRAND_CONFIG.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#5B131A] shrink-0" />
              <div>
                <strong className="block text-[#1C1917]">Email Inquiries:</strong>
                <span>{BRAND_CONFIG.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#5B131A] shrink-0" />
              <div>
                <strong className="block text-[#1C1917]">Boutique Hours:</strong>
                <span>{BRAND_CONFIG.workingHours}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F3ECE1] space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#78716C] font-semibold block">
              Instant Messaging:
            </span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs uppercase tracking-widest font-bold rounded shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-[#EADBB6] shadow-sm">
          <h3 className="font-serif text-2xl font-bold text-[#1C1917] mb-2">
            Send a Concierge Request
          </h3>
          <p className="text-xs text-[#78716C] mb-6">
            Leave us a note and our team will get back to you within a few working hours.
          </p>

          {sent ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-[#047857] mx-auto" />
              <h4 className="font-serif text-xl font-bold text-[#1C1917]">
                Thank You for Contacting Us
              </h4>
              <p className="text-xs text-[#78716C] max-w-sm mx-auto">
                Your message has been safely delivered to our customer relations team.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full px-3 py-2.5 text-sm bg-[#FAF7F2] border border-[#EADBB6] rounded focus:border-[#5B131A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3 py-2.5 text-sm bg-[#FAF7F2] border border-[#EADBB6] rounded focus:border-[#5B131A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="e.g. vikram@example.com"
                  className="w-full px-3 py-2.5 text-sm bg-[#FAF7F2] border border-[#EADBB6] rounded focus:border-[#5B131A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm bg-[#FAF7F2] border border-[#EADBB6] rounded focus:border-[#5B131A] focus:outline-none"
                >
                  <option value="Celebration Inquiry">General Celebration Inquiry</option>
                  <option value="Wedding Hampers">Bespoke Wedding Favors & Platters</option>
                  <option value="Corporate Gifting">Corporate Bulk Gifting Suites</option>
                  <option value="Festival Orders">Festive Pre-Orders</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#44403C] mb-1">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Describe your requirement, dates, quantity or special instructions..."
                  className="w-full px-3 py-2.5 text-sm bg-[#FAF7F2] border border-[#EADBB6] rounded focus:border-[#5B131A] focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#5B131A] hover:bg-[#4A0E15] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-bold rounded shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

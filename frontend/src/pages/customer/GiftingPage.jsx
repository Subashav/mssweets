import React, { useState, useEffect } from "react";
import { Gift, Sparkles, CheckCircle, ArrowRight, MessageCircle, Heart } from "lucide-react";
import { BRAND_CONFIG } from "../../config/brand.js";
import { api } from "../../services/api.js";
import ProductCard from "../../components/customer/ProductCard.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { generateWhatsAppLink } from "../../utils/whatsapp.js";

export default function GiftingPage() {
  const [giftBoxes, setGiftBoxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openDrawer } = useCart();

  useEffect(() => {
    async function loadGifting() {
      try {
        setLoading(true);
        const res = await api.products.getPublic({ category: "cat_gifting" });
        if (res.data) setGiftBoxes(res.data);
      } catch (e) {
        console.error("Failed to load gifting products:", e);
      } finally {
        setLoading(false);
      }
    }
    loadGifting();
  }, []);

  const giftingPillars = [
    {
      title: "Handcrafted Luxury Boxes",
      desc: "Velvet textured, gold foil-stamped, and jewel-toned keepsakes designed to make an indelible impression."
    },
    {
      title: "Custom Monogramming",
      desc: "Personalized wedding stationery, corporate logos, and custom celebration cards tucked into each suite."
    },
    {
      title: "Freshness Guaranteed",
      desc: "Sealed hermetically on the morning of dispatch with temperature-controlled transit packaging."
    },
    {
      title: "Pan-India Concierge Delivery",
      desc: "Seamless bulk delivery to single or multi-city recipient lists with live dispatch tracking."
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 py-12 pb-24">
      
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-[#4A0E15] text-[#FAF7F2] p-8 sm:p-14 lg:p-20 shadow-2xl border-2 border-[#C5A059]/40">
          <div className="max-w-2xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 text-[#EADBB6] text-xs uppercase tracking-widest font-semibold border border-[#C5A059]/30">
              <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Artisan Celebration Keepsakes</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Bespoke Mithai Gifting for Timeless Moments
            </h1>

            <p className="text-sm sm:text-base text-[#E7DDD0]/85 font-light leading-relaxed">
              Whether celebrating auspicious wedding vows, honoring valued corporate patrons, or sharing festive joy during Diwali, our handcrafted gifting collections elevate every celebration.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={openDrawer}
                className="px-8 py-4 bg-[#C5A059] hover:bg-[#AB843B] text-[#1C1917] text-xs uppercase tracking-[0.2em] font-bold rounded shadow-md transition-all flex items-center gap-2"
              >
                <span>Request Custom Gifting Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={generateWhatsAppLink({
                  occasion: "Wedding / Corporate Gifting",
                  customMessage: "Hello! I am inquiring about bespoke gifting hampers for an upcoming event."
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-[#EADBB6]/60 text-xs uppercase tracking-[0.2em] font-bold rounded transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-25 lg:opacity-60 pointer-events-none">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg"
              alt="Luxury Sweets Hamper"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A0E15] to-transparent" />
          </div>
        </div>
      </section>

      {/* Gifting Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {giftingPillars.map((p) => (
            <div key={p.title} className="p-6 bg-white rounded-xl border border-[#EADBB6] shadow-xs">
              <CheckCircle className="w-6 h-6 text-[#C5A059] mb-3" />
              <h3 className="font-serif text-lg font-bold text-[#1C1917] mb-2">{p.title}</h3>
              <p className="text-xs text-[#78716C] leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Gifting Products Catalogue */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-[0.24em] text-[#C5A059] font-bold">
            Curated Gift Boxes
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
            Signature Celebration Boxes & Hampers
          </h2>
          <p className="text-sm text-[#78716C] font-light">
            Select a signature box below to add directly to your Enquiry Cart with customized gift notes.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-44 sm:h-52 lg:h-96 bg-white rounded-lg border border-[#EADBB6] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            {giftBoxes.map((box) => (
              <ProductCard key={box.id} product={box} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

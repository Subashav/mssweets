import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Heart, Award, ArrowRight } from "lucide-react";
import { BRAND_CONFIG } from "../../config/brand.js";

export default function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-24 py-12 pb-24">
      
      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-[0.28em] text-[#C5A059] font-bold">
          Our Heritage & Ethos
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1C1917] leading-tight">
          Tradition, Handcrafted with Quiet Reverence.
        </h1>
        <p className="text-base sm:text-lg text-[#57534E] font-light leading-relaxed max-w-2xl mx-auto">
          At {BRAND_CONFIG.businessName}, we believe that Indian mithai is not merely a confection — it is the highest expression of celebration, hospitality, and cultural memory.
        </p>
      </section>

      {/* Story & Image Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
              The Craft of Master Halwais
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#57534E] leading-relaxed font-light">
              <p>
                Founded on the premise of reviving time-honoured sweet-making traditions, {BRAND_CONFIG.businessName} marries age-old techniques with modern culinary finesse. We eschew industrial mass-production in favor of disciplined artisanal batches crafted daily at sunrise.
              </p>
              <p>
                From the gentle simmering of whole buffalo and cow dairy in traditional wide-mouthed kadhais to the diamond-precision scoring of silver-adorned Kaju Katli, every step is overseen by seasoned confectioners whose families have practiced this noble art for generations.
              </p>
              <p>
                We source our ingredients without compromise: single-origin Goan cashews, whole Mamra almonds from cold highland valleys, fragrant saffron threads from Pampore in Kashmir, and clarified butter churned from pure cream.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#5B131A] hover:bg-[#4A0E15] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-bold rounded shadow-md transition-all"
              >
                <span>Taste the Legacy</span>
                <ArrowRight className="w-4 h-4 text-[#C5A059]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#EADBB6]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg"
                alt="Artisan Indian Sweets Making"
                className="w-full h-[450px] object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* The 4 Principles of Purity */}
      <section className="bg-[#F3ECE1]/60 py-16 border-y border-[#EADBB6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.24em] text-[#C5A059] font-bold">
              Our Non-Negotiables
            </span>
            <h3 className="font-serif text-3xl font-bold text-[#1C1917]">
              Purity Without Compromise
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-[#EADBB6] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#5B131A] flex items-center justify-center font-serif font-bold text-lg border border-[#EADBB6]">
                01
              </div>
              <h4 className="font-serif text-xl font-bold text-[#1C1917]">100% Shudh Desi Ghee</h4>
              <p className="text-xs text-[#78716C] leading-relaxed">
                We never use hydrogenated oils, palm substitutes, or synthetic shortening. Every fried delicacy and halwa is steeped exclusively in pure golden clarified butter.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-[#EADBB6] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#5B131A] flex items-center justify-center font-serif font-bold text-lg border border-[#EADBB6]">
                02
              </div>
              <h4 className="font-serif text-xl font-bold text-[#1C1917]">No Artificial Preservatives</h4>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Our shelf-lives reflect natural food integrity. Sweets are prepared daily to be enjoyed fresh, naturally sweetened with cane sugar, honey, and organic dates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-[#EADBB6] shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] text-[#5B131A] flex items-center justify-center font-serif font-bold text-lg border border-[#EADBB6]">
                03
              </div>
              <h4 className="font-serif text-xl font-bold text-[#1C1917]">Sanctity of Preparation</h4>
              <p className="text-xs text-[#78716C] leading-relaxed">
                Our kitchen operates under stringent pure-vegetarian protocol, maintaining an atmosphere of cleanliness, respect, and devotion to the culinary craft.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

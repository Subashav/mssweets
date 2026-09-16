import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { api } from "../../services/api.js";

export default function CollectionsPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        const res = await api.categories.getPublic();
        if (res.data) setCategories(res.data);
      } catch (e) {
        console.error("Failed to load collections:", e);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-[0.26em] text-[#C5A059] font-bold">
          Artisanal Categories
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#1C1917]">
          Heritage Sweets & Savouries Collections
        </h1>
        <p className="text-sm sm:text-base text-[#78716C] font-light">
          Each collection represents a distinct tradition of craftsmanship, from royal cashew confections and slow-churned desi ghee laddus to crisp savoury namkeen and bespoke hampers.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 bg-white rounded-xl border border-[#EADBB6] animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#EADBB6] shadow-sm hover:shadow-xl hover:border-[#C5A059] transition-all duration-500 flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#FAF7F2]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#5B131A] border border-[#EADBB6]">
                  {cat.productCount} {cat.productCount === 1 ? "Item" : "Items"} Available
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] group-hover:text-[#5B131A] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78716C] mt-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F3ECE1] flex items-center justify-between text-xs uppercase tracking-widest font-bold text-[#5B131A]">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

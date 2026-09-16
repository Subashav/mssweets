import React, { useState, useEffect } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api.js";
import { formatINR } from "../../utils/price.js";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await api.products.getPublic({ search: query.trim() });
        setResults(res.data?.slice(0, 5) || []);
      } catch (e) {
        console.error("Search error:", e);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="relative max-w-2xl mx-auto bg-[#FAF7F2] rounded-xl shadow-2xl border border-[#EADBB6] overflow-hidden">
        {/* Search Input Bar */}
        <form onSubmit={handleSubmit} className="flex items-center px-5 py-4 border-b border-[#EADBB6]/80 bg-white">
          <Search className="w-5 h-5 text-[#C5A059] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Kaju Katli, Motichoor Laddu, Mysore Pak, Hampers..."
            className="w-full bg-transparent px-4 py-1 text-sm sm:text-base text-[#1C1917] placeholder-[#A8A29E] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-[#78716C] hover:text-[#1C1917] mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#78716C] hover:text-[#5B131A] rounded-full hover:bg-[#FAF7F2]"
          >
            <X className="w-5 h-5" />
          </button>
        </form>

        {/* Results / Suggestions */}
        <div className="p-5 max-h-96 overflow-y-auto">
          {loading && (
            <div className="text-center py-6 text-xs uppercase tracking-widest text-[#78716C]">
              Searching artisanal collection...
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-3">
              <div className="text-[11px] uppercase tracking-widest text-[#C5A059] font-bold">
                Matches Found ({results.length})
              </div>
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3.5 p-2.5 rounded-lg hover:bg-white border border-transparent hover:border-[#EADBB6] transition-all group"
                >
                  <img
                    src={product.images?.[0] || product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded object-cover shrink-0 border border-[#EADBB6]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-[#1C1917] group-hover:text-[#5B131A] truncate">
                      {product.name}
                    </h4>
                    <span className="text-[10px] uppercase tracking-wider text-[#C89B52] font-semibold">
                      {product.categorySlug ? product.categorySlug.replace("-", " ") : "Delicacy"}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif font-bold text-sm text-[#5B131A]">
                      {formatINR(product.retailPrice)}
                    </span>
                    <span className="block text-[10px] text-[#78716C]">/ kg</span>
                  </div>
                </Link>
              ))}

              <button
                onClick={handleSubmit}
                className="w-full mt-3 py-2.5 text-center text-xs uppercase tracking-widest font-semibold text-[#5B131A] hover:bg-[#F3ECE1] rounded border border-[#EADBB6] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>View All Results for "{query}"</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-8 text-sm text-[#78716C]">
              No mithai found matching "<span className="text-[#5B131A] font-semibold">{query}</span>". Try searching for "Kaju", "Laddu", "Mysore Pak", or "Gifting".
            </div>
          )}

          {!query && (
            <div className="space-y-3">
              <div className="text-[11px] uppercase tracking-widest text-[#78716C] font-semibold">
                Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {["Kaju Katli", "Motichoor Laddu", "Ghee Mysore Pak", "Rasgulla", "Dry Fruit Barfi", "Celebration Box"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 text-xs bg-white hover:bg-[#F3ECE1] border border-[#EADBB6] text-[#44403C] hover:text-[#5B131A] rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

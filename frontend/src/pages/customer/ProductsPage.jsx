import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, RefreshCw, X } from "lucide-react";
import { api } from "../../services/api.js";
import ProductCard from "../../components/customer/ProductCard.jsx";

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [availability, setAvailability] = useState(searchParams.get("availability") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "recommended");
  const [priceRange, setPriceRange] = useState(searchParams.get("maxPrice") || "3000");

  useEffect(() => {
    const cat = searchParams.get("category");
    const q = searchParams.get("search");
    if (cat !== null) setSelectedCategory(cat);
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await api.categories.getPublic();
        if (res.data) setCategories(res.data);
      } catch (e) {
        console.error("Categories error:", e);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const params = {
          category: selectedCategory,
          search: searchQuery,
          availability,
          sort: sortBy,
          maxPrice: priceRange
        };
        const res = await api.products.getPublic(params);
        if (res.data) setProducts(res.data);
      } catch (e) {
        console.error("Products error:", e);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [selectedCategory, searchQuery, availability, sortBy, priceRange]);

  const handleReset = () => {
    setSelectedCategory("");
    setSearchQuery("");
    setAvailability("");
    setSortBy("recommended");
    setPriceRange("3000");
    setSearchParams({});
  };

  // Quick category tabs based on Section 18: All, Sweets, Snacks, Namkeen, Gift Boxes
  const primaryTabs = [
    { label: "All", id: "" },
    { label: "Sweets", id: "cat_sweets" },
    { label: "Snacks", id: "cat_snacks" },
    { label: "Namkeen", id: "cat_namkeen" },
    { label: "Gift Boxes", id: "cat_gifting" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Editorial Header (Section 18) */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#2A211D]">
          Discover Something Sweet
        </h1>
        <div className="w-12 h-[2px] bg-[#D9B66F] mx-auto my-2" />
        <p className="text-xs sm:text-sm text-[#7A6961]">
          Freshly prepared Indian mithai, savoury namkeen, and thoughtfully packed celebration boxes.
        </p>
      </div>

      {/* Primary Category Quick Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {primaryTabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg transition-colors border ${
              selectedCategory === tab.id
                ? "bg-[#5A171C] text-[#FFFDF8] border-[#5A171C]"
                : "bg-white text-[#423631] border-[#EFE5D5] hover:border-[#C89B52]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter and Controls Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-[#EFE5D5] shadow-2xs flex flex-wrap items-center justify-between gap-4">
        
        {/* Search */}
        <div className="flex-1 min-w-[220px] relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Kaju Katli, Mixture, Murukku, Laddus..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#FFFDF8] border border-[#EFE5D5] rounded-lg focus:outline-none focus:border-[#5A171C]"
          />
          <Search className="w-4 h-4 text-[#7A6961] absolute left-3 top-2.5" />
        </div>

        {/* Availability Filter */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#7A6961] hidden sm:inline">Availability:</span>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="py-1.5 px-3 text-xs bg-[#FFFDF8] border border-[#EFE5D5] rounded-lg text-[#2A211D] focus:outline-none"
          >
            <option value="">All Stock</option>
            <option value="in_stock">In Stock Only</option>
            <option value="limited_stock">Limited Stock</option>
          </select>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#7A6961] hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="py-1.5 px-3 text-xs bg-[#FFFDF8] border border-[#EFE5D5] rounded-lg text-[#2A211D] focus:outline-none"
          >
            <option value="recommended">Recommended</option>
            <option value="price_low_high">Price Low → High</option>
            <option value="price_high_low">Price High → Low</option>
          </select>
        </div>

        {/* Reset */}
        {(selectedCategory || searchQuery || availability || sortBy !== "recommended") && (
          <button
            onClick={handleReset}
            className="text-xs font-semibold text-[#5A171C] hover:underline flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Spacious Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-44 sm:h-52 lg:h-80 bg-white rounded-xl border border-[#EFE5D5] animate-pulse" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        /* Empty State (Section 43) */
        <div className="text-center py-20 bg-white rounded-xl border border-[#EFE5D5] p-8 space-y-3">
          <h3 className="font-serif text-2xl font-bold text-[#2A211D]">
            Nothing sweet here yet.
          </h3>
          <p className="text-xs text-[#7A6961] max-w-sm mx-auto">
            Try changing your search keywords or resetting the selected category filter.
          </p>
          <button
            onClick={handleReset}
            className="mt-2 px-6 py-2.5 bg-[#5A171C] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-[#741F24] transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}

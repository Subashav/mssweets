import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Eye, Check } from "lucide-react";
import { formatINR, calculateWeightPrice } from "../../utils/price.js";
import { useCart } from "../../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const weightOptions = product.weightOptions || ["250g", "500g", "1kg"];
  const [selectedWeight, setSelectedWeight] = useState(weightOptions[0] || "1kg");
  const [isAdded, setIsAdded] = useState(false);

  const dynamicPrice = calculateWeightPrice(product.retailPrice, selectedWeight);

  const availability = product.availability || (
    product.stockQuantity <= 0 ? "Out of Stock" :
    product.stockQuantity <= 10 ? "Limited Stock" : "In Stock"
  );

  const isOutOfStock = availability === "Out of Stock";

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, selectedWeight, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const getStatusDot = () => {
    if (availability === "Out of Stock") return "text-[#8C2B2F]";
    if (availability === "Limited Stock") return "text-[#C89B52]";
    return "text-[#2E7D32]";
  };

  const mainImage = product.images?.[0] || product.image || "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg";

  return (
    <div className="product-card bg-white rounded-xl overflow-hidden border border-[#EFE5D5] flex flex-row lg:flex-col justify-between group">
      {/* Left on mobile/tab, Top on desktop */}
      <div className="relative w-36 sm:w-48 md:w-56 lg:w-full shrink-0 overflow-hidden bg-[#F8F2E8] product-image-container">
        <Link to={`/products/${product.id}`} className="block h-full w-full">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover lg:aspect-[4/3]"
            loading="lazy"
          />
        </Link>

        {/* Quick Details Floating Icon */}
        <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Link
            to={`/products/${product.id}`}
            className="p-2 bg-white/90 hover:bg-white text-[#5A171C] rounded-full shadow-xs transition-colors flex items-center justify-center"
            title="View Sweet Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Right on mobile/tab, Bottom on desktop */}
      <div className="flex-1 flex flex-col justify-between p-3.5 sm:p-4 min-w-0">
        <div className="space-y-1.5 sm:space-y-2">
          {/* Category Eyebrow */}
          <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C89B52] font-semibold truncate">
            {product.categorySlug ? product.categorySlug.replace("-", " ") : "Delicacy"}
          </div>

          {/* Product Name */}
          <Link to={`/products/${product.id}`} className="block">
            <h3 className="font-serif text-[17px] sm:text-[19px] lg:text-[20px] font-bold text-[#2A211D] group-hover:text-[#5A171C] transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Weight Selector */}
          {weightOptions && weightOptions.length > 1 && (
            <div className="pt-1">
              <div className="grid grid-cols-3 gap-1 max-w-xs">
                {weightOptions.map((weight) => (
                  <button
                    key={weight}
                    type="button"
                    onClick={() => setSelectedWeight(weight)}
                    className={`py-1 text-[10px] sm:text-[11px] rounded border transition-colors text-center font-medium ${
                      selectedWeight === weight
                        ? "bg-[#5A171C] text-[#FFFDF8] border-[#5A171C]"
                        : "bg-[#FFFDF8] text-[#5C4D46] border-[#EFE5D5] hover:border-[#C89B52]"
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price & Availability */}
          <div className="pt-1 flex items-baseline justify-between flex-wrap gap-1">
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-lg sm:text-xl font-bold text-[#5A171C]">
                {formatINR(dynamicPrice)}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#7A6961]">
                {weightOptions.length > 1 ? `(${selectedWeight})` : ""}
              </span>
            </div>

            {/* Availability with Dot */}
            <div className={`text-[10px] sm:text-[11px] font-medium flex items-center gap-1 ${getStatusDot()}`}>
              <span>●</span>
              <span>{availability}</span>
            </div>
          </div>
        </div>

        {/* Card Footer CTA */}
        <div className="pt-3">
          <button
            onClick={handleAdd}
            disabled={isOutOfStock}
            className={`w-full py-2 sm:py-2.5 px-3 text-[11px] sm:text-xs uppercase tracking-wider font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
              isOutOfStock
                ? "bg-[#EFE5D5] text-[#7A6961] cursor-not-allowed"
                : isAdded
                ? "bg-[#2E7D32] text-white"
                : "bg-[#5A171C] hover:bg-[#741F24] text-[#FFFDF8] shadow-2xs hover:shadow-xs active:translate-y-0"
            }`}
          >
            {isOutOfStock ? (
              <span>Out of Stock</span>
            ) : isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#D9B66F]" />
                <span>Add to Enquiry</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

}

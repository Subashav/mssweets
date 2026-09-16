import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ShoppingBag, 
  MessageCircle, 
  Check, 
  ChevronRight, 
  Star,
  ShieldCheck,
  Clock,
  Package
} from "lucide-react";
import { api } from "../../services/api.js";
import { formatINR, calculateWeightPrice } from "../../utils/price.js";
import { generateProductWhatsAppLink } from "../../utils/whatsapp.js";
import { useCart } from "../../context/CartContext.jsx";
import ProductCard from "../../components/customer/ProductCard.jsx";

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedWeight, setSelectedWeight] = useState("1kg");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);
        const res = await api.products.getById(id);
        if (res.data) {
          const prod = res.data;
          setProduct(prod);
          setSelectedImage(0);
          if (prod.weightOptions && prod.weightOptions.length > 0) {
            setSelectedWeight(prod.weightOptions[0]);
          }

          if (prod.categoryId) {
            const relRes = await api.products.getPublic({ category: prod.categoryId });
            if (relRes.data) {
              setRelatedProducts(relRes.data.filter((p) => p.id !== prod.id).slice(0, 3));
            }
          }
        }
      } catch (err) {
        setError(err.message || "Failed to load product details");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#5A171C] border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-xs uppercase tracking-widest text-[#7A6961]">
          Unveiling Confectionery Details...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-serif text-3xl font-bold text-[#2A211D]">
          Sweet Delicacy Not Found
        </h2>
        <p className="text-xs text-[#7A6961]">
          {error || "The requested item is either unavailable or has been archived."}
        </p>
        <Link
          to="/products"
          className="inline-block mt-3 px-6 py-2.5 bg-[#5A171C] text-white text-xs uppercase tracking-widest font-bold rounded-lg"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image || "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg"];

  const dynamicPrice = calculateWeightPrice(product.retailPrice, selectedWeight);
  const isOutOfStock = product.availability === "Out of Stock" || product.stockQuantity <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedWeight, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const whatsappUrl = generateProductWhatsAppLink(product, selectedWeight);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#7A6961]">
        <Link to="/" className="hover:text-[#5A171C]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link to="/products" className="hover:text-[#5A171C]">Sweets & Snacks</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#5A171C] font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Showcase (Section 19) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* Left Column: Large Image Gallery */}
        <div className="lg:col-span-7 space-y-3">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F8F2E8] border border-[#EFE5D5]">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-18 h-18 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx ? "border-[#5A171C]" : "border-[#EFE5D5]"
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Information */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#C89B52] font-semibold">
              {product.categorySlug ? product.categorySlug.replace("-", " ") : "Delicacy"}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A211D]">
              {product.name}
            </h1>

            {/* Star Rating & Favourite Tag (Section 19) */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <div className="flex text-[#D9B66F]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-[#D9B66F]" />
                ))}
              </div>
              <span className="text-[#7A6961] font-medium">Premium Favourite</span>
            </div>
          </div>

          {/* Price */}
          <div className="pt-2 border-t border-[#EFE5D5]">
            <span className="text-[11px] uppercase tracking-wider text-[#7A6961] block">
              Estimated Rate
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl font-bold text-[#5A171C]">
                {formatINR(dynamicPrice)}
              </span>
              {product.weightOptions && product.weightOptions.length > 1 && (
                <span className="text-xs text-[#7A6961]">
                  for {selectedWeight}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-[#5C4D46] leading-relaxed font-light">
            {product.description}
          </p>

          {/* Weight Selection (250g, 500g, 1kg) */}
          {product.weightOptions && product.weightOptions.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-semibold text-[#423631]">
                <span>Weight:</span>
                <span className="text-[#5A171C] font-bold">{selectedWeight}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.weightOptions.map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-colors border ${
                      selectedWeight === weight
                        ? "bg-[#5A171C] text-[#FFFDF8] border-[#5A171C]"
                        : "bg-white text-[#423631] border-[#EFE5D5] hover:border-[#C89B52]"
                    }`}
                  >
                    {weight}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls & Estimated Total */}
          <div className="pt-2 flex items-center gap-4">
            <div className="flex items-center border border-[#EFE5D5] rounded-lg bg-white h-11">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 text-[#5A171C] font-bold h-full hover:bg-[#F8F2E8]"
              >
                −
              </button>
              <span className="px-3 text-xs font-bold text-[#2A211D]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 text-[#5A171C] font-bold h-full hover:bg-[#F8F2E8]"
              >
                +
              </button>
            </div>

            <div className="text-xs">
              <span className="text-[#7A6961] block">Estimated Total:</span>
              <strong className="font-serif text-lg font-bold text-[#5A171C]">
                {formatINR(dynamicPrice * quantity)}
              </strong>
            </div>
          </div>

          {/* Buttons: ADD TO ENQUIRY & ENQUIRE ON WHATSAPP */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full h-12 text-xs uppercase tracking-[0.2em] font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-xs ${
                isOutOfStock
                  ? "bg-[#EFE5D5] text-[#7A6961] cursor-not-allowed"
                  : isAdded
                  ? "bg-[#2E7D32] text-white"
                  : "bg-[#5A171C] hover:bg-[#741F24] text-[#FFFDF8]"
              }`}
            >
              {isOutOfStock ? (
                <span>Currently Out of Stock</span>
              ) : isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Enquiry</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#D9B66F]" />
                  <span>ADD TO ENQUIRY</span>
                </>
              )}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 bg-white hover:bg-[#F8F2E8] border border-[#EFE5D5] text-[#2A211D] text-xs uppercase tracking-[0.16em] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#2E7D32]" />
              <span>ENQUIRE ON WHATSAPP</span>
            </a>
          </div>

          {/* Metadata Specs (Section 19) */}
          <div className="pt-4 border-t border-[#EFE5D5] space-y-3 text-xs">
            <div className="bg-[#F8F2E8] p-3 rounded-lg border border-[#EFE5D5]">
              <strong className="text-[#5A171C] block mb-0.5">Ingredients</strong>
              <span className="text-[#5C4D46]">
                {product.ingredients || "Pure Ghee, Cashews, Saffron, Sugar, Cardamom."}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F8F2E8] p-2.5 rounded-lg border border-[#EFE5D5]">
                <strong className="text-[#5A171C] block mb-0.5">Storage</strong>
                <span className="text-[#5C4D46]">
                  {product.storageInformation || "Store in a cool dry area."}
                </span>
              </div>
              <div className="bg-[#F8F2E8] p-2.5 rounded-lg border border-[#EFE5D5]">
                <strong className="text-[#5A171C] block mb-0.5">Best Before</strong>
                <span className="text-[#5C4D46]">
                  {product.bestBefore || "15 days from preparation"}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-[#EFE5D5] space-y-6">
          <h3 className="font-serif text-2xl font-bold text-[#2A211D]">
            You May Also Enjoy
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

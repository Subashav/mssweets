import React, { useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle, CheckCircle } from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import { formatINR } from "../../utils/price.js";
import { BRAND_CONFIG } from "../../config/brand.js";
import { api } from "../../services/api.js";
import { generateWhatsAppLink } from "../../utils/whatsapp.js";

export default function EnquiryDrawer() {
  const {
    items,
    totalItems,
    subtotal,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const [viewState, setViewState] = useState("cart"); // "cart" | "form" | "success"
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    occasion: "General",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [submittedEnquiry, setSubmittedEnquiry] = useState(null);

  if (!isDrawerOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError("Please provide your full name.");
      return;
    }
    if (!formData.phone.trim()) {
      setFormError("Please enter your contact phone number.");
      return;
    }
    if (items.length === 0) {
      setFormError("Your enquiry cart is empty.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const payload = {
        customerName: formData.name.trim(),
        customerPhone: formData.phone.trim(),
        customerEmail: formData.email.trim(),
        customerLocation: formData.location.trim(),
        occasion: formData.occasion,
        message: formData.message.trim(),
        items: items.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          weight: item.weight,
          quantity: item.quantity,
          priceSnapshot: item.priceSnapshot,
          image: item.image
        })),
        estimatedTotal: subtotal
      };

      const res = await api.enquiries.create(payload);
      if (res.success && res.data) {
        setSubmittedEnquiry(res.data);
        clearCart();
        setViewState("success");
      } else {
        throw new Error(res.message || "Failed to submit enquiry");
      }
    } catch (err) {
      setFormError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setViewState("cart");
    setFormData({
      name: "",
      phone: "",
      email: "",
      location: "",
      occasion: "General",
      message: ""
    });
    setSubmittedEnquiry(null);
    closeDrawer();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-2xs transition-opacity"
        onClick={handleResetAndClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF8] shadow-xl flex flex-col justify-between border-l border-[#EFE5D5]">
          
          {/* Header (Section 20) */}
          <div className="p-5 bg-[#5A171C] text-[#FFFDF8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#D9B66F]" />
              <div>
                <h3 className="font-serif text-lg font-bold tracking-wide">
                  {viewState === "form" ? "Let's Make It Special" : "Your Sweet Selection"}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-[#D9B66F] block">
                  {totalItems} {totalItems === 1 ? "Item" : "Items"} in Cart
                </span>
              </div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="p-1 text-[#FFFDF8]/80 hover:text-white rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            
            {/* 1. CART VIEW */}
            {viewState === "cart" && (
              <>
                {items.length === 0 ? (
                  <div className="text-center py-16 px-4 space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[#F8F2E8] text-[#5A171C] flex items-center justify-center mx-auto border border-[#EFE5D5]">
                      <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#2A211D]">
                      Your enquiry cart is waiting for something delicious.
                    </h4>
                    <p className="text-xs text-[#7A6961]">
                      Add freshly prepared sweets, savouries, or celebratory boxes.
                    </p>
                    <button
                      onClick={closeDrawer}
                      className="mt-2 px-5 py-2.5 bg-[#5A171C] text-white text-xs uppercase tracking-widest font-bold rounded-lg hover:bg-[#741F24]"
                    >
                      Explore Sweets
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.key}
                        className="bg-white p-3 rounded-lg border border-[#EFE5D5] flex gap-3 items-center"
                      >
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="w-14 h-14 object-cover rounded bg-[#F8F2E8] shrink-0 border border-[#EFE5D5]"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif text-base font-bold text-[#2A211D] truncate">
                            {item.productName}
                          </h4>
                          <div className="text-[11px] text-[#7A6961]">
                            Weight: <strong className="text-[#5A171C]">{item.weight}</strong>
                          </div>
                          <div className="text-[11px] text-[#7A6961]">
                            {formatINR(item.priceSnapshot)} each
                          </div>

                          <div className="flex items-center justify-between mt-1.5">
                            <div className="flex items-center border border-[#EFE5D5] rounded bg-[#FFFDF8]">
                              <button
                                onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                className="px-2 py-0.5 text-xs text-[#5A171C] hover:bg-[#F8F2E8]"
                              >
                                −
                              </button>
                              <span className="px-2 text-xs font-bold text-[#2A211D]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                className="px-2 py-0.5 text-xs text-[#5A171C] hover:bg-[#F8F2E8]"
                              >
                                +
                              </button>
                            </div>

                            <div className="flex items-center gap-2.5">
                              <span className="font-serif font-bold text-sm text-[#5A171C]">
                                {formatINR(item.priceSnapshot * item.quantity)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.key)}
                                className="text-slate-400 hover:text-rose-600"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* 2. ENQUIRY FORM VIEW (Section 21) */}
            {viewState === "form" && (
              <form onSubmit={handleSubmitEnquiry} className="space-y-3.5 text-xs">
                {formError && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block font-semibold text-[#423631] uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    name="name"
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3 py-2 bg-white border border-[#EFE5D5] rounded-lg focus:outline-none focus:border-[#5A171C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#423631] uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    name="phone"
                    placeholder="e.g. +91 98200 12345"
                    className="w-full px-3 py-2 bg-white border border-[#EFE5D5] rounded-lg focus:outline-none focus:border-[#5A171C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#423631] uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                    placeholder="e.g. priya@example.com"
                    className="w-full px-3 py-2 bg-white border border-[#EFE5D5] rounded-lg focus:outline-none focus:border-[#5A171C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#423631] uppercase tracking-wider mb-1">
                    City / Delivery Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={handleInputChange}
                    name="location"
                    placeholder="e.g. Bengaluru / New Delhi"
                    className="w-full px-3 py-2 bg-white border border-[#EFE5D5] rounded-lg focus:outline-none focus:border-[#5A171C]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#423631] uppercase tracking-wider mb-1">
                    Occasion
                  </label>
                  <select
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white border border-[#EFE5D5] rounded-lg focus:outline-none focus:border-[#5A171C]"
                  >
                    {BRAND_CONFIG.occasions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#423631] uppercase tracking-wider mb-1">
                    Special Message
                  </label>
                  <textarea
                    rows={2}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Mention custom gift ribbons, message tags, or timing..."
                    className="w-full px-3 py-2 bg-white border border-[#EFE5D5] rounded-lg focus:outline-none focus:border-[#5A171C] resize-none"
                  />
                </div>

                {/* Items Mini Summary */}
                <div className="bg-[#F8F2E8] p-3 rounded-lg border border-[#EFE5D5] text-[11px] space-y-1">
                  <div className="flex justify-between font-bold text-[#5A171C]">
                    <span>Selections ({totalItems} items)</span>
                    <span>Estimated Total: {formatINR(subtotal)}</span>
                  </div>
                </div>
              </form>
            )}

            {/* 3. CONFIRMATION SCREEN (Section 21) */}
            {viewState === "success" && submittedEnquiry && (
              <div className="py-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-2xl font-bold text-[#2A211D]">
                    Thank You!
                  </h4>
                  <p className="text-xs text-[#7A6961]">
                    Your enquiry has been received.
                  </p>
                </div>

                <div className="p-4 bg-[#F8F2E8] rounded-xl border border-[#D9B66F] max-w-xs mx-auto space-y-0.5">
                  <span className="text-[10px] uppercase text-[#7A6961] tracking-wider block">
                    Enquiry ID
                  </span>
                  <div className="font-mono text-2xl font-bold text-[#5A171C]">
                    {submittedEnquiry.id}
                  </div>
                  <span className="text-xs font-semibold text-[#2A211D] block">
                    Estimated Total: {formatINR(submittedEnquiry.estimatedTotal)}
                  </span>
                </div>

                <div className="pt-2 space-y-2 max-w-xs mx-auto">
                  <a
                    href={generateWhatsAppLink({
                      enquiryId: submittedEnquiry.id,
                      customerName: submittedEnquiry.customer?.name,
                      customerPhone: submittedEnquiry.customer?.phone,
                      items: submittedEnquiry.items,
                      estimatedTotal: submittedEnquiry.estimatedTotal,
                      occasion: submittedEnquiry.occasion,
                      customMessage: submittedEnquiry.message
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-[#2E7D32] hover:bg-[#256c2a] text-white text-xs uppercase tracking-widest font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>CHAT ON WHATSAPP</span>
                  </a>

                  <button
                    onClick={handleResetAndClose}
                    className="w-full py-2.5 bg-white border border-[#EFE5D5] text-[#2A211D] text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-[#F8F2E8]"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Actions (Section 20) */}
          {items.length > 0 && viewState !== "success" && (
            <div className="p-5 bg-white border-t border-[#EFE5D5] space-y-3">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-[#7A6961]">
                  <span>Subtotal:</span>
                  <span>{formatINR(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-[#423631]">Estimated Total:</span>
                  <span className="font-serif text-2xl font-bold text-[#5A171C]">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <p className="text-[10px] text-[#7A6961] pt-0.5">
                  Final pricing and availability will be confirmed by MS Sweets.
                </p>
              </div>

              {viewState === "cart" ? (
                <button
                  onClick={() => setViewState("form")}
                  className="w-full py-3 bg-[#5A171C] hover:bg-[#741F24] text-white text-xs uppercase tracking-[0.18em] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>PROCEED TO ENQUIRY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setViewState("cart")}
                    className="py-2.5 border border-[#EFE5D5] rounded-lg text-xs font-semibold text-[#423631]"
                  >
                    Back to Selection
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmitEnquiry}
                    disabled={isSubmitting}
                    className="py-2.5 bg-[#5A171C] hover:bg-[#741F24] text-white text-xs uppercase tracking-widest font-bold rounded-lg disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "SEND ENQUIRY"}
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

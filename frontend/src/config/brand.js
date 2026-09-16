/**
 * Central Brand Configuration for MS SWEETS
 */

export const BRAND_CONFIG = {
  businessName: "MS SWEETS",
  tagline: "SWEET MOMENTS, ALWAYS",
  subTagline: "Tradition Meets Taste — Freshly Prepared Indian Sweets, Savoury Snacks & Celebration Boxes",
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "REPLACE_WITH_SHOP_WHATSAPP",
  phone: import.meta.env.VITE_PHONE_NUMBER || "REPLACE_WITH_SHOP_PHONE",
  email: import.meta.env.VITE_EMAIL || "hello@mssweets.com",
  address: "Flagship Sweet Shoppe, Heritage Arcade, MG Road",
  currencySymbol: "₹",
  limitedStockMax: 10,
  workingHours: "All Days: 8:30 AM – 10:30 PM",
  estYear: "1972",
  apiUrl: import.meta.env.VITE_API_URL || "/api",
  storageKey: "enquiry_cart_v1",

  // Core Trust Pillars (Section 8 & 9)
  pillars: [
    {
      title: "100% Vegetarian",
      subtitle: "Pure & Fresh",
      desc: "Prepared in an immaculate, purely vegetarian sweet kitchen."
    },
    {
      title: "Premium Ingredients",
      subtitle: "No Compromise",
      desc: "Pure cow ghee, Goan cashews, Mamra almonds, and Kashmir saffron."
    },
    {
      title: "Hygienically Prepared",
      subtitle: "Made with Care",
      desc: "Crafted daily at sunrise with strict quality standards."
    },
    {
      title: "Perfect for Gifting",
      subtitle: "For Every Celebration",
      desc: "Keepsake boxes with ribbons and personalized touches."
    }
  ],

  // Occasions (Section 16 & 21)
  occasions: [
    "General",
    "Birthday",
    "Wedding",
    "Festival",
    "Corporate Gifting",
    "Other"
  ]
};

export default BRAND_CONFIG;

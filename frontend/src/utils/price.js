import { BRAND_CONFIG } from "../config/brand.js";

/**
 * Format number into Indian Rupee format (e.g. ₹1,250)
 */
export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return `${BRAND_CONFIG.currencySymbol}0`;
  }
  const formatted = Number(amount).toLocaleString("en-IN", {
    maximumFractionDigits: 0
  });
  return `${BRAND_CONFIG.currencySymbol}${formatted}`;
}

/**
 * Dynamically calculate price based on weight selected
 * 250g -> 25% of 1kg price
 * 500g -> 50% of 1kg price
 * 1kg -> 100%
 * Fixed boxes (e.g. "Box (500g)") -> fixed product retail price
 */
export function calculateWeightPrice(retailPrice, weight) {
  const price = Number(retailPrice) || 0;
  if (!weight) return price;

  const w = String(weight).trim().toLowerCase();
  if (w === "250g") {
    return Math.round(price * 0.25);
  }
  if (w === "500g") {
    return Math.round(price * 0.5);
  }
  if (w === "1kg") {
    return price;
  }
  
  // For fixed boxes like "Box (500g)", "Box (1kg)", "Hamper (2kg)"
  return price;
}

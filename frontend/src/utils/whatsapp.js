import { BRAND_CONFIG } from "../config/brand.js";
import { formatINR } from "./price.js";

/**
 * Generate formatted WhatsApp click-to-chat URL
 */
export function generateWhatsAppLink({
  enquiryId,
  customerName,
  customerPhone,
  items = [],
  estimatedTotal = 0,
  occasion,
  customMessage
} = {}) {
  const shopName = BRAND_CONFIG.businessName;
  const rawNumber = BRAND_CONFIG.whatsappNumber;
  
  // Clean phone number (strip spaces, dashes)
  const cleanNumber = rawNumber && rawNumber !== "REPLACE_WITH_SHOP_WHATSAPP"
    ? rawNumber.replace(/[^0-9]/g, "")
    : "";

  let lines = [
    `*Hello ${shopName}*,`,
    "",
    "I would like to enquire about the following handcrafted mithai selections:"
  ];

  if (items && items.length > 0) {
    items.forEach((item, idx) => {
      const weightStr = item.weight ? ` - ${item.weight}` : "";
      const itemTotal = (item.priceSnapshot || 0) * (item.quantity || 1);
      lines.push(`${idx + 1}. *${item.productName}*${weightStr} × ${item.quantity} (${formatINR(itemTotal)})`);
    });
    lines.push("");
    lines.push(`*Estimated Total:* ${formatINR(estimatedTotal)}`);
  }

  lines.push("");
  lines.push("*Customer Details:*");
  if (customerName) lines.push(`• Name: ${customerName}`);
  if (customerPhone) lines.push(`• Phone: ${customerPhone}`);
  if (occasion) lines.push(`• Occasion: ${occasion}`);
  if (enquiryId) lines.push(`• Enquiry Ref: ${enquiryId}`);
  if (customMessage) lines.push(`• Note: ${customMessage}`);

  lines.push("");
  lines.push("Please let me know the availability, lead time and confirmation details.");

  const fullText = encodeURIComponent(lines.join("\n"));
  
  if (cleanNumber) {
    return `https://wa.me/${cleanNumber}?text=${fullText}`;
  }
  // If placeholder number, allow opening WhatsApp with pre-filled message
  return `https://wa.me/?text=${fullText}`;
}

/**
 * Single product quick WhatsApp enquiry link
 */
export function generateProductWhatsAppLink(product, selectedWeight) {
  const shopName = BRAND_CONFIG.businessName;
  const cleanNumber = BRAND_CONFIG.whatsappNumber && BRAND_CONFIG.whatsappNumber !== "REPLACE_WITH_SHOP_WHATSAPP"
    ? BRAND_CONFIG.whatsappNumber.replace(/[^0-9]/g, "")
    : "";

  const weightStr = selectedWeight ? ` (${selectedWeight})` : "";
  const lines = [
    `*Hello ${shopName}*,`,
    "",
    `I am interested in *${product.name}*${weightStr}.`,
    `Retail Price: ${formatINR(product.retailPrice)} / kg`,
    "",
    "Could you please confirm today's fresh batch availability and delivery options?"
  ];

  const fullText = encodeURIComponent(lines.join("\n"));
  if (cleanNumber) {
    return `https://wa.me/${cleanNumber}?text=${fullText}`;
  }
  return `https://wa.me/?text=${fullText}`;
}

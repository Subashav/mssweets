import React, { createContext, useContext, useState, useEffect } from "react";
import { calculateWeightPrice } from "../utils/price.js";
import { BRAND_CONFIG } from "../config/brand.js";

const CartContext = createContext(null);
const STORAGE_KEY = BRAND_CONFIG.storageKey || "enquiry_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to persist enquiry cart:", e);
    }
  }, [items]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const addToCart = (product, weight = "1kg", quantity = 1) => {
    const qty = Math.max(1, Number(quantity) || 1);
    const priceSnapshot = calculateWeightPrice(product.retailPrice, weight);
    const itemKey = `${product.id}_${weight}`;

    setItems((prevItems) => {
      const existingIdx = prevItems.findIndex((item) => item.key === itemKey);
      if (existingIdx > -1) {
        const copy = [...prevItems];
        copy[existingIdx].quantity += qty;
        return copy;
      }
      return [
        ...prevItems,
        {
          key: itemKey,
          productId: product.id,
          productName: product.name,
          slug: product.slug,
          image: product.images?.[0] || product.image || "",
          categorySlug: product.categorySlug,
          weight,
          quantity: qty,
          unitRetailPrice: product.retailPrice,
          priceSnapshot
        }
      ];
    });

    showToast(`${product.name} added to your enquiry.`);
  };

  const updateQuantity = (key, quantity) => {
    const qty = Number(quantity);
    if (qty <= 0) {
      removeFromCart(key);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (key) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const clearCart = () => {
    setItems([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  const totalItems = items.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0);
  const subtotal = items.reduce(
    (sum, i) => sum + (Number(i.priceSnapshot) || 0) * (Number(i.quantity) || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        isDrawerOpen,
        openDrawer,
        closeDrawer,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toastMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

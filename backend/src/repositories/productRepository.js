import { getDb } from "./db.js";
import { v4 as uuidv4 } from "uuid";
import { config } from "../config/index.js";

function getStockStatus(quantity) {
  if (quantity <= 0) return "Out of Stock";
  if (quantity <= config.limitedStockMax) return "Limited Stock";
  return "In Stock";
}

export const productRepository = {
  async findAll({ category, search, status, availability, sort, minPrice, maxPrice, isAdmin = false } = {}) {
    const db = await getDb();
    await db.read();
    let products = [...db.data.products];

    if (!isAdmin) {
      products = products.filter(p => p.status === "active");
    } else if (status) {
      products = products.filter(p => p.status === status);
    }

    if (category) {
      products = products.filter(p => p.categoryId === category || p.categorySlug === category);
    }

    if (search) {
      const q = search.toLowerCase().trim();
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.ingredients && p.ingredients.toLowerCase().includes(q))
      );
    }

    if (availability) {
      products = products.filter(p => {
        const stockState = getStockStatus(p.stockQuantity);
        return stockState.toLowerCase().replace(/\s+/g, "_") === availability.toLowerCase().replace(/\s+/g, "_") ||
               stockState.toLowerCase() === availability.toLowerCase();
      });
    }

    if (minPrice !== undefined && !isNaN(minPrice)) {
      products = products.filter(p => p.retailPrice >= Number(minPrice));
    }
    if (maxPrice !== undefined && !isNaN(maxPrice)) {
      products = products.filter(p => p.retailPrice <= Number(maxPrice));
    }

    // Attach computed availability
    products = products.map(p => ({
      ...p,
      availability: getStockStatus(p.stockQuantity)
    }));

    if (sort) {
      switch (sort) {
        case "price_asc":
        case "price_low_high":
          products.sort((a, b) => a.retailPrice - b.retailPrice);
          break;
        case "price_desc":
        case "price_high_low":
          products.sort((a, b) => b.retailPrice - a.retailPrice);
          break;
        case "name_asc":
        case "name_az":
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "recommended":
        default:
          // Keep signature/featured products first or by order
          break;
      }
    }

    return products;
  },

  async findById(id) {
    const db = await getDb();
    await db.read();
    const product = db.data.products.find(p => p.id === id || p.slug === id);
    if (!product) return null;
    return {
      ...product,
      availability: getStockStatus(product.stockQuantity)
    };
  },

  async findBySlug(slug) {
    const db = await getDb();
    await db.read();
    const product = db.data.products.find(p => p.slug === slug);
    if (!product) return null;
    return {
      ...product,
      availability: getStockStatus(product.stockQuantity)
    };
  },

  async create(data) {
    const db = await getDb();
    await db.read();
    const now = new Date().toISOString();
    const newProduct = {
      id: "prod_" + uuidv4().slice(0, 8),
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      categoryId: data.categoryId,
      categorySlug: data.categorySlug || "",
      description: data.description || "",
      images: Array.isArray(data.images) && data.images.length > 0 ? data.images : [data.image || "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg"],
      retailPrice: Number(data.retailPrice) || 0,
      wholesalePrice: Number(data.wholesalePrice) || Math.round(Number(data.retailPrice) * 0.85) || 0,
      stockQuantity: Number(data.stockQuantity) || 0,
      weightOptions: Array.isArray(data.weightOptions) && data.weightOptions.length > 0 ? data.weightOptions : ["250g", "500g", "1kg"],
      ingredients: data.ingredients || "Premium traditional ingredients, Pure Ghee, Sugar",
      storageInformation: data.storageInformation || "Store in a cool, dry place. Refrigerate after opening.",
      bestBefore: data.bestBefore || "15 days from packaging",
      status: data.status || "active",
      isDemoData: data.isDemoData !== undefined ? data.isDemoData : true,
      featured: data.featured || false,
      createdAt: now,
      updatedAt: now
    };

    db.data.products.push(newProduct);
    await db.write();
    return {
      ...newProduct,
      availability: getStockStatus(newProduct.stockQuantity)
    };
  },

  async update(id, data) {
    const db = await getDb();
    await db.read();
    const index = db.data.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const existing = db.data.products[index];
    const updated = {
      ...existing,
      ...data,
      retailPrice: data.retailPrice !== undefined ? Number(data.retailPrice) : existing.retailPrice,
      wholesalePrice: data.wholesalePrice !== undefined ? Number(data.wholesalePrice) : existing.wholesalePrice,
      stockQuantity: data.stockQuantity !== undefined ? Number(data.stockQuantity) : existing.stockQuantity,
      updatedAt: new Date().toISOString()
    };

    db.data.products[index] = updated;
    await db.write();
    return {
      ...updated,
      availability: getStockStatus(updated.stockQuantity)
    };
  },

  async updateStock(id, stockQuantity) {
    const db = await getDb();
    await db.read();
    const index = db.data.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    db.data.products[index].stockQuantity = Number(stockQuantity);
    db.data.products[index].updatedAt = new Date().toISOString();
    await db.write();

    return {
      ...db.data.products[index],
      availability: getStockStatus(db.data.products[index].stockQuantity)
    };
  },

  async delete(id) {
    const db = await getDb();
    await db.read();
    const index = db.data.products.findIndex(p => p.id === id);
    if (index === -1) return false;

    db.data.products.splice(index, 1);
    await db.write();
    return true;
  },

  async countByCategoryId(categoryId) {
    const db = await getDb();
    await db.read();
    return db.data.products.filter(p => p.categoryId === categoryId && p.status === "active").length;
  }
};

import { getDb } from "./db.js";
import { v4 as uuidv4 } from "uuid";

export const categoryRepository = {
  async findAll(onlyActive = false) {
    const db = await getDb();
    await db.read();
    let categories = [...db.data.categories];
    if (onlyActive) {
      categories = categories.filter(c => c.status === "active");
    }

    // Attach real-time active product count to each category
    return categories.map(cat => ({
      ...cat,
      productCount: db.data.products.filter(p => p.categoryId === cat.id && p.status === "active").length
    }));
  },

  async findById(id) {
    const db = await getDb();
    await db.read();
    const cat = db.data.categories.find(c => c.id === id || c.slug === id);
    if (!cat) return null;
    return {
      ...cat,
      productCount: db.data.products.filter(p => p.categoryId === cat.id && p.status === "active").length
    };
  },

  async findBySlug(slug) {
    const db = await getDb();
    await db.read();
    const cat = db.data.categories.find(c => c.slug === slug);
    if (!cat) return null;
    return {
      ...cat,
      productCount: db.data.products.filter(p => p.categoryId === cat.id && p.status === "active").length
    };
  },

  async create(data) {
    const db = await getDb();
    await db.read();
    const now = new Date().toISOString();
    const newCategory = {
      id: "cat_" + (data.slug || uuidv4().slice(0, 6)),
      name: data.name,
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      description: data.description || "",
      image: data.image || "https://upload.wikimedia.org/wikipedia/commons/1/1d/Assorted_Indian_Sweets.jpg",
      status: data.status || "active",
      createdAt: now,
      updatedAt: now
    };

    db.data.categories.push(newCategory);
    await db.write();
    return { ...newCategory, productCount: 0 };
  },

  async update(id, data) {
    const db = await getDb();
    await db.read();
    const index = db.data.categories.findIndex(c => c.id === id);
    if (index === -1) return null;

    const existing = db.data.categories[index];
    const updated = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString()
    };

    db.data.categories[index] = updated;
    await db.write();
    return {
      ...updated,
      productCount: db.data.products.filter(p => p.categoryId === id && p.status === "active").length
    };
  },

  async delete(id) {
    const db = await getDb();
    await db.read();
    
    // Check if active products exist in category
    const activeProducts = db.data.products.filter(p => p.categoryId === id && p.status === "active");
    if (activeProducts.length > 0) {
      throw new Error(`Cannot delete category with ${activeProducts.length} active products. Reassign or deactivate products first.`);
    }

    const index = db.data.categories.findIndex(c => c.id === id);
    if (index === -1) return false;

    db.data.categories.splice(index, 1);
    await db.write();
    return true;
  }
};

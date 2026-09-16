import { getDb } from "./db.js";
import { v4 as uuidv4 } from "uuid";

export const customerRepository = {
  async findAll() {
    const db = await getDb();
    await db.read();
    return db.data.customers.map(c => {
      const enquiries = db.data.enquiries.filter(e => e.customerId === c.id);
      return {
        ...c,
        enquiriesCount: enquiries.length,
        lastEnquiryDate: enquiries.length > 0 ? enquiries[enquiries.length - 1].createdAt : null
      };
    });
  },

  async findById(id) {
    const db = await getDb();
    await db.read();
    const customer = db.data.customers.find(c => c.id === id);
    if (!customer) return null;

    const enquiries = db.data.enquiries.filter(e => e.customerId === id);
    return {
      ...customer,
      enquiriesCount: enquiries.length,
      enquiries: enquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    };
  },

  async findOrCreate(data) {
    const db = await getDb();
    await db.read();

    const normalizedPhone = data.phone ? data.phone.trim().replace(/\s+/g, "") : "";
    const normalizedEmail = data.email ? data.email.trim().toLowerCase() : "";

    let existing = null;
    if (normalizedPhone) {
      existing = db.data.customers.find(c => c.phone && c.phone.replace(/\s+/g, "") === normalizedPhone);
    }
    if (!existing && normalizedEmail) {
      existing = db.data.customers.find(c => c.email && c.email.toLowerCase() === normalizedEmail);
    }

    if (existing) {
      // Update location or name if provided
      if (data.name && data.name.trim() && existing.name !== data.name) {
        existing.name = data.name;
      }
      if (data.location && data.location.trim()) {
        existing.location = data.location;
      }
      if (data.email && !existing.email) {
        existing.email = data.email;
      }
      existing.updatedAt = new Date().toISOString();
      await db.write();
      return existing;
    }

    const now = new Date().toISOString();
    const newCustomer = {
      id: "cust_" + uuidv4().slice(0, 8),
      name: data.name || "Valued Patron",
      phone: data.phone || "",
      email: data.email || "",
      location: data.location || "Online Store",
      createdAt: now,
      updatedAt: now
    };

    db.data.customers.push(newCustomer);
    await db.write();
    return newCustomer;
  }
};

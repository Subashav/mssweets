import { getDb } from "./db.js";
import { customerRepository } from "./customerRepository.js";

function getNextEnquiryId(enquiries) {
  let highestNum = 1000;
  for (const e of enquiries) {
    if (e.id && e.id.startsWith("ENQ-")) {
      const num = parseInt(e.id.replace("ENQ-", ""), 10);
      if (!isNaN(num) && num > highestNum) {
        highestNum = num;
      }
    }
  }
  return `ENQ-${highestNum + 1}`;
}

export const enquiryRepository = {
  async findAll({ status, search, limit } = {}) {
    const db = await getDb();
    await db.read();
    let enquiries = [...db.data.enquiries];

    if (status) {
      enquiries = enquiries.filter(e => e.status.toLowerCase() === status.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase().trim();
      enquiries = enquiries.filter(e => 
        e.id.toLowerCase().includes(q) ||
        (e.customer && e.customer.name && e.customer.name.toLowerCase().includes(q)) ||
        (e.customer && e.customer.phone && e.customer.phone.includes(q)) ||
        (e.occasion && e.occasion.toLowerCase().includes(q))
      );
    }

    // Sort descending by creation date
    enquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (limit && !isNaN(limit)) {
      enquiries = enquiries.slice(0, Number(limit));
    }

    return enquiries;
  },

  async findById(id) {
    const db = await getDb();
    await db.read();
    const enquiry = db.data.enquiries.find(e => e.id === id);
    return enquiry || null;
  },

  async create(data) {
    const db = await getDb();
    await db.read();

    // Find or create customer
    const customer = await customerRepository.findOrCreate({
      name: data.customerName,
      phone: data.customerPhone,
      email: data.customerEmail,
      location: data.customerLocation
    });

    const nextId = getNextEnquiryId(db.data.enquiries);
    const now = new Date().toISOString();

    // Calculate total if not accurately given
    let estimatedTotal = 0;
    const processedItems = (data.items || []).map(item => {
      const unitPrice = Number(item.priceSnapshot) || 0;
      const qty = Number(item.quantity) || 1;
      const itemTotal = unitPrice * qty;
      estimatedTotal += itemTotal;
      return {
        productId: item.productId,
        productName: item.productName,
        weight: item.weight || "1kg",
        quantity: qty,
        priceSnapshot: unitPrice,
        totalEstimatedPrice: itemTotal,
        image: item.image || ""
      };
    });

    const newEnquiry = {
      id: nextId,
      customerId: customer.id,
      customer: {
        id: customer.id,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        location: customer.location
      },
      items: processedItems,
      estimatedTotal: data.estimatedTotal !== undefined ? Number(data.estimatedTotal) : estimatedTotal,
      occasion: data.occasion || "General Enquiry",
      message: data.message || "",
      status: "Pending", // Pending, Contacted, Processing, Completed, Cancelled
      createdAt: now,
      updatedAt: now
    };

    db.data.enquiries.push(newEnquiry);
    await db.write();

    return newEnquiry;
  },

  async updateStatus(id, status) {
    const db = await getDb();
    await db.read();
    const enquiry = db.data.enquiries.find(e => e.id === id);
    if (!enquiry) return null;

    enquiry.status = status;
    enquiry.updatedAt = new Date().toISOString();
    await db.write();
    return enquiry;
  }
};

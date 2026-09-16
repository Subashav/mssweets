import { getDb } from "../repositories/db.js";
import { config } from "../config/index.js";

export const statsController = {
  async getDashboardStats(req, res) {
    try {
      const db = await getDb();
      await db.read();

      const products = db.data.products || [];
      const categories = db.data.categories || [];
      const customers = db.data.customers || [];
      const enquiries = db.data.enquiries || [];

      const totalProducts = products.length;
      const activeProducts = products.filter(p => p.status === "active").length;
      const totalCategories = categories.length;
      const totalCustomers = customers.length;
      const totalEnquiries = enquiries.length;
      const pendingEnquiries = enquiries.filter(e => e.status === "Pending").length;
      
      const limitedStockProducts = products.filter(p => 
        p.stockQuantity > 0 && p.stockQuantity <= config.limitedStockMax
      ).length;

      const outOfStockProducts = products.filter(p => p.stockQuantity <= 0).length;

      // Recent enquiries (top 5 sorted by date)
      const recentEnquiries = [...enquiries]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5)
        .map(e => ({
          id: e.id,
          customerName: e.customer?.name || "Guest Patron",
          itemsCount: (e.items || []).reduce((acc, item) => acc + (item.quantity || 1), 0),
          estimatedTotal: e.estimatedTotal || 0,
          status: e.status,
          occasion: e.occasion || "General",
          createdAt: e.createdAt
        }));

      return res.json({
        success: true,
        data: {
          totalProducts,
          activeProducts,
          totalCategories,
          totalCustomers,
          totalEnquiries,
          pendingEnquiries,
          limitedStockProducts,
          outOfStockProducts,
          recentEnquiries
        }
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async exportEnquiriesCsv(req, res) {
    try {
      const db = await getDb();
      await db.read();
      const enquiries = [...(db.data.enquiries || [])].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const headers = [
        "Enquiry ID",
        "Date",
        "Customer Name",
        "Phone",
        "Email",
        "Location",
        "Occasion",
        "Products",
        "Total Items",
        "Estimated Total (INR)",
        "Status"
      ];

      const rows = enquiries.map(e => {
        const productList = (e.items || [])
          .map(item => `${item.productName} (${item.weight || "1kg"} x ${item.quantity})`)
          .join(" | ");
        const totalQty = (e.items || []).reduce((sum, i) => sum + (i.quantity || 1), 0);
        const dateStr = e.createdAt ? new Date(e.createdAt).toLocaleDateString("en-IN") : "";

        return [
          e.id,
          dateStr,
          `"${(e.customer?.name || "").replace(/"/g, '""')}"`,
          `"${(e.customer?.phone || "").replace(/"/g, '""')}"`,
          `"${(e.customer?.email || "").replace(/"/g, '""')}"`,
          `"${(e.customer?.location || "").replace(/"/g, '""')}"`,
          `"${(e.occasion || "").replace(/"/g, '""')}"`,
          `"${productList.replace(/"/g, '""')}"`,
          totalQty,
          e.estimatedTotal || 0,
          e.status
        ].join(",");
      });

      const csvContent = [headers.join(","), ...rows].join("\r\n");

      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename=mithaira-enquiries-${new Date().toISOString().slice(0, 10)}.csv`);
      return res.status(200).send(csvContent);
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

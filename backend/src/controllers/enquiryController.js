import { enquiryRepository } from "../repositories/enquiryRepository.js";

export const enquiryController = {
  async createEnquiry(req, res) {
    try {
      const { customerName, customerPhone, items } = req.body;

      if (!customerName || !customerName.trim()) {
        return res.status(400).json({
          success: false,
          message: "Customer name is required"
        });
      }

      if (!customerPhone || !customerPhone.trim()) {
        return res.status(400).json({
          success: false,
          message: "Customer phone number is required"
        });
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one sweet item must be in your enquiry"
        });
      }

      const enquiry = await enquiryRepository.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Your sweet enquiry has been received beautifully.",
        data: enquiry
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async getEnquiries(req, res) {
    try {
      const { status, search, limit } = req.query;
      const enquiries = await enquiryRepository.findAll({ status, search, limit });
      return res.json({
        success: true,
        count: enquiries.length,
        data: enquiries
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async getEnquiryById(req, res) {
    try {
      const enquiry = await enquiryRepository.findById(req.params.id);
      if (!enquiry) {
        return res.status(404).json({ success: false, message: "Enquiry not found" });
      }
      return res.json({ success: true, data: enquiry });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const validStatuses = ["Pending", "Contacted", "Processing", "Completed", "Cancelled"];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Status must be one of: ${validStatuses.join(", ")}`
        });
      }

      const updated = await enquiryRepository.updateStatus(req.params.id, status);
      if (!updated) {
        return res.status(404).json({ success: false, message: "Enquiry not found" });
      }

      return res.json({
        success: true,
        message: "Enquiry status updated successfully",
        data: updated
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

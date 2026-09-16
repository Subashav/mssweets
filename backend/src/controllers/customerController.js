import { customerRepository } from "../repositories/customerRepository.js";

export const customerController = {
  async getCustomers(req, res) {
    try {
      const customers = await customerRepository.findAll();
      return res.json({ success: true, count: customers.length, data: customers });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async getCustomerById(req, res) {
    try {
      const customer = await customerRepository.findById(req.params.id);
      if (!customer) {
        return res.status(404).json({ success: false, message: "Customer not found" });
      }
      return res.json({ success: true, data: customer });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

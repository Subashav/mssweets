import { categoryRepository } from "../repositories/categoryRepository.js";

export const categoryController = {
  async getCategories(req, res) {
    try {
      const onlyActive = req.query.active === "true" || req.query.public === "true";
      const categories = await categoryRepository.findAll(onlyActive);
      return res.json({ success: true, count: categories.length, data: categories });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async getCategoryById(req, res) {
    try {
      const category = await categoryRepository.findById(req.params.id);
      if (!category) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }
      return res.json({ success: true, data: category });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async createCategory(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ success: false, message: "Category name is required" });
      }
      const category = await categoryRepository.create(req.body);
      return res.status(201).json({ success: true, data: category });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateCategory(req, res) {
    try {
      const updated = await categoryRepository.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: "Category not found" });
      }
      return res.json({ success: true, data: updated });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async deleteCategory(req, res) {
    try {
      await categoryRepository.delete(req.params.id);
      return res.json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }
};

import { productRepository } from "../repositories/productRepository.js";
import { categoryRepository } from "../repositories/categoryRepository.js";

export const productController = {
  async getPublicProducts(req, res) {
    try {
      const { category, search, availability, sort, minPrice, maxPrice } = req.query;
      const products = await productRepository.findAll({
        category,
        search,
        availability,
        sort,
        minPrice,
        maxPrice,
        isAdmin: false
      });
      return res.json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async getPublicProductById(req, res) {
    try {
      const product = await productRepository.findById(req.params.id);
      if (!product || product.status !== "active") {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      return res.json({ success: true, data: product });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async getAdminProducts(req, res) {
    try {
      const { category, search, status, sort } = req.query;
      const products = await productRepository.findAll({
        category,
        search,
        status,
        sort,
        isAdmin: true
      });
      return res.json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async createProduct(req, res) {
    try {
      const { name, categoryId, retailPrice } = req.body;
      if (!name || !categoryId || retailPrice === undefined) {
        return res.status(400).json({
          success: false,
          message: "Name, category, and retail price are required"
        });
      }

      // Verify category exists
      const cat = await categoryRepository.findById(categoryId);
      if (!cat) {
        return res.status(400).json({
          success: false,
          message: "Invalid category ID specified"
        });
      }

      const product = await productRepository.create({
        ...req.body,
        categorySlug: cat.slug
      });
      return res.status(201).json({ success: true, data: product });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateProduct(req, res) {
    try {
      const updated = await productRepository.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      return res.json({ success: true, data: updated });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateStock(req, res) {
    try {
      const { stockQuantity } = req.body;
      if (stockQuantity === undefined || isNaN(Number(stockQuantity)) || Number(stockQuantity) < 0) {
        return res.status(400).json({
          success: false,
          message: "Valid non-negative stock quantity is required"
        });
      }

      const updated = await productRepository.updateStock(req.params.id, Number(stockQuantity));
      if (!updated) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }

      return res.json({
        success: true,
        message: "Stock updated successfully",
        data: updated
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      const deleted = await productRepository.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      return res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

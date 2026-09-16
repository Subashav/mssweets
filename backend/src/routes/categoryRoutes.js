import { Router } from "express";
import { categoryController } from "../controllers/categoryController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

// Public routes
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);

// Protected admin routes
router.post("/", authenticateAdmin, categoryController.createCategory);
router.put("/:id", authenticateAdmin, categoryController.updateCategory);
router.delete("/:id", authenticateAdmin, categoryController.deleteCategory);

export default router;

import { Router } from "express";
import { productController } from "../controllers/productController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

// Admin specific endpoints (placed before parameterized :id)
router.get("/admin/all", authenticateAdmin, productController.getAdminProducts);
router.post("/", authenticateAdmin, productController.createProduct);
router.put("/:id", authenticateAdmin, productController.updateProduct);
router.patch("/:id/stock", authenticateAdmin, productController.updateStock);
router.delete("/:id", authenticateAdmin, productController.deleteProduct);

// Public catalogue endpoints
router.get("/", productController.getPublicProducts);
router.get("/:id", productController.getPublicProductById);

export default router;

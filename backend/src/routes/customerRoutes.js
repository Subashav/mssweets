import { Router } from "express";
import { customerController } from "../controllers/customerController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

// Protected admin customer directory
router.get("/", authenticateAdmin, customerController.getCustomers);
router.get("/:id", authenticateAdmin, customerController.getCustomerById);

export default router;

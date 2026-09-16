import { Router } from "express";
import { statsController } from "../controllers/statsController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/dashboard", authenticateAdmin, statsController.getDashboardStats);
router.get("/enquiries/export.csv", authenticateAdmin, statsController.exportEnquiriesCsv);

export default router;

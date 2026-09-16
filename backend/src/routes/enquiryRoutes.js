import { Router } from "express";
import { enquiryController } from "../controllers/enquiryController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

// Public customer submission
router.post("/", enquiryController.createEnquiry);

// Protected admin enquiry management
router.get("/", authenticateAdmin, enquiryController.getEnquiries);
router.get("/:id", authenticateAdmin, enquiryController.getEnquiryById);
router.patch("/:id/status", authenticateAdmin, enquiryController.updateStatus);

export default router;

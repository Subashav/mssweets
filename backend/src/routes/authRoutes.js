import { Router } from "express";
import { authController } from "../controllers/authController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/login", authController.login);
router.get("/me", authenticateAdmin, authController.me);

export default router;

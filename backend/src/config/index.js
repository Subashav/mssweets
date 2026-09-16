import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "mssweets_jwt_secret_dev_key_super_secure",
  jwtExpiresIn: "24h",
  adminCredentials: {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "admin123"
  },
  limitedStockMax: parseInt(process.env.LIMITED_STOCK_MAX, 10) || 10,
  whatsappNumber: process.env.WHATSAPP_NUMBER || "REPLACE_WITH_SHOP_WHATSAPP",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  brand: {
    name: "MS SWEETS",
    tagline: "SWEET MOMENTS, ALWAYS",
    supportEmail: "hello@mssweets.com",
    supportPhone: "REPLACE_WITH_SHOP_PHONE"
  }
};

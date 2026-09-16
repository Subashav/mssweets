import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

export const authController = {
  async login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required"
      });
    }

    if (
      username.trim() === config.adminCredentials.username &&
      password === config.adminCredentials.password
    ) {
      const token = jwt.sign(
        { username, role: "admin" },
        config.jwtSecret,
        { expiresIn: config.jwtExpiresIn }
      );

      return res.json({
        success: true,
        message: "Authentication successful",
        token,
        user: {
          username,
          role: "admin",
          name: "Boutique Administrator"
        }
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid administrator credentials"
    });
  },

  async me(req, res) {
    return res.json({
      success: true,
      user: req.user
    });
  }
};

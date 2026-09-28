import express from "express";
import {
	getProfile,
	loginUser,
	refreshAccessToken,
	registerUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { authRateLimit } from "../middleware/authRateLimit.js";

const router = express.Router();

router.post("/register", authRateLimit, registerUser);
router.post("/login", authRateLimit, loginUser);
router.post("/refresh", refreshAccessToken);
router.get("/profile", authMiddleware, getProfile);

export default router;
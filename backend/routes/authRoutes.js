import express from "express";
import {
	getProfile,
	loginUser,
	refreshAccessToken,
	registerUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.get("/profile", authMiddleware, getProfile);

export default router;
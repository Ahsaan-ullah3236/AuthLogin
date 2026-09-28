import express from "express";
import {
	createActivity,
	deleteActivity,
	getActivities,
	updateActivity,
} from "../controllers/activityController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getActivities);
router.post("/", authMiddleware, createActivity);
router.put("/:id", authMiddleware, updateActivity);
router.delete("/:id", authMiddleware, deleteActivity);

export default router;

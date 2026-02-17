import express from "express";
import { getDashboardData } from "../controllers/dashboard.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/stats", verifyToken, getDashboardData);

export default router;
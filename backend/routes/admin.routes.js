

import express from "express";
import { getAllUsers, getAdminSales } from "../controllers/admin/admin.controller.js";

const router = express.Router();

router.post("/getAllUsers", getAllUsers);
router.post("/getAllSales", getAdminSales);

export default router;
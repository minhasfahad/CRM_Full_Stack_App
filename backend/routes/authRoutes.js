import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

// Public registration endpoint (can be used for initial bootstrap)
router.post("/register", register);
router.post("/login", login);

export default router;

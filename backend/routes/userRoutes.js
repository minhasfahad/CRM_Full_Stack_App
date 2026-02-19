import express from "express";
import { createUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "../controllers/userControllers.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const userrouter = express.Router();

// Only Admin can create or delete users
userrouter.post("/", protect, authorizeRoles("Admin"), createUser);

// Admin and Manager can view users
userrouter.get("/", protect, authorizeRoles("Admin","Manager"), getAllUsers);

// Single user - accessible to Admin, Manager, and the user themself (checked in controller)
userrouter.get("/:id", protect, authorizeRoles("Admin","Manager","Team Member"), getSingleUser);

// Only Admin can update user role/profile
userrouter.put("/:id", protect, authorizeRoles("Admin"), updateUser);

// Only Admin can delete
userrouter.delete("/:id", protect, authorizeRoles("Admin"), deleteUser);

export default userrouter;
import { createCustomer, deleteCustomer, getAllCustomers, getAssignedToCustomers, getSingleCustomer, updateCustomer } from "../controllers/customerControllers.js";
import express from "express"
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const customerrouter = express.Router();

// Team Members can fetch assigned customers
customerrouter.get("/search", protect, authorizeRoles("Admin","Manager","Team Member"), getAssignedToCustomers);

// Only Admin and Manager can create customers
customerrouter.post("/", protect, authorizeRoles("Admin","Manager"), createCustomer)

// Admin and Manager can get all
customerrouter.get("/", protect, authorizeRoles("Admin","Manager"), getAllCustomers)

// Single - all authenticated roles can access, but controllers can restrict further
customerrouter.get("/:id", protect, authorizeRoles("Admin","Manager","Team Member"), getSingleCustomer)

// Update - Admin and Manager
customerrouter.put("/:id", protect, authorizeRoles("Admin","Manager"), updateCustomer)

// Delete - Admin only
customerrouter.delete("/:id", protect, authorizeRoles("Admin"), deleteCustomer)

export default customerrouter;


//  {
//     "name": "Waqas Ahmed Minhas",
//     "email": "waqasahmed@gmail.com",
//     "phone": "0321-4154076",
//     "company": "Punjab Police",
//     "status": "New",
//     "assignedTo": [ "DSP" ]
//  }
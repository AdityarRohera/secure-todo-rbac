import express from "express";
import { getAllUsers, getAllTodos, updateUserRole } from "../controllers/admin.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/role.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { updateRoleValidation } from "../validations/admin.validation.js";

const router = express.Router();

// All admin routes need a logged in admin
router.use(authenticate, authorizeRole("admin"));

// Get all users
router.get("/users", getAllUsers);

// Get all todos
router.get("/todos", getAllTodos);

// Change user role
router.patch("/users/:id/role", updateRoleValidation, validate, updateUserRole);

export default router;

import express from "express";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todo.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createTodoValidation,
  updateTodoValidation,
  todoIdValidation,
} from "../validations/todo.validation.js";

const router = express.Router();

// All todo routes need a logged in user
router.use(authenticate);

// Get todos (user: own todos, admin: all todos)
router.get("/", getTodos);

// Create todo
router.post("/", createTodoValidation, validate, createTodo);

// Update todo (user: own todo, admin: any todo)
router.put("/:id", updateTodoValidation, validate, updateTodo);

// Delete todo (user: own todo, admin: any todo)
router.delete("/:id", todoIdValidation, validate, deleteTodo);

export default router;

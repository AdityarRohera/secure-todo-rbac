import { body, param } from "express-validator";

const categories = ["Urgent", "Non-Urgent"];

export const createTodoValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Title can be max 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description can be max 500 characters"),

  body("dueDate")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("Due date must be a valid date"),

  body("category")
    .isIn(categories)
    .withMessage("Category must be Urgent or Non-Urgent"),
];

export const updateTodoValidation = [
  param("id").isMongoId().withMessage("Invalid todo id"),

  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .bail()
    .isLength({ max: 100 })
    .withMessage("Title can be max 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description can be max 500 characters"),

  body("dueDate")
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage("Due date must be a valid date"),

  body("category")
    .optional()
    .isIn(categories)
    .withMessage("Category must be Urgent or Non-Urgent"),

  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be true or false"),
];

export const todoIdValidation = [
  param("id").isMongoId().withMessage("Invalid todo id"),
];

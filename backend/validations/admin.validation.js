import { body, param } from "express-validator";

export const updateRoleValidation = [
  param("id").isMongoId().withMessage("Invalid user id"),

  body("role")
    .isIn(["user", "admin"])
    .withMessage("Role must be user or admin"),
];

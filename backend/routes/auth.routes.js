

import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../validations/auth.validation.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = express.Router();

// Register
router.post("/register", registerValidation, validate, register);

// Login
router.post("/login", loginValidation, validate, login);

export default router;
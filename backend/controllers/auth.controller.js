import { registerUser, loginUser } from "../services/auth.service.js";

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = await registerUser({ email, username, password });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    if (statusCode === 500) console.error(error);

    res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Internal server error" : error.message,
    });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    const { token, user } = await loginUser({ emailOrUsername, password });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    if (statusCode === 500) console.error(error);

    res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Internal server error" : error.message,
    });
  }
};

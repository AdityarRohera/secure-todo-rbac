import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async ({ email, username, password }) => {
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existingUser) {
    const error = new Error("Email or username already exists");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    username,
    password: hashedPassword,
    role: "user",
  });

  return {
    id: user._id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
};

export const loginUser = async ({ emailOrUsername, password }) => {
  const query = emailOrUsername.includes("@")
    ? { email: emailOrUsername.toLowerCase() }
    : { username: emailOrUsername };

  const user = await User.findOne(query);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
  };
};

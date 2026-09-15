import User from "../models/User.js";
import Todo from "../models/Todo.js";

export const getAllUsers = async () => {
  return User.find().select("-password").sort({ createdAt: -1 });
};

export const getAllTodos = async () => {
  return Todo.find({})
    .populate("user", "username email")
    .sort({ createdAt: -1 });
};

export const updateUserRole = async (userId, role, adminId) => {
  // Stops an admin from removing their own admin access
  if (userId === adminId) {
    const error = new Error("You cannot change your own role");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { returnDocument: "after" }
  ).select("-password");

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

import * as adminService from "../services/admin.service.js";

// GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsers();

    res.status(200).json({
      success: true,
      count: users.length,
      users,
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

// GET /api/admin/todos
export const getAllTodos = async (req, res) => {
  try {
    const todos = await adminService.getAllTodos();

    res.status(200).json({
      success: true,
      count: todos.length,
      todos,
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

// PATCH /api/admin/users/:id/role
export const updateUserRole = async (req, res) => {
  try {
    const user = await adminService.updateUserRole(
      req.params.id,
      req.body.role,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
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

import * as todoService from "../services/todo.service.js";

// GET /api/todos
export const getTodos = async (req, res) => {
  try {
    const todos = await todoService.getTodos(req.user);

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

// POST /api/todos
export const createTodo = async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;

    const todo = await todoService.createTodo(
      { title, description, dueDate, category },
      req.user.id
    );

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo,
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

// PUT /api/todos/:id
export const updateTodo = async (req, res) => {
  try {
    const { title, description, dueDate, category, completed } = req.body || {};

    const todo = await todoService.updateTodo(
      req.params.id,
      { title, description, dueDate, category, completed },
      req.user
    );

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo,
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

// DELETE /api/todos/:id
export const deleteTodo = async (req, res) => {
  try {
    await todoService.deleteTodo(req.params.id, req.user);

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
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

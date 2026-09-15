import Todo from "../models/Todo.js";

export const getTodos = async (user) => {
  // Admin gets every todo, user gets only their own
  const filter = user.role === "admin" ? {} : { user: user.id };

  return Todo.find(filter)
    .populate("user", "username email")
    .sort({ createdAt: -1 });
};

export const createTodo = async (data, userId) => {
  return Todo.create({ ...data, user: userId });
};

// Finds the todo and checks the logged in user is allowed to change it
const findTodoWithAccess = async (todoId, user) => {
  const todo = await Todo.findById(todoId);

  if (!todo) {
    const error = new Error("Todo not found");
    error.statusCode = 404;
    throw error;
  }

  if (user.role !== "admin" && todo.user.toString() !== user.id) {
    const error = new Error("You can only change your own todos");
    error.statusCode = 403;
    throw error;
  }

  return todo;
};

export const updateTodo = async (todoId, data, user) => {
  const todo = await findTodoWithAccess(todoId, user);

  // Update only the fields that were sent
  for (const key in data) {
    if (data[key] !== undefined) {
      todo[key] = data[key];
    }
  }

  await todo.save();
  return todo;
};

export const deleteTodo = async (todoId, user) => {
  const todo = await findTodoWithAccess(todoId, user);

  await todo.deleteOne();
};

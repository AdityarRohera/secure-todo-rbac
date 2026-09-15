import api from "./api.js";

// user: own todos, admin: all todos
export const getTodos = async () => {
  try {
    const res = await api.get("/todos");

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createTodo = async (todoData) => {
  try {
    const res = await api.post("/todos", todoData);

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateTodo = async (id, todoData) => {
  try {
    const res = await api.put(`/todos/${id}`, todoData);

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await api.delete(`/todos/${id}`);

    return res.data;
  } catch (err) {
    throw err;
  }
};

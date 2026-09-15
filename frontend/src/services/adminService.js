import api from "./api.js";

export const getAllUsers = async () => {
  try {
    const res = await api.get("/admin/users");

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getAllTodos = async () => {
  try {
    const res = await api.get("/admin/todos");

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateUserRole = async (id, role) => {
  try {
    const res = await api.patch(`/admin/users/${id}/role`, { role });

    return res.data;
  } catch (err) {
    throw err;
  }
};

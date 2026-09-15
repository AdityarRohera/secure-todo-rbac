import api from "./api.js";

export const registerUser = async (userData) => {
  try {
    const res = await api.post("/auth/register", userData);

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const loginUser = async (emailOrUsername, password) => {
  try {
    const res = await api.post("/auth/login", { emailOrUsername, password });

    return res.data;
  } catch (err) {
    throw err;
  }
};

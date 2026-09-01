import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const userApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUsersApi = async () => {
  const response = await userApi.get("/users");
  return response.data;
};

export const createUserApi = async (payload) => {
  const response = await userApi.post("/users", payload);
  return response.data;
};

export const updateUserApi = async (id, payload) => {
  const response = await userApi.put(`/users/${id}`, payload);
  return response.data;
};

export const deleteUserApi = async (id) => {
  const response = await userApi.delete(`/users/${id}`);
  return response.data;
};

export default userApi;
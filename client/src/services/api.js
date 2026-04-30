import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const reviewCode = async (code) => {
  const res = await API.post("/review", { code });
  return res.data;
};
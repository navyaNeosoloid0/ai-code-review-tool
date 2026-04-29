import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-code-review-tool-r1hv.onrender.com/api",
});

export const reviewCode = (code) => API.post("/review", { code });
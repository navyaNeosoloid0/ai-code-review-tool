import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

// 🔥 FORCE headers manually (this ALWAYS works)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://ai-code-review-tool-sable.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

app.use("/api/review", reviewRoutes);

export default app;
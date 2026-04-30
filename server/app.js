import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

// 🔥 MUST BE FIRST middleware
app.use(cors());

// handle preflight explicitly
app.options("*", cors());

app.use(express.json());

// routes
app.use("/api/review", reviewRoutes);

// health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
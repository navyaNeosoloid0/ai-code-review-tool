import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

// 🔥 IMPORTANT: allow your frontend domain
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// ✅ Correct route
app.use("/api/review", reviewRoutes);

// optional health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
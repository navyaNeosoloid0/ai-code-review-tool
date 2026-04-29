import express from "express";
import cors from "cors";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

app.options("*", cors());

app.use(express.json());

app.use("/api/review", reviewRoutes);

export default app;
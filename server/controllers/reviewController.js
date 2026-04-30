import { getAIReview } from "../services/openaiService.js";

export const reviewCode = async (req, res) => {
  try {
    console.log("Incoming request:", req.body);

    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const review = await getAIReview(code);

    res.json({ review });

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data?.error?.message || "Failed to review code",
    });
  }
};
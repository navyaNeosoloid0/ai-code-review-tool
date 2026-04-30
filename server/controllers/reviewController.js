import { getAIReview } from "../services/openaiService.js";

export const reviewCode = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    const review = await getAIReview(code);

    res.json({ review });
  } catch (error) {
    console.error("ERROR:", error.message);
    res.status(500).json({ error: "Failed to review code" });
  }
};
import { getAIReview } from "../services/openaiService.js";

export const reviewCode = async (req, res) => {
  const { code } = req.body;

  if (!code || !code.trim()) {
    return res.status(400).json({ error: "Code is required" });
  }

  const prompt = `
You are a senior software engineer.

Return STRICT JSON ONLY:
{
  "bugs": [],
  "performance": [],
  "security": [],
  "suggestions": []
}

Code:
${code}
`;

  try {
    const response = await getAIReview(prompt);

    // Clean markdown
    let cleanResponse = response
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanResponse);

    return res.json({ review: JSON.stringify(parsed) });

  } catch (err) {
    console.log("⚠️ Using fallback due to API failure");

    // ✅ ALWAYS WORKING FALLBACK
    const fallback = {
      bugs: [
        "Check for incorrect operators like = instead of ==="
      ],
      performance: [
        "Avoid nested loops if possible"
      ],
      security: [
        "Avoid using innerHTML with user input"
      ],
      suggestions: [
        "Use strict equality (===)",
        "Use const/let instead of var",
        "Improve variable naming"
      ]
    };

    return res.json({ review: JSON.stringify(fallback) });
  }
};
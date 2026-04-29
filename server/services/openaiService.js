import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIReview = async (prompt) => {
  try {
    const res = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return res.choices[0].message.content;

  } catch (error) {
    console.error("🔥 OPENAI ERROR:", error);
    throw error;
  }
};
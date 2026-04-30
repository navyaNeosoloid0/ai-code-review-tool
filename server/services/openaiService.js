import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAIReview = async (prompt) => {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "user",
        content: `Review this code and suggest improvements:\n\n${prompt}`,
      },
    ],
  });

  return response.choices[0].message.content;
};
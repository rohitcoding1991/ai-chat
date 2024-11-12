import Groq from "groq-sdk";
import { createOpenAI } from "@ai-sdk/openai";

// export const groq = new Groq({
//   apiKey: process.env.GROQ_CLOUD_API_KEY,
// });

export const groqOpenAI = createOpenAI({
  apiKey: process.env.GROQ_CLOUD_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

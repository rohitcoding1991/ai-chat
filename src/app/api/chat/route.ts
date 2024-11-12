// import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import Groq from "groq-sdk";
// import { createOpenAI } from "@ai-sdk/openai";

// export const runtime = "edge";

const groq = new Groq({
  apiKey: process.env.GROQ_CLOUD_API_KEY,
  // baseURL: "https://api.groq.com/openai/v1",
});

// const groqOpenAI = createOpenAI({
//   apiKey: process.env.GROQ_CLOUD_API_KEY,
//   baseURL: "https://api.groq.com/openai/v1",
// });

// const config = new Configuration({
//   apiKey: process.env.GROQ_CLOUD_API_KEY,
//   basePath: "https://api.groq.com/openai/v1",
// });

// const openai = new OpenAIApi(config);

// POST localhost:3000/api/chat

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are a text editor. You will be given a prompt and a text to edit, which may be empty or incomplete. Edit the text to match the prompt, and only respond with the full edited version of the text - do not include any other information, context, or explanation. If you add on to the text, respond with the full version, not just the new portion. Do not include the prompt or otherwise preface your response. Do not enclose the response in quotes.",
      },
      ...messages,
    ],
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
